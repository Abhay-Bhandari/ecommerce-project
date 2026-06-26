# 🛒 E-Commerce Backend API

A production-style E-Commerce Backend built using **Spring Boot** following RESTful architecture. The application provides secure authentication, product management, shopping cart, wishlist, order processing, coupon management, reviews, and online payment integration using **Stripe** and **Razorpay**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based Authentication
- User Registration & Login
- Role-Based Access Control (Admin, Seller, Customer)
- Secure Password Encryption

### 👤 User Management
- User Profile Management
- Address Management
- Authentication using Spring Security

### 📦 Product Management
- CRUD Operations for Products
- Product Categories
- Product Search
- Product Images
- Inventory Management

### 🏪 Seller Module
- Seller Registration
- Manage Products
- View Orders
- Dashboard APIs

### 👑 Admin Module
- Manage Users
- Manage Sellers
- Manage Products
- Manage Coupons
- Manage Categories
- Manage Orders

### 🛒 Shopping Features
- Shopping Cart
- Wishlist
- Checkout
- Order Placement
- Order History

### ⭐ Reviews & Ratings
- Add Reviews
- Product Ratings

### 🎟 Coupon System
- Create Coupons
- Apply Coupons During Checkout

### 💳 Payment Integration
- Stripe Payment Gateway
- Razorpay Payment Gateway
- Transaction Management

### 📑 API Documentation
- Swagger / OpenAPI Documentation

---

# 🛠 Tech Stack

- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL
- JWT Authentication
- Maven
- Lombok
- Bean Validation
- Swagger (Springdoc OpenAPI)
- Stripe API
- Razorpay API

---

# 📁 Project Structure

```
src
 ├── controller
 ├── service
 │     ├── impl
 │     └── interfaces
 ├── repository
 ├── entity
 ├── dto
 ├── config
 ├── security
 ├── exception
 ├── util
 └── resources
```

---

# 🔑 Authentication Flow

1. Register a new user
2. Login using email and password
3. Receive JWT Token
4. Include the token in every secured request

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 📌 REST API Modules

- Authentication
- Users
- Sellers
- Admin
- Products
- Categories
- Cart
- Wishlist
- Orders
- Coupons
- Reviews
- Payments
- Transactions

---

# ⚙️ Getting Started

## Clone the repository

```bash
git clone https://github.com/Abhay-Bhandari/ecommerce-project.git
```

## Navigate to project

```bash
cd ecommerce-project
```

## Configure Database

Update the following properties in:

```
src/main/resources/application.properties
```

```properties
spring.datasource.url=
spring.datasource.username=
spring.datasource.password=

jwt.secret=

stripe.secret.key=

razorpay.key.id=
razorpay.key.secret=
```

---

## Build the project

```bash
mvn clean install
```

---

## Run the application

```bash
mvn spring-boot:run
```

---

# 📖 API Documentation

Once the application is running:

```
http://localhost:8080/swagger-ui/index.html
```

---

# 🗄 Database

- MySQL
- Spring Data JPA
- Hibernate ORM

---

# 🔒 Security

- Spring Security
- JWT Authentication
- Password Encryption using BCrypt
- Role-Based Authorization

---

# 💳 Payment Gateways

- Stripe
- Razorpay

---

# 📈 Future Improvements

- Docker Support
- Redis Caching
- Elasticsearch
- Kafka for Order Events
- Email Notifications
- CI/CD Pipeline
- Kubernetes Deployment

---

# 👨‍💻 Author

**Abhay Bhandari**

GitHub: https://github.com/Abhay-Bhandari

---
