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
npm install
docker run --name library-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=library -p 5432:5432 -d postgres
npx prisma generate
npx ts-node prisma/seed.ts
npm run dev
```

