# 📚 Library Management with Mongoose

A RESTful API built with **Express**, **TypeScript**, and **MongoDB (Mongoose)** that allows managing a library system — including books, borrowing records, and summaries. This API follows proper validation, business rules, and modern development practices.

---

## 📌 Features

- ✅ **Book Management** (Create, Read, Update, Delete)
- ✅ **Borrowing System** with availability checks and due dates
- ✅ **Genre Filtering & Sorting** when retrieving books
- ✅ **MongoDB Aggregation Pipeline** to summarize borrowed books
- ✅ **Schema Validation** using Mongoose
- ✅ **Business Logic Enforcement** (e.g., stock control on borrow)
- ✅ **Mongoose Middleware** (e.g., for timestamps and availability toggles)
- ✅ **Static & Instance Methods** on models

---

## 🧱 Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB** (via Mongoose)
- **Mongoose Middleware**, Aggregations, and Custom Methods

---

## 📂 Project Structure

```plaintext
src/
├── app/
│   ├── controllers/     # Route handlers and business logic
│   ├── interfaces/      # TypeScript interfaces and types
│   ├── models/          # Mongoose schemas and models
│   ├── config/          # Configuration files (e.g., DB connection)
├── app.ts               # Express app setup
└── server.ts            # Application entry point
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Abrar9410/Library-Management-with-Mongoose.git
cd library-management-with-mongoose
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create a .env File
Create a .env file in the root with the following values:

```env
DATABASE_URL=<your-mongodb-connection-uri>
```

### 4️⃣ Build the Project

```bash
npm run build
```

### 5️⃣ Start the Server
In development (with hot reload):

```bash
npm run dev
```

In production:

```bash
npm start
```

---

## 📮 API Endpoints

### 📘 Book Endpoints

- **POST** `/api/books` – Create a new book  
- **GET** `/api/books` – Get all books (with optional filtering, sorting, and limiting)  
- **GET** `/api/books/:bookId` – Get a book by ID  
- **PUT** `/api/books/:bookId` – Update a book  
- **DELETE** `/api/books/:bookId` – Delete a book  

#### Example Query:

```http
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

### 📙 Borrow Endpoints

- **POST** `/api/borrow` – Borrow a book with quantity and due date  
- **GET** `/api/borrow` – Get summary of borrowed books using MongoDB aggregation  

---

## 🛡️ Validation & Business Logic

- `title`, `author`, `genre`, `isbn`, and `copies` are **required** fields
- `genre` must be one of:
  - `FICTION`
  - `NON_FICTION`
  - `SCIENCE`
  - `HISTORY`
  - `BIOGRAPHY`
  - `FANTASY`
- `copies` must be a **non-negative integer**
- When a book is borrowed:
  - Available `copies` are reduced
  - If `copies` reach zero, `available` is set to `false`
  - Borrowing is **rejected** if not enough copies are available

> Mongoose **static or instance methods** are used to update book availability.  
> Mongoose **middleware** is used to handle timestamps and post-save operations.

---

## 🧪 Example Borrow Summary Response

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

---

## 📦 Scripts

| Script         | Description                           |
|----------------|---------------------------------------|
| `npm run dev`  | Run development server with Nodemon   |
| `npm run build`| Compile TypeScript to JavaScript      |
| `npm start`    | Start the production server           |

---

[Live Link](https://library-management-with-mongoose.vercel.app/)
