### 🧩 Mini_CMS – Product Management System

A simple full-stack CMS application for managing products, built with **React (Vite)** for the frontend and **Sails.js** for the backend. The project uses **MongoDB** as the primary database.

#### 📂 Project Structure

```

Mini_CMS/
├── Back_end/ # Sails.js API
├── Front_end/ # React (Vite)
└── README.md

```

#### ⚙️ Requirements

- Node.js >= 18
- npm or yarn
- MongoDB instance (local or cloud)
- Git

#### 🚀 Getting Started

##### 1. Clone the project

```bash
git clone https://github.com/your-username/Mini_CMS.git
cd Mini_CMS
```

##### 2.📦 Install Dependencies

**Backend (Sails.js)**

```bash
cd backend
npm install
```

**Frontend (React + Vite)**

```bash
cd ../frontend
npm install
```

##### 3. 🌐 Environment Variables

**Backend (`Back_end/.env`)**

Create a `.env` file inside the `Back_end` folder:

```env
MONGO_URL=mongodb://localhost:27017/mini_cms
```

Ensure that `config/datastores.js` is set to use `MONGO_URL`.

**Frontend (`Front_end/.env`)**

```env
VITE_API_URL=http://localhost:1337
```

This is used to make API calls from the frontend to the backend.

##### 4. 🏃 Run the Project

**- Start MongoDB**
Make sure your MongoDB is running locally or you have a connection string (e.g., MongoDB Atlas).

**- Run Backend**

```bash
cd backend
npm run dev      # or sails lift
```

> Backend should be running at: `http://localhost:1337`

**- Run Frontend**

```bash
cd ../frontend
npm run dev
```

> Frontend should be running at: `http://localhost:5173`

> 🔧 Make sure CORS is configured correctly in `backend/config/security.js` to allow requests from the frontend.

#### 📄 API Documentation

Coming soon...
