1. Initial Problem
The query was slow and PostgreSQL used Sequential Scan.

2. Incorrect Index
Index created: (status, customer_id)
This did not help because the query filters by customer_id first.

3. Issue
Due to Left-Most Prefix Rule, PostgreSQL could not use the index efficiently.

4. Fix
Created index: (customer_id, status)

5. Result
PostgreSQL used Index Scan and performance improved.

6. Key Learning
Column order in composite index is very important.