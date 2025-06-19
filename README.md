# Perfume Tracker – Full Stack Application

A full stack web app for tracking perfumes and offers. Users can browse, search, and view perfumes, while admins can manage products and offers. The app includes full client- and server-side validation and a simple JSON-based backend.

> 🔗 GitHub: https://github.com/XmpleR/homework-parfume-tracker

---

## 📦 Project Structure

```
app/
├── client/               # Frontend (React + Vite)
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       └── pages/        # Main pages like ProductOverview, AddProduct, etc.
├── server/               # Backend (Node.js)
│   ├── index.js
│   ├── controllers/      # Route logic
│   ├── models/           # Product and Offer models
│   └── data/             # JSON storage (products & offers)
```

---

## 🚀 Features

- ✅ View all perfumes in a searchable list
- ✅ Add new perfumes with form validation
- ✅ View detailed perfume information
- ✅ Submit offers on perfumes
- ✅ Duplicate detection and redirect
- ✅ Admin panel to manage products & offers
- ✅ JSON-based backend with controllers/models

---

## 🌐 Frontend Routes

| Path                      | Component           | Description                                  |
|---------------------------|---------------------|----------------------------------------------|
| `/`                       | ProductOverview     | Displays all perfumes                        |
| `/add-product`            | AddProduct          | Form to add a new perfume                    |
| `/admin`                  | AdminPanel          | Admin dashboard with management tools        |
| `/product/:productId`     | ProductDetail       | Shows product details and offers             |
| `/product-exists/:id`     | ExistingProduct     | Warning page if duplicate detected           |

---

## 🔧 Backend Endpoints

| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| GET    | `/products`          | Get all perfumes                   |
| POST   | `/products`          | Create a new perfume               |
| GET    | `/products/:id`      | Get a specific perfume             |
| DELETE | `/products/:id`      | Delete a perfume (admin)           |
| POST   | `/offers`            | Submit a new offer                 |
| DELETE | `/offers/:id`        | Delete an offer (admin)            |

---

## 🧪 Validation Logic

**Client-side:**
- Checks for empty form fields
- Duplicate product detection before POST

**Server-side:**
- JSON format validation
- Required fields: `name`, `producer`, `size`
- Ensures `size` is a number

---

## 🛠️ Setup Instructions

### 1. Backend (JSON API)

```bash
cd server
npm install
node index.js
```

Server will run at `http://localhost:3000`

---

### 2. Frontend (React + Vite)

```bash
cd client
npm install
npm run dev
```

Frontend will run at `http://localhost:5173`


