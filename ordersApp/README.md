# 📦 OrdersApp

This is the **frontend application** built with React 

It allows users to:
- View categories (from .NET API)
- Submit orders (to Node.js API)


---

## ✅ Technologies

- React 
- Vite
- TypeScript
- Redux Toolkit
- Material UI

---

## 🚀 Installation & Running Instructions

### 2️⃣ Clone the Project

clone the repository (if not exist already)

```bash
git clone https://github.com/TovaWo/fullstack-ecommerce-assignment.git
```
navigate to project and install dependencie

```bash
cd ordersApp
npm install
```

### 3️⃣ reate a .env file

Copy the example file:

```bash
cp .env.example .env
```

And make sure it contains:

```
VITE_DOTNET_API_URL=http://127.0.0.1:5000
VITE_NODE_API_URL=http://localhost:3001
```


### 5️⃣ Run the App
```bash
npm run dev
```

### 📞API Overview
GET /categories → from .NET API

POST /orders → to Node.js API

✨ Notes

- Ensure both backend servers (.NET and Node.js) are running before starting the frontend.
- Make sure all required environment variables are properly set in the `.env` file.

