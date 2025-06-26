# 📦 OrdersApi

This is a simple backend API for managing orders in an e-commerce system.  
It is built using **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **AJV** for schema validation.


---

## ✅ Technologies

- Node.js
- Express
- TypeScript
- MongoDB

---

## 📦 Features

- Create new orders via POST `/api/order`
- Input validation with JSON Schema (AJV)
- MongoDB integration (with fallback for development without DB)

---

## 🚀 Installation & Running Instructions

### 1️⃣ Prerequisites

- Node.js
- npm
- MongoDB 

---

### 2️⃣ Clone the Project and Installation

clone the repository (if not exist already)

```bash
git clone https://github.com/TovaWo/fullstack-ecommerce-assignment.git
```
navigate to project and install

```bash
cd OrdersApi
npm install
```

### 3️⃣ Environment Variable

Create a ```.env``` file, by coping ```.env.example``` file. 

```bash
cp .env.example .env
```

set environment variables values 

```
PORT=3001
MONGO_URI=mongodb://localhost:27017/ordersDb
```

### 5️⃣ Run the API (Development mode)
```bash
npm run dev
```

➡️ If MongoDB is not available, the server will still respond with mock data.

### 6️⃣ Api example

curl command for post request 
```json
curl -X POST http://localhost:3001/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "name": "Tova Wolf",
      "email": "tova@example.com",
      "address": "Herzliya 1"
    },
    "items": [
       { "name": "Apple", "quantity": 2, "categoryId": 2 },
       { "name": "Banana", "quantity": 3,  "categoryId": 2 }
    ]
  }'
```



## 🧪 Running Without a Database (Mock Mode)

If you do **not** have a MongoDB connection set up, the API will return success response 
with message: \
 'Route succeeded, but database not initialized, no data saved

This allows you to test the project quickly without setup




