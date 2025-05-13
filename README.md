
# MERN Stack Project

This is a full-stack web application built using the **MERN** stack:
- **MongoDB** – for the database
- **Express.js** – for the backend framework
- **React.js** – for the frontend UI
- **Node.js** – for the server environment

## 📁 Project Structure

```
project-root/
├── backend/       # Express + Node backend
│   ├── server.js
│   └── ... other backend files
├── frontend/      # React frontend
│   ├── src/
│   ├── public/
│   └── ... other frontend files
└── README.md
```

## 🚀 Getting Started

Follow these steps to get the project up and running locally.

### ✅ Prerequisites

Make sure you have the following installed on your machine:
- Node.js
- npm
- MongoDB (local or cloud)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-root>
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

## ⚙️ Environment Variables

Create a `.env` file inside the `backend` folder with the following content:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

> Replace `your_mongodb_connection_string` with your actual MongoDB URI.

## 🏁 Running the Project

### 1. Start the Backend

```bash
cd backend
nodemon server.js
```

> Make sure MongoDB is running before starting the backend.

### 2. Start the Frontend

Open a new terminal window and run:

```bash
cd frontend
npm run dev
```

## 🌐 Access the App

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📂 Optional Scripts

You can use the following scripts during development:

### Frontend

```bash
npm run dev        # Start development server
npm run build      # Build for production
```

### Backend

```bash
nodemon server.js  # Auto-restarts backend on file changes
```

## 🤝 Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add your message'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙌 Acknowledgements

- MongoDB
- Express.js
- React
- Node.js
