### users table
- No tenant_id column → causes cross-tenant data leaks
- salary field exposed to all users → sensitive data leak
- role has no validation → invalid roles possible

### projects table
- No tenant_id → projects visible across companies
- owner_id not restricted by tenant → cross-tenant reference risk