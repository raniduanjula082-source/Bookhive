# BookHive - Online Library Management System

BookHive is a full-stack e-commerce application for a library/bookstore, built using **Spring Boot** for the backend and **React** for the frontend. It features a robust authentication system, real-time book management, shopping cart functionality, and an administrative dashboard.

## 🚀 Features

### Frontend (React + Vite + TypeScript)
- **User Authentication**: Secure login and registration with JWT.
- **Responsive UI**: Modern, mobile-friendly design using Vanilla CSS.
- **Book Catalog**: Browse, search, and filter books.
- **Shopping Cart & Wishlist**: Manage items you want to buy or save for later.
- **Admin Dashboard**: Manage books, users, and orders (restricted to admin users).
- **Dynamic Interactions**: Smooth animations and carousels using `react-slick`.

### Backend (Spring Boot + MongoDB)
- **RESTful API**: Clean and scalable API endpoints.
- **Security**: Spring Security integration with JWT for stateless authentication.
- **Database**: MongoDB for flexible and scalable data storage.
- **Role-Based Access Control**: Different permissions for `USER` and `ADMIN`.
- **Validation**: Server-side request validation using `spring-boot-starter-validation`.

---

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite
- TypeScript
- Axios (API Calls)
- React Router Dom (Navigation)
- React Slick (Carousels)

**Backend:**
- Java 17
- Spring Boot 3.1.5
- Spring Security (JWT)
- Spring Data MongoDB
- Maven (Build Tool)
- Lombok

---

## 📂 Project Structure

```text
library/
├── backend/            # Spring Boot Application
│   ├── src/
│   │   ├── main/java/com/example/library/
│   │   │   ├── controller/    # API Endpoints
│   │   │   ├── model/         # MongoDB Entities
│   │   │   ├── security/      # JWT & Security Config
│   │   │   └── service/       # Business Logic
│   │   └── resources/
│   │       └── application.properties # Configurations
│   └── pom.xml         # Maven Dependencies
│
└── frontend/           # React Application
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Route-level components
    │   ├── services/   # Axios API services
    │   └── context/    # React Context (Auth, Cart)
    ├── package.json    # NPM Dependencies
    └── vite.config.ts  # Vite Configuration
```

---

## ⚙️ Getting Started

### Prerequisites
- JDK 17 or higher
- Node.js (v18+) & npm
- MongoDB (Local or Atlas)

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure your MongoDB URI in `src/main/resources/application.properties`:
   ```properties
   spring.data.mongodb.uri=your_mongodb_connection_string
   ```
3. Run the application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will start on `http://localhost:8080` (default).*

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on `http://localhost:5173`.*

---

## 📜 License
This project is licensed under the MIT License.
