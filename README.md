# Orderly Backend (CRUD)

This project is a web application that demonstrates user authentication using JWT, interactions with a PostgreSQL database for CRUD operations, and implements query performance optimization with indexing. The application is built with Node.js, Graphql, and Sequelize ORM.

## Setup Instructions

### Prerequisites
- Node.js (v14 or above)
- PostgreSQL database


### Steps to Set Up
1. Clone the repository:
   ```bash
   git clone https://github.com/amdadulgfx/gain-solution-ltd-orderly-backend.git
   cd gain-solution-ltd-orderly-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Create Database:
    Open SQL shell or run 
    ```bash
     psql -U postgres 
    ```
    ```sql
    CREATE DATABASE <database-name>;
    ```

4. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```plaintext
   NODE_ENV=development
   JWT_SECRET=secretworldstring  # Replace with a secure random string
   PORT=4000
   DB_HOST=<server>             # Replace with your database host
   DB_USERNAME=<username>       # Replace with your database username
   DB_PASSWORD=<password>       # Replace with your database password
   DB_NAME=<database-name>      # Replace with your database name
   ```

5. Run migrations and seed the database:
   ```bash
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

6. Start the application:
   ```bash
   npm start
   ```

Navigate to `localhost:4000` and click on `Query your server` to try the queries and mutations 


### JWT Authentication Implementation Overview

This setup uses JWT (JSON Web Token) for user authentication in a GraphQL API.

#### 1. **User Sign-Up Process**
- **Password Hashing:** The user's password is securely hashed using `bcrypt` before being stored in the database.
- **JWT Creation:** After the user is successfully created, a JWT is generated with the user's `id`, `email`, and `username`. The token is signed using a secret (`JWT_SECRET`) and is set to expire in 1 day.
- **Response:** The token and the user's information (excluding the password) are returned, allowing the client to authenticate future requests.

#### 2. **User Sign-In Process**
- **Password Verification:** When a user signs in, their password is compared with the hashed password stored in the database using `bcrypt`.
- **JWT Creation:** If the password matches, a new JWT is generated, including the user's details.
- **Response:** The token and user details are returned to the client, enabling them to access protected routes.

#### 3. **Token Validation**
- **JWT Verification:** The token is verified using the secret (`JWT_SECRET`), and the user's information (like `id` and `email`) is extracted from it.
- **User Lookup:** The system checks whether the user exists in the database. If the user is found, they are authenticated; otherwise, an authentication error is raised.

#### Summary:
- **JWT:** Provides secure, stateless authentication.
- **Bcrypt:** Used for secure password hashing and comparison.
- **Token Validation:** Ensures that only authenticated users can access protected routes. 


## Queries and Mutations

### **1. Sign Up User Mutation**

#### GraphQL Mutation

```graphql
mutation signUpUser($username: String!, $email: String!, $password: String!) {
  signUpUser(username: $username, email: $email, password: $password) {
    token
    user {
      id
      username
      email
    }
  }
}
```

#### Variables

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "123"
}
```

#### Description
This mutation registers a new user by accepting `username`, `email`, and `password`. It returns an authentication `token` and the newly created `user` object containing the user's ID, username, and email.

---

### **2. Sign In Mutation**

#### GraphQL Mutation

```graphql
mutation signIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    token
    user {
      id
      username
      email
    }
  }
}
```

#### Variables

```json
{
  "email": "john@example.com",
  "password": "123"
}
```

#### Description
This mutation logs a user in by providing their `email` and `password`. It returns a `token` for authentication and the `user` object containing the user’s ID, username, and email.

---

### **3. Get All Products Query**

#### GraphQL Query

```graphql
query getAllProducts($page: Int!, $perPage: Int!) {
  getAllProducts(page: $page, perPage: $perPage) {
    items {
      id
      name
      category
      price
    }
    totalCount
  }
}
```

#### Variables

```json
{
  "page": 2,
  "perPage": 5
}
```

#### Description
This query retrieves a paginated list of products. It accepts `page` and `perPage` as input variables to control pagination and returns the product `items` (ID, name, category, price) and the `totalCount` of products.

---

### **4. Add Product Mutation** (Requires Authorization: **Bearer token**)

#### GraphQL Mutation

```graphql
mutation addProduct($name: String!, $category: String!, $price: Float!) {
  addProduct(name: $name, category: $category, price: $price) {
    id
    name
    category
    price
  }
}
```

#### Variables

```json
{
  "name": "Wired Mouse",
  "category": "Electronics",
  "price": 25.99
}
```

#### Description
This mutation adds a new product to the catalog by accepting `name`, `category`, and `price`. It returns the `id`, `name`, `category`, and `price` of the newly added product. 

**Authorization Required**: A valid "Bearer token" must be passed in the `Authorization` header for this mutation.

---

### **5. Update Product Mutation** (Requires Authorization: **Bearer token**)

#### GraphQL Mutation

```graphql
mutation updateProduct($id: Int!, $name: String!, $category: String!, $price: Float!) {
  updateProduct(id: $id, name: $name, category: $category, price: $price) {
    id
    name
    category
    price
  }
}
```

#### Variables

```json
{
  "id": 10,
  "name": "Microwave Woven 3",
  "category": "Kitchen Appliances",
  "price": 59.99
}
```

#### Description
This mutation updates an existing product by accepting `id`, `name`, `category`, and `price`. It returns the updated product's `id`, `name`, `category`, and `price`.

**Authorization Required**: A valid "Bearer token" must be passed in the `Authorization` header for this mutation.

---

### **6. Delete Product Mutation** (Requires Authorization: **Bearer token**)

#### GraphQL Mutation

```graphql
mutation deleteProduct($id: Int!) {
  deleteProduct(id: $id)
}
```

#### Variables

```json
{
  "id": 10
}
```

#### Description
This mutation deletes a product by its `id`. No return fields are specified, indicating that the operation is either successful or fails silently.

**Authorization Required**: A valid "Bearer token" must be passed in the `Authorization` header for this mutation.

---

### **7. Get Total Sales Per Category Query** (Requires Authorization: **Bearer token**)

#### GraphQL Query

```graphql
query getTotalSalesPerCategory {
  getTotalSalesPerCategory {
    category
    total_sales
  }
}
```

#### Description
This query fetches the total sales for each product category. It returns a list of categories and the corresponding `total_sales` for each category. 

The backend implementation uses Sequelize to perform the query. It involves:
- Fetching all orders (`Order` model) and joining them with their associated products (`Product` model) using an alias (`product`).
- Grouping the results by the `category` field from the `Product` model.
- Using the SQL `SUM` function to calculate the total sales for each category by summing the `total_price` of the orders.
- The result is returned as raw data for improved performance.

**Authorization Required**: A valid "Bearer token" must be passed in the `Authorization` header for this query.

---

### Authorization Header Example:

For any operations that require authorization, you will need to pass the `Authorization` header as follows:

```json
{
  "Authorization": "Bearer <your-token-here>"
}
```


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
