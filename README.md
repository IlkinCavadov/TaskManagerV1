# MERN Task Manager V1 Application

This is a **Full Stack Task Manager Application** built with the **MERN Stack** (MongoDB, Express, React, Node.js).  
It includes **user authentication**, **role-based access**, and allows users to **create, update, and delete tasks**.



---

## 🛠 Tech Stack

- **MongoDB** – NoSQL database for storing users and tasks  
- **Express.js** – Backend framework for building APIs  
- **React.js** – Frontend UI library  
- **Node.js** – Runtime environment for backend  
- **JWT** – For authentication and authorization  
- **Bootstrap / Tailwind** *(optional)* – For styling (depends on your project)  

---

## ⚡ Features

- User registration and login  
- Role-based access (e.g., admin, user)  
- CRUD operations on tasks (Create, Read, Update, Delete)  
- Real-time form validations  
- Responsive UI  
- Error handling  

---

## 🚀 Installation

### 1️⃣ Clone the repo
```bash
git clone https://github.com/USERNAME/REPO_NAME.git
cd REPO_NAME
2️⃣ Install dependencies
Backend:

bash
Copy code
cd backend
npm install
Frontend:

bash
Copy code
cd ../frontend
npm install
3️⃣ Configure Environment Variables
Create a .env file in backend/:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
⚡ Running the Project
Backend
bash
Copy code
cd backend
npm run dev
Server runs at: http://localhost:5000

Frontend
bash
Copy code
cd frontend
npm start
React app runs at: http://localhost:3000

🧪 Testing & Using the App
Sign up or login as a new user

Create, edit, and delete tasks

Check role-based permissions (admin vs regular user)

Feel free to add features or find bugs and experiment!

💡 Contributions
Contributions are welcome! You can:

Add new features (e.g., task filtering, notifications)

Improve UI/UX

Fix bugs

Add tests

⚠️ Important
Do NOT commit .env or node_modules

Make sure MongoDB is running before starting the backend

📚 References
MongoDB Documentation

Express.js Documentation

React Documentation

Node.js Documentation

🎉 License
This project is for learning and portfolio purposes.
