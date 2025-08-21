# ✅ Task Manager API

A **RESTful Task Manager API** built with **Node.js**, **Express**, and **MongoDB**.  
Includes **user authentication (JWT)**, **task management**, and **profile/avatar uploads**.

🔗 **Live API**: [Task Manager API](https://task-manager-api-id9f.onrender.com/)  

---

## ✨ Features
- 🔐 User authentication with JWT  
- 👤 User signup, login, logout, profile management  
- 📦 CRUD operations for tasks  
- 📑 Pagination, filtering, and sorting tasks  
- 🖼️ Upload and serve user avatars  
- 🛡️ Secure routes with middleware  

---

## 📂 Project Structure
Task-manager-API/
│
├── src/
│ ├── models/ # Mongoose models (User, Task)
│ ├── routers/ # Express routes (user.js, task.js)
│ ├── middleware/ # Auth middleware
│ └── index.js # Entry point
│
├── package.json
└── README.md

## 🚀 Setup & Installation

### Step 1️⃣ : Clone the repository
```bash
git clone https://github.com/simar305/Task-manager-API.git
cd Task-manager-API

###

Server will start on: http://localhost:3000

## 📌 API Endpoints

### 🔹 User APIs

| Method  | Endpoint              | Description                                  | Auth Required |
|---------|-----------------------|----------------------------------------------|---------------|
| POST    | `/users`              | Create new user (Signup)                     | ❌ |
| POST    | `/users/login`        | Login and get JWT                            | ❌ |
| POST    | `/users/logout`       | Logout current session                       | ✅ |
| POST    | `/users/logoutAll`    | Logout all sessions                          | ✅ |
| GET     | `/users/me`           | Get logged-in user profile                   | ✅ |
| PATCH   | `/users/me`           | Update profile (name, email, password, age)  | ✅ |
| DELETE  | `/users/me`           | Delete logged-in user                        | ✅ |
| POST    | `/users/me/avatar`    | Upload avatar (jpg/png/webp, <1MB)           | ✅ |
| DELETE  | `/users/me/avatar`    | Delete avatar                                | ✅ |
| GET     | `/users/:id/avatar`   | Fetch user’s avatar by ID                    | ❌ |

---

### 🔹 Task APIs

| Method  | Endpoint              | Description                                                                 | Auth Required |
|---------|-----------------------|-----------------------------------------------------------------------------|---------------|
| POST    | `/tasks`              | Create a new task                                                           | ✅ |
| GET     | `/tasks`              | Get all tasks (`?completed=true/false`, `?limit=10&skip=0`, `?sortBy=createdAt:desc`) | ✅ |
| GET     | `/tasks/:id`          | Get task by ID                                                              | ✅ |
| GET     | `/tasks/counts`       | Get total number of tasks                                                   | ✅ |
| PATCH   | `/tasks/:id`          | Update task (description/completed)                                         | ✅ |
| DELETE  | `/tasks/:id`          | Delete task by ID                                                           | ✅ |

---

## 🛠️ Tech Stack
- **Node.js + Express.js**  
- **MongoDB + Mongoose**  
- **JWT Authentication**  
- **Multer + Sharp** (for avatar upload)  
