# Library Management API Documentation

This API provides a system to manage a library, including functionalities to list, borrow, and return books, as well as manage users. It uses **Node.js** with **TypeScript**, **Prisma** as the ORM, and **PostgreSQL** (initialized via Docker).

## Features
- List all users
- Fetch user details with past and present book borrow history
- Add new users
- List all books
- Fetch book details with an average rating
- Add new books
- Borrow books with validation
- Return books with a required rating and error handling

---

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- [Docker](https://www.docker.com/)
- [Postman](https://www.postman.com/) or any API testing tool

---

## Setup Instructions

### 1. Clone the Repository
Run the following command to clone the project:
```bash
git clone https://github.com/monafHorany/library-management.git
cd library-management
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Initialize PostgreSQL with Docker
```bash
docker run --name library-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=library -p 5432:5432 -d postgres
```
### 4. Configure Prisma
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/library?schema=public"

npx prisma generate

```
### 5. Seed the Database
```bash
npx ts-node prisma/seed.ts
```
### 6. Start the Application
```bash
npm run dev
```

