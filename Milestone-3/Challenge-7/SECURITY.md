## Security Decisions

### Tenant Isolation
- Added tenant_id to all tables
- All queries filter using tenant_id

### Sensitive Fields
- salary → visible only to admin

### Role-Based Access
- Admin → full access
- Manager → limited access
- User → own data only

### Risk Prevention
- Prevented cross-tenant joins
- API filters sensitive fields