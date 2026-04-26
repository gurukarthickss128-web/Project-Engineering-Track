-- Drop tables in correct dependency order
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- =========================
-- CUSTOMERS TABLE
-- =========================
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- ORDERS TABLE (FIXED)
-- =========================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    total DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    -- FIX 1: Add FOREIGN KEY constraint
    CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(id)
    ON DELETE CASCADE
);

-- =========================
-- PRODUCTS TABLE (FIXED)
-- =========================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    inventory_count INTEGER DEFAULT 0,
    price DECIMAL(10,2) NOT NULL,

    -- FIX 2: Prevent negative inventory
    CONSTRAINT check_inventory_non_negative
    CHECK (inventory_count >= 0)
);

-- =========================
-- ORDER ITEMS TABLE
-- =========================
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- =========================
-- PAYMENTS TABLE (FIXED)
-- =========================
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),

    -- FIX 3: Only one payment per order
    CONSTRAINT unique_payment_per_order UNIQUE (order_id),

    -- (Optional but GOOD PRACTICE)
    CONSTRAINT fk_payments_order
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE
);