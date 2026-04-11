require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* =========================
   🔌 DATABASE CONNECTION
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

/* =========================
   📦 SCHEMA + MODEL
========================= */
const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true }
  },
  { timestamps: true }
);

const Expense = mongoose.model('Expense', expenseSchema);

/* =========================
   ❤️ HEALTH CHECK
========================= */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

/* =========================
   ➕ CREATE EXPENSE
========================= */
app.post('/expenses', async (req, res) => {
  try {
    const { title, amount, date } = req.body;

    if (!title || !amount || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const expense = await Expense.create({ title, amount, date });
    res.status(201).json(expense);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   📥 READ ALL EXPENSES
========================= */
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   ✏️ UPDATE EXPENSE
========================= */
app.put('/expenses/:id', async (req, res) => {
  try {
    const { title, amount, date } = req.body;

    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, date },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   ❌ DELETE EXPENSE
========================= */
app.delete('/expenses/:id', async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json({ success: true, message: "Expense deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   🚀 START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});