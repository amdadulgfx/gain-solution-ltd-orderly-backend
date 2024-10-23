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


Navigate to `localhost:4000` and try the queries and mutations 