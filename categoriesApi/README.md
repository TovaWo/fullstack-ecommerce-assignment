# 📦 CategoriesApi

A simple .NET 8 Web API project that returns a list of categories from a SQL Server database using Entity Framework Core.

---

## ✅ Technologies

- ASP.NET Core 8 (Web API)
- Entity Framework Core
- SQL Server

---

## 📂 Project Structure

CategoriesApi/
├── Controllers/
│ └── CategoriesController.cs
├── Data/
│ └── AppDbContext.cs
├── Models/
│ └── Category.cs
├── Services/
│ └── CategoryService.cs
├── Program.cs
└── appsettings.json

---

## 🚀 Installation & Running Instructions

### 1️⃣ Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download) installed
- SQL Server (local or cloud-based)

---

### 2️⃣ Clone the Project

```bash
git clone https://github.com/TovaWo/fullstack-ecommerce-assignment.git
cd CategoriesApi
```

### 3️⃣ Configure the Connection String

Open appsettings.json and replace the connection string with your own SQL Server details:
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=<SERVER_NAME>;Database=<DATABASE_NAME>;User Id=<USER>;Password=<PASSWORD>;TrustServerCertificate=True;"
  }
}

### 4️⃣ Create the Database (Migration)
In the terminal:
dotnet ef database update
➡️ This will create the database and the Categories table automatically.

### 5️⃣ Run the API
dotnet run
6️⃣ Access the API
You can now send a GET request to:
GET https://localhost:{port}/api/categories

⚠️ Common Issues
If SSL trust errors occur, add TrustServerCertificate=True to your connection string.
Ensure your SQL Server instance accepts external connections (for cloud setups).

## 🧪 Running Without a Database (Mock Mode)

If you do **not** have a SQL Server connection set up, the API will return **mock category data** instead of reading from the database.

This allows you to אest the project quickly without setup


📌 No additional setup is required — just run the API with:

```bash
dotnet run
```

And browse to:
https://localhost:{PORT}/swagger

You will see sample categories like:

[
  { "id": 1, "name": "Electronics" },
  { "id": 2, "name": "Books" },
  { "id": 3, "name": "Clothing" }
]

✍️ Author
Developed by: Tova Wolf