-- CorpFlow v2.0 Secure Multi-Tenant Schema

DROP TABLE IF EXISTS billing_details;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tenants;

-- =========================
-- TENANTS TABLE
-- =========================
CREATE TABLE tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES tenants(id),  -- ✅ Tenant isolation
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'manager', 'user')), -- ✅ Valid roles
    salary DECIMAL(10,2), -- 🔒 Sensitive
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- ✅ Same email allowed in different tenants
    UNIQUE(email, tenant_id)
);

-- =========================
-- PROJECTS TABLE
-- =========================
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES tenants(id), -- ✅ Tenant isolation
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    budget DECIMAL(12,2),
    
    owner_id INTEGER NOT NULL,
    
    -- ✅ Prevent cross-tenant reference
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- =========================
-- BILLING DETAILS TABLE
-- =========================
CREATE TABLE billing_details (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL REFERENCES tenants(id), -- ✅ Tenant isolation
    user_id INTEGER NOT NULL REFERENCES users(id),
    
    card_holder_name VARCHAR(100),
    card_last4 VARCHAR(4),
    expiry_date VARCHAR(5),
    billing_address TEXT,
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- INDEXES (Performance + Security)
-- =========================
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_projects_tenant ON projects(tenant_id);
CREATE INDEX idx_billing_tenant ON billing_details(tenant_id);

CREATE INDEX idx_users_tenant_email ON users(tenant_id, email);

-- =========================
-- SEED DATA
-- =========================

-- Tenants
INSERT INTO tenants (name) VALUES
('Pouch'),
('Velocity');

-- Users
INSERT INTO users (tenant_id, full_name, email, password_hash, role, salary) VALUES
(1, 'Alice Johnson', 'alice@pouch.io', 'pbkdf2:sha256:600000$hasher$81726a', 'admin', 125000.00),
(1, 'Bob Smith', 'bob@pouch.io', 'pbkdf2:sha256:600000$hasher$81726b', 'manager', 95000.00),
(2, 'Charlie Davis', 'charlie@velocity.com', 'pbkdf2:sha256:600000$hasher$81726c', 'admin', 140000.00),
(2, 'David Miller', 'david@velocity.com', 'pbkdf2:sha256:600000$hasher$81726d', 'user', 75000.00);

-- Projects
INSERT INTO projects (tenant_id, name, description, status, budget, owner_id) VALUES
(1, 'Pouch Portal', 'Customer portal for Pouch.io', 'active', 50000.00, 1),
(2, 'Velocity Engine', 'Back-end engine for Velocity', 'active', 120000.00, 3),
(2, 'Secret R&D', 'Internal research', 'inactive', 250000.00, 3);

-- Billing Details (Sensitive)
INSERT INTO billing_details (tenant_id, user_id, card_holder_name, card_last4, expiry_date, billing_address) VALUES
(1, 1, 'Alice Johnson', '4242', '12/28', '123 Tech Lane, SF'),
(2, 3, 'Charlie Davis', '9182', '08/26', '789 Velocity Rd, NY');