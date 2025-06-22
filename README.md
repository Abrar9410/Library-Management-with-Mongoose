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

src/
├── app/
    ├── controllers/
    ├── interfaces/
    ├── models/
    ├── config/
├── app.ts    
└── server.ts

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

[Live Link](https://library-management-with-mongoose.vercel.app/)
