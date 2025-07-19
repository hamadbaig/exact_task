# 📝 Task Management App

A modern full-stack **task collaboration system** where users can log in, create, assign, and manage tasks in real time. Built with **Next.js**, **NestJS**, **MongoDB**, **PostgreSQL**, **WebSockets**, and **Tailwind CSS**.

---

## 📸 Screenshots

![Login Page](![image](https://github.com/user-attachments/assets/da349df6-d8e7-4831-8227-0de223dfe0aa)
)  
*Login Screen*

![Register Page](![image](https://github.com/user-attachments/assets/092319f5-f5d2-4d33-a26e-25052bfa241c)
)

![Dashboard](![image](https://github.com/user-attachments/assets/df875d8a-c959-4a3a-b7e4-43e35c79e39c)
)  
*Dashboard with Tasks*

![Task Modal](![image](https://github.com/user-attachments/assets/5f4dd837-da1c-4667-8446-b6286c12d0da)
)  
*Modal to Create New Task*

---

## 🚀 Tech Stack

| Layer       | Technology                                 |
|-------------|---------------------------------------------|
| Frontend    | Next.js, React, Tailwind CSS, TypeScript    |
| Backend     | NestJS, TypeORM, WebSockets                 |
| Database    | PostgreSQL (Tasks & Users), MongoDB (Logs)  |
| Auth        | JWT (JSON Web Tokens)                       |
| State Mgmt  | React Query + Context API                   |
| Testing     | Jest + React Testing Library                |

---

## 🧩 Project Structure

task-management-app/
├── task-manager-frontend/ # Next.js React Application
├── backend/ # NestJS API
├── .gitignore
└── README.md # You're reading it

## 🛠️ Setup Instructions

## ✅ 1. Clone the Repository

```bash
git clone https://github.com/MirzaShahzadSaleem/Task-Management-App.git
cd Task-Management-App

## ⚙️ Backend Setup (/backend)

cd backend
yarn
yarn start:dev

## 💻 Frontend Setup (/frontend)

cd ../task-manager-frontend
yarn
yarn dev

✨ Features

🔐 JWT Auth with Login / Register

🧑‍🤝‍🧑 Role-based route protection (Admin/User)

📋 Task creation, assignment, update, and status management

📡 Real-time updates with WebSocket (NestJS Gateway)

💬 Task logs stored in MongoDB

🎨 Responsive UI using Tailwind CSS

🧪 Unit testing support

📂 .gitignore (included)
gitignore
Copy
Edit
node_modules
dist
.env
.env.local
.next
out
coverage
