# SECURITY.md

## 1. Sensitive Fields

The following fields are considered sensitive:

- balance (accounts table)
  → Represents financial data of users
  → Only visible to admin users

- amount (transactions table)
  → Represents money movement
  → Restricted based on role

Reason:
Financial data must not be exposed to all users as it can lead to privacy and security risks.

---

## 2. Tenant Isolation Strategy

To ensure complete separation between different organisations:

- Added tenant_id column to all tables:
  - users
  - accounts
  - transactions

- Every query includes:
  WHERE tenant_id = ?

- Email uniqueness is scoped per tenant:
  UNIQUE(email, tenant_id)

Result:
A user from one tenant cannot access data from another tenant.

---

## 3. Role-Based Access Control (RBAC)

Three roles are defined:

### Admin
- Full access within tenant
- Can view:
  - all users
  - all accounts
  - all transactions
  - sensitive fields (balance)

### Manager
- Limited access within tenant
- Can view:
  - users
  - accounts
- Cannot view:
  - balance
  - sensitive financial data

### User
- Restricted access
- Can view:
  - only their own account
  - their own transactions
- Cannot view:
  - other users
  - sensitive data

---

## 4. API Response Security

Problem:
Returning raw database rows exposes sensitive fields.

Solution:
- API responses are filtered before sending
- Only required fields are returned
- Sensitive fields are included only for admin role

Example:
- balance is only added if role = admin

---

## 5. Cross-Tenant Risk and Prevention

Risk:
Improper joins can expose data across tenants.

Example risk:
Joining transactions and accounts without tenant check.

Solution:
All joins include tenant validation:

JOIN accounts 
  ON transactions.account_id = accounts.id
 AND transactions.tenant_id = accounts.tenant_id

This ensures data stays within the same tenant.

---

## 6. Indexing Strategy

Indexes added:

- users(tenant_id)
- accounts(tenant_id)
- transactions(tenant_id)
- users(tenant_id, email)

Reason:
- Improves query performance
- Prevents full table scans
- Ensures efficient tenant-based filtering

---

## 7. Key Security Principle

Security is enforced at the database level, not just in application logic.

- tenant_id ensures structural isolation
- queries enforce access boundaries
- API filters enforce role-based visibility

This reduces the risk of accidental data leaks.