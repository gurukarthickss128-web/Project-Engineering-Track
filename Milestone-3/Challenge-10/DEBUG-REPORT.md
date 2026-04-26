## Bug 1 — Orphan Orders

### Symptom
Orders exist with invalid customer_id values.

### Reproduction Query
SELECT o.id, o.customer_id
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
WHERE c.id IS NULL;

### Data Flow Trace
API → orders table → customer_id column → no FK constraint → invalid data inserted

### Root Cause
Missing FOREIGN KEY constraint on orders.customer_id referencing customers(id)

### Fix Applied
ALTER TABLE orders
ADD CONSTRAINT fk_orders_customer
FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;

### Validation
- Re-run query → returns no invalid rows
- Attempt invalid insert → fails with FK constraint error