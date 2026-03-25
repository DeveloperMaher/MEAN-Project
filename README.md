# Task Management System (MEAN Stack) 🚀

A full-stack task management application built with Node.js, Angular, MongoDB, and real-time notifications using Socket.IO.

---

## 🧠 Features

* User authentication (JWT)
* Task creation & management
* Real-time notifications (Socket.IO)
* Role-based access
* Redis queue (background jobs)
* Dockerized setup

---

## 🏗️ Project Structure

```bash
MEAN-Project/
├── backend/
├── frontend/
├── docker-compose.yml
```

---

## ⚙️ Tech Stack

### Backend

* Node.js
* Express
* MongoDB
* Redis
* Socket.IO

### Frontend

* Angular
* Tailwind CSS

### DevOps

* Docker
* Docker Compose

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DeveloperMaher/MEAN-Project.git
cd MEAN-Project
```

---

### 2. Setup environment variables

Create `.env` inside `backend/`:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
REDIS_URL=redis://localhost:6379
```

---

### 3. Run with Docker

```bash
docker-compose up --build
```

---

### 4. Run manually

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
ng serve
```

---

## 🔌 API Modules

* Auth
* Users
* Tasks
* Notifications

---

## 🔔 Real-time Features

* Live notifications
* Socket-based updates

---

## 📌 Notes

* Do not commit `.env`
* Ensure MongoDB & Redis are running
* Use Docker for easiest setup

---

## 👨‍💻 Author

Developer Maher
