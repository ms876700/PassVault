# 🔐 PassVault – Secure Password Manager (MERN)

PassVault is a full-stack password manager built using the MERN stack (MongoDB, Express, React, Node.js).
It allows users to securely store, manage, and access their credentials with authentication and encryption.

---

## 🚀 Features

* 🔐 User Authentication (Signup/Login using JWT)
* 🔒 Password Hashing using bcrypt
* 🛡️ Encrypted storage of credentials
* 👁️ Show/Hide password toggle
* 📋 Copy to clipboard functionality
* ✏️ Edit & Delete saved passwords
* 🌐 Fully responsive UI
* 🔑 Protected routes (only logged-in users can access data)

---

## 🧰 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Security

* JWT (Authentication)
* bcrypt (Password hashing)
* Crypto (Encryption)

---

## 📂 Project Structure

```
password-manager/
│
├── frontend/         # React App
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── backend/          # Node + Express API
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/passvault.git
cd passvault
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run backend:

```
node server.js
```

---

### 3️⃣ Setup Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🌐 Access the App

* Frontend: http://localhost:5173
* Backend: http://localhost:3000

---

## 📱 Access on Mobile (Local Network)

1. Find your system IP (e.g. `192.168.x.x`)
2. Run frontend with:

```
npm run dev -- --host
```

3. Open on mobile:

```
http://192.168.x.x:5173
```

---

## 🔐 API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Passwords

* GET `/api/passwords`
* POST `/api/passwords`
* PUT `/api/passwords/:id`
* DELETE `/api/passwords/:id`

---

## ⚠️ Important Notes

* Do NOT commit `.env` file
* Ensure MongoDB Atlas allows your IP (`0.0.0.0/0` for testing)
* Always use the same `JWT_SECRET`

---

## 🚀 Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 💡 Future Improvements

* 🔑 Password generator
* 📊 Password strength checker
* 🔍 Search & filter
* 🌙 Dark mode
* 📱 PWA support

---

## 👩‍💻 Author

Mamta Saini

---


