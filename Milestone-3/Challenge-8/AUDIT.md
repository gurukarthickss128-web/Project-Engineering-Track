1. No tenant_id in users table
→ All users from all companies are stored together with no isolation

2. No tenant_id in accounts table
→ Accounts from different tenants can be accessed together

3. No tenant_id in transactions table
→ Financial transactions are globally accessible

4. accounts.user_id does not enforce tenant boundary
→ A user from Tenant A could be linked to an account from Tenant B

5. transactions.account_id does not enforce tenant boundary
→ Cross-tenant financial data leakage is possible

6. balance field is sensitive but not protected
→ Any API returning accounts exposes financial data

7. No role-based access control
→ No distinction between admin, manager, or user

8. email is globally unique instead of tenant-scoped
→ Prevents same email across different tenants

9. No indexes on foreign keys or tenant filtering
→ Queries will be slow and unsafe at scale

10. No tenant filtering in queries (implied risk)
→ A missing WHERE clause exposes all data