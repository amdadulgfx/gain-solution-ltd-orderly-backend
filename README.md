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
mutation updateProduct($id: ID!, $name: String!, $category: String!, $price: Float!) {
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
  "id": 14,
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
mutation deleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
```

#### Variables

```json
{
  "id": 14
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

**Authorization Required**: A valid "Bearer token" must be passed in the `Authorization` header for this query.

---

### Authorization Header Example:

For any operations that require authorization, you will need to pass the `Authorization` header as follows:

```json
{
  "Authorization": "Bearer <your-token-here>"
}
```