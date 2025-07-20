# 📝 Task Management App

A full-stack task management system for modern teams. Users can register, log in, create and assign tasks, and collaborate in real-time with live updates.

Built with:

Next.js (Frontend)

NestJS (Backend)

PostgreSQL and MongoDB

WebSockets

Tailwind CSS

---

---

⚙️ Tech Stack Overview
Layer Technology
Frontend Next.js, React, Tailwind CSS, TypeScript
Backend NestJS, TypeORM, WebSockets
Databases PostgreSQL (core data), MongoDB (logs)
Auth JWT-based Authentication
State React Query + Context API
Testing Jest, React Testing Library

## 🧩 Project Structure

exact_task/
├── backend/ # NestJS API (auth, tasks, sockets)
├── frontend/ # Next.js frontend UI
├── .gitignore
└── README.md

📂 .gitignore (included)
node_modules/
dist/
.env
.env.local
.next/
out/
coverage/

````
## 🛠️ Setup Instructions

## ✅ 1. Clone the Repository

```bash
git clone https://github.com/hamadbaig/exact_task.git
cd exact_task

## ⚙️ Backend Setup (/backend)

cd backend
yarn
yarn start:dev

## 💻 Frontend Setup (/frontend)

cd ../task-manager-frontend
yarn
yarn dev

✨ Features
🔐 Secure JWT Auth – Login/Register flows

👥 Role-based Access Control – Admin/User dashboard separation

📋 Task Management – Create, assign, edit, delete tasks

🔄 Live Sync – Real-time updates using WebSockets

🧾 Task Logs – Stored in MongoDB for activity tracking

🧪 Testing Support – Unit tests with Jest

📱 Responsive Design – Built with Tailwind CSS


````
