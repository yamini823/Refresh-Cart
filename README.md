# 🛒 RefreshCart – Grocery Shopping Web Application

RefreshCart is a **full-stack grocery shopping web application** built using the **MERN stack**. It provides a convenient online platform where users can browse grocery products, manage their cart and wishlist, create accounts, and place orders.

The project was developed to gain practical experience in **full-stack web development, REST APIs, authentication, database management, and deployment**.

---

## 📌 Features

### 👤 User Authentication

* User registration and login
* OTP-based email verification
* Secure authentication
* Protected routes
* User session management

### 🛍️ Product Management

* Browse grocery products
* Product categories
* Product details
* Search and filtering
* Responsive product cards

### ❤️ Wishlist

* Add products to wishlist
* Remove products from wishlist
* View saved products

### 🛒 Shopping Cart

* Add products to cart
* Update product quantity
* Remove products
* Calculate total price
* Persistent cart data

### 📦 Orders

* Place orders
* View order details
* Track order information

### 🤖 AI Chatbot

* Integrated chatbot for assisting users
* Provides product/shopping-related guidance

### 📱 Responsive UI

* Mobile-friendly design
* Tablet and desktop support
* Clean and modern grocery shopping interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication
* Email OTP verification

### Database

* MongoDB
* Mongoose

### Tools & Services

* Git & GitHub
* VS Code
* Postman
* MongoDB Compass
* Vercel – Frontend Deployment
* Render – Backend Deployment
* Resend – Email/OTP Service

---

## 🏗️ Project Architecture

```text
RefreshCart
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── api/
│   │   ├── context/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```
---

## 🔄 Application Flow

```text
User
 │
 ▼
React Frontend
 │
 │ Axios / REST API
 ▼
Node.js + Express Backend
 │
 ├── Authentication
 ├── Products
 ├── Wishlist
 ├── Cart
 ├── Orders
 └── Email OTP
 │
 ▼
MongoDB Database
```

---

## 🔐 Authentication Flow

```text
User Registration
       │
       ▼
Enter Email & Details
       │
       ▼
OTP Generated
       │
       ▼
Email Service
       │
       ▼
User Verifies OTP
       │
       ▼
Account Activated
       │
       ▼
Login
       │
       ▼
Authenticated User
```
---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| POST   | `/api/auth/signup`     | Register a new user |
| POST   | `/api/auth/login`      | Login user          |
| POST   | `/api/auth/verify-otp` | Verify OTP          |

## Products

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/products`     | Get all products    |
| GET    | `/api/products/:id` | Get product details |

## Wishlist

| Method | Endpoint            | Description    |
| ------ | ------------------- | -------------- |
| GET    | `/api/wishlist`     | Get wishlist   |
| POST   | `/api/wishlist`     | Add product    |
| DELETE | `/api/wishlist/:id` | Remove product |

## Cart

| Method | Endpoint        | Description     |
| ------ | --------------- | --------------- |
| GET    | `/api/cart`     | Get cart        |
| POST   | `/api/cart`     | Add product     |
| PUT    | `/api/cart/:id` | Update quantity |
| DELETE | `/api/cart/:id` | Remove product  |

---

# 🧪 Testing

The backend APIs can be tested using **Postman**.

Recommended testing flow:

```text
Signup
  ↓
OTP Verification
  ↓
Login
  ↓
Get Products
  ↓
Add Product to Wishlist
  ↓
Add Product to Cart
  ↓
Update Cart
  ↓
Place Order
```
---

# 📸 Screenshots

[Home Page]
<img width="1917" height="906" alt="image" src="https://github.com/user-attachments/assets/95ca3711-04fe-4bee-813e-af4ca12faf87" />


![Products Page](screenshots/products.png)

![Shopping Cart](screenshots/cart.png)
```

---

# 🎯 Future Enhancements

* Online payment integration
* Order tracking
* Product reviews and ratings
* Advanced product filtering
* Coupon and discount system
* Inventory management
* Personalized product recommendations
* Improved AI shopping assistant
* Progressive Web App (PWA) support
* Cloud-based image storage
* Automated testing and CI/CD

---

# 📚 What I Learned

Through this project, I gained practical experience in:

* MERN stack development
* React component architecture
* REST API development
* Authentication and authorization
* OTP-based verification
* MongoDB database operations
* API integration using Axios
* Responsive UI development
* Git and GitHub
* Deployment and environment configuration
* Debugging frontend/backend integration issues

---
