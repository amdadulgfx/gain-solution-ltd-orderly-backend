
# Query Performance Before and After Indexing

This document demonstrates the impact of indexing on query performance by comparing execution times before and after indexes were added to the `Products` table.

## Data Setup

I inserted 100,000 rows into the `Products` table for this comparison. Below is the query used to generate the sample data:

```sql
INSERT INTO "Products" (name, category, price, created_at, updated_at)
SELECT
    'Product ' || s::text AS name,
    CASE 
        WHEN s % 5 = 0 THEN 'Category A'
        WHEN s % 5 = 1 THEN 'Category B'
        WHEN s % 5 = 2 THEN 'Category C'
        WHEN s % 5 = 3 THEN 'Category D'
        ELSE 'Category E'
    END AS category,
    round(CAST(random() * 100 + 1 AS numeric), 2) AS price,
    NOW() - (s * interval '1 day') AS created_at,
    NOW() - (s * interval '1 day') AS updated_at
FROM generate_series(1, 100000) AS s;
```

## Query Examples

### Query 1: Searching by Product Name

#### SQL Query:
```sql
EXPLAIN ANALYZE SELECT * FROM "Products" WHERE name = 'Product 50000';
```

#### Before Indexing:
- **Execution Time:** 14.577 ms
- **Query Plan:** Sequential Scan
  - PostgreSQL scanned the entire `Products` table sequentially to find the matching product.

#### After Indexing:
- **Index Created:**
  ```sql
  CREATE INDEX idx_products_name ON "Products" (name);
  ```

- **Execution Time:** 0.76 ms
- **Query Plan:** Index Scan on `idx_products_name`
  - PostgreSQL used the index to efficiently locate the product by its name, significantly reducing the scan time.

### Query 2: Searching by Product Category

#### SQL Query:
```sql
EXPLAIN ANALYZE SELECT * FROM "Products" WHERE category = 'Category E';
```

#### Before Indexing:
- **Execution Time:** 27.685 ms
- **Query Plan:** Sequential Scan
  - Without an index, PostgreSQL performed a full table scan to find all products in 'Category E'.

#### After Indexing:
- **Index Created:**
  ```sql
  CREATE INDEX idx_products_category ON "Products" (category);
  ```

- **Execution Time:** 6.582 ms
- **Query Plan:** Index Scan on `idx_products_category`
  - PostgreSQL used the index to quickly retrieve products in 'Category E', improving performance.

## Summary of Performance Improvements

By adding indexes on frequently queried columns (`name` and `category`), I observed significant reductions in query execution time:
- Searching by product name improved from **14.577 ms** to **0.76 ms**.
- Searching by product category improved from **27.685 ms** to **6.582 ms**.
