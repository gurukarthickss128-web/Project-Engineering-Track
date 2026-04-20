-- =========================
-- 3NF NORMALIZED SCHEMA
-- =========================

-- 1. PRODUCTS TABLE (core entity)
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(10,2),
    supplier_id INT
);

-- 2. SUPPLIERS TABLE (removed repetition from products)
CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY,
    supplier_name VARCHAR(100),
    supplier_phone VARCHAR(20),
    supplier_email VARCHAR(100)
);

-- 3. CATEGORIES TABLE (1 category = 1 row)
CREATE TABLE categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(100)
);

-- 4. PRODUCT ↔ CATEGORY (many-to-many)
CREATE TABLE product_categories (
    product_id INT,
    category_id INT,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- 5. TAGS TABLE
CREATE TABLE tags (
    tag_id INT PRIMARY KEY,
    tag_name VARCHAR(100)
);

-- 6. PRODUCT ↔ TAGS (many-to-many)
CREATE TABLE product_tags (
    product_id INT,
    tag_id INT,
    PRIMARY KEY (product_id, tag_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);

-- 7. INVENTORY TABLE (removed from products)
CREATE TABLE inventory (
    inventory_id INT PRIMARY KEY,
    product_id INT,
    warehouse_location VARCHAR(100),
    stock_quantity INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);