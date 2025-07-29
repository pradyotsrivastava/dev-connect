# 🚀 DevConnect – Full Stack Developer Assignment

DevConnect is a full-stack web application where developers can sign up, create profiles, showcase personal projects, and receive feedback from other users via comments. It includes features like authentication, project posting, search, and a clean responsive design.

---

## 🌐 Live Demo

🔗 Frontend: [https://devconnect-client.vercel.app](https://devconnect-client.vercel.app)  
🔗 Backend API: [https://devconnect-server.onrender.com](https://devconnect-server.onrender.com)  
🔗 GitHub Repo: [https://github.com/yourusername/devconnect](https://github.com/yourusername/devconnect)

---

## 🔧 Local Setup Instructions

## 1. Clone the repository

git clone https://github.com/yourusername/devconnect.git
cd devconnect

## 2. Setup the backend

cd server
npm install

- Create .env file inside /server:

PORT=
FRONTEND_URL=
MONGO_URI=
JWT_SECRET=

- Run
  npm run dev

## 3. Setup the frontend

cd ../client
npm install

- Create .env inside /client

VITE_BASE_URL=http://localhost:5000

- Run
  npm run dev

## 🛠️ Tech Stack

### Frontend

- **React 19** with **Vite**
- **TailwindCSS**
- **React Router v7**
- **Formik + Yup**
- **Axios**
- **React Toastify**
- **React Icons**

### Backend

- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv**, **cors**

---

## ✨ Features

- 🔐 User Authentication (Register/Login)
- 👤 User Profile creation
- 📝 Create, edit, delete your own projects
- 💬 Comment on others' projects
- 🔍 Search users by name or projects by title
- 🖥️ Responsive, clean UI
- 🔄 Real-time UI updates without full page refresh

---

## 📁 Project Structure

```bash
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── assets/         # Assets
│   │   ├── auth/           # Login & Register pages
│   │   ├── components/     # Reusable components
│   │   ├── context/        # Login & Register pages
│   │   ├── hooks/          # Login & Register pages
│   │   ├── pages/          # Page-level components
│   │   └── App.jsx
├── server/                 # Node.js + Express backend
│   ├── config/             # Config files
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routers
│   ├── utils/              # Utility functions
│   └── server.js
```

## 🧠 How It Works

Auth state is managed via React Context and stored in localStorage.

Protected routes and buttons check for logged-in status using context.

Debounced search on frontend avoids excessive API calls.

Comment and project updates reflect immediately with local state updates.

Navbar dynamically updates after login/logout.

## 🔌 API Endpoints Summary

## Authentication

POST /api/auth/register-user

POST /api/auth/login-user

GET /api/auth/get-current-user

PUT /api/auth/update-current-user

## Users

GET /api/users/get-all-users

GET /api/users/search-users/:query

GET /api/users/get-user/:id

DELETE /api/users/delete-user/:id

## Projects

POST /api/projects/create-project

GET /api/projects/get-all-projects

GET /api/projects/get-project/:id

GET /api/projects/get-projects-by-user/:userId

PUT /api/projects/update-project/:id

DELETE /api/projects/delete-project/:id

GET /api/projects/search-projects/:query

## Comments

POST /api/comments/create-comment/:projectId

GET /api/comments/get-comments/:projectId

PUT /api/comments/update-comment/:id

DELETE /api/comments/delete-comment/:id
