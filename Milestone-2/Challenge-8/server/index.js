const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// DATA STORE (IN MEMORY)
// =========================
let items = [];

// expiry time for stale approvals (2 days)
const EXPIRY_TIME = 2 * 24 * 60 * 60 * 1000;

// =========================
// CREATE ITEM
// =========================
app.post("/items", (req, res) => {
  const { name, owner } = req.body;

  const item = {
    id: uuid(),
    name,
    owner,
    totalQuantity: 100,
    remainingQuantity: 100,
    requests: []
  };

  items.push(item);
  res.json(item);
});

// =========================
// GET ITEMS (with expiry check)
// =========================
function expireRequests(item) {
  item.requests.forEach((r) => {
    if (
      r.status === "approved" &&
      Date.now() - r.createdAt > EXPIRY_TIME
    ) {
      r.status = "expired";
      item.remainingQuantity += r.amount;
    }
  });
}

app.get("/items", (req, res) => {
  items.forEach(expireRequests);
  res.json(items);
});

// =========================
// CREATE REQUEST
// =========================
app.post("/request", (req, res) => {
  const { itemId, user, amount } = req.body;

  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  // check availability at request time
  if (item.remainingQuantity < amount) {
    return res.status(400).json({ error: "Not enough quantity" });
  }

  const request = {
    id: uuid(),
    user,
    amount,
    status: "pending",
    createdAt: Date.now()
  };

  item.requests.push(request);

  res.json(request);
});

// =========================
// APPROVE REQUEST (CORE LOGIC)
// =========================
app.post("/approve", (req, res) => {
  const { itemId, requestId } = req.body;

  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  const request = item.requests.find((r) => r.id === requestId);

  if (!request) {
    return res.status(404).json({ error: "Request not found" });
  }

  if (request.status !== "pending") {
    return res.status(400).json({ error: "Request already handled" });
  }

  // 🔥 CONCURRENCY SAFE CHECK
  if (item.remainingQuantity >= request.amount) {
    item.remainingQuantity -= request.amount;
    request.status = "approved";
  } else {
    request.status = "rejected";
  }

  res.json({ item, request });
});

// =========================
// ADJUST INVENTORY (REALITY DESYNC FIX)
// =========================
app.post("/adjust", (req, res) => {
  const { itemId, newQuantity } = req.body;

  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  item.remainingQuantity = newQuantity;

  // invalidate approvals that no longer make sense
  let approvedTotal = 0;

  item.requests.forEach((r) => {
    if (r.status === "approved") {
      approvedTotal += r.amount;
    }
  });

  if (approvedTotal > newQuantity) {
    item.requests.forEach((r) => {
      if (r.status === "approved") {
        r.status = "invalid";
      }
    });
  }

  res.json(item);
});

// =========================
// SERVER START
// =========================
app.listen(3000, () => {
  console.log("FridgePolice server running on port 3000");
});