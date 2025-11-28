# Employee Task Tracker

A full-stack web application for managing employees and their tasks. Built with React, Express, PostgreSQL, and Tailwind CSS.

## 📋 Table of Contents

- [Tech Stack & Architecture](#tech-stack--architecture)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoint Documentation](#api-endpoint-documentation)
- [Database Schema](#database-schema)
- [Assumptions & Limitations](#assumptions--limitations)

---

## 🏗️ Tech Stack & Architecture

### Frontend
- **React** (v19.2.0) - UI framework
- **Vite** (v7.2.4) - Build tool and dev server
- **Tailwind CSS** (v4.1.17) - Utility-first CSS framework
- **Axios** (v1.13.2) - HTTP client for API requests
- **ESLint** - Code quality and linting

### Backend
- **Node.js** with **Express** (v5.1.0) - REST API server
- **PostgreSQL** (via pg v8.16.3) - Relational database
- **CORS** (v2.8.5) - Cross-origin request handling
- **dotenv** (v17.2.3) - Environment variable management
- **Nodemon** (v3.1.11) - Auto-restart during development

### Architecture Overview

```
┌─────────────┐         ┌──────────────┐         ┌────────────────┐
│   React     │◄────────│   Express    │◄───────►│  PostgreSQL    │
│  Frontend   │  HTTP   │    Backend   │   SQL   │   Database     │
│  (Port 5173)│         │  (Port 5000) │         │                │
└─────────────┘         └──────────────┘         └────────────────┘
```

The frontend communicates with the backend via REST API endpoints. The backend manages business logic and database operations.

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd employee-task-tracker
```

### 2. Backend Setup

#### a. Install Backend Dependencies

```bash
cd backend
npm install
```

#### b. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_tracker
DB_USER=postgres
DB_PASSWORD=your_password_here
JWT_SECRET=your-secret-key-here-change-in-production
```

**Note:** Replace with your PostgreSQL credentials and set a strong JWT secret.

#### c. Initialize the Database

1. Open PostgreSQL and create a new database:
   ```sql
   CREATE DATABASE employee_tracker;
   ```

2. Run the schema to create tables:
   ```bash
   psql -U postgres -d employee_tracker -f ../database/schema.sql
   ```



### 3. Frontend Setup

#### a. Install Frontend Dependencies

```bash
cd frontend
npm install
```

#### b. Configure API Base URL

Edit `frontend/src/services/api.js` to set the backend API URL (default is `http://localhost:5000`).

---

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Start Backend**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Build

**Build Frontend**
```bash
cd frontend
npm run build
npm run preview
```

**Start Backend for Production**
```bash
cd backend
npm start
```

---

## 🌐 Deploying on Render (Beginner Guide)

This section provides step-by-step instructions to deploy your full-stack application on Render.

### What You'll Deploy
- **Backend API** on a Render Web Service (Node.js)
- **Frontend** served by the Backend (built static files)
- **Database** using Render PostgreSQL

### Prerequisites
1. **GitHub Account** - Required to connect your repository to Render
2. **Render Account** - Sign up at [render.com](https://render.com) (free tier available)
3. **Your Code on GitHub** - Push your project to GitHub

### Step 1: Push Your Code to GitHub

If you haven't already, push your project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/employee-task-tracker.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

### Step 2: Create a Render Account

1. Go to [render.com](https://render.com)
2. Click **Sign Up**
3. Sign up using GitHub (easiest option)
4. Authorize Render to access your GitHub repositories

---

### Step 3: Create PostgreSQL Database on Render

#### 3a. Create a New PostgreSQL Instance

1. From Render Dashboard, click **New +** → **PostgreSQL**
2. Fill in the details:
   - **Name:** `employee-tracker-db`
   - **Database:** `employee_tracker` (default is fine)
   - **User:** `postgres` (default is fine)
   - **Region:** Choose closest to you (e.g., Ohio, Frankfurt)
   - **PostgreSQL Version:** 15 or higher
3. Select **Free** tier (for testing; use paid for production)
4. Click **Create Database**

#### 3b. Initialize Database Schema

1. Once database is created, click on it
2. Copy the **Internal Database URL** (looks like `postgresql://...`)
3. In your local terminal, set the database URL:
   ```bash
   # Windows Command Prompt
   set DATABASE_URL=your_internal_database_url_here
   ```
   or
   ```bash
   # PowerShell
   $env:DATABASE_URL="your_internal_database_url_here"
   ```

4. Connect and initialize:
   ```bash
   psql "your_internal_database_url"
   ```

5. Copy and paste the SQL from `database/schema.sql` into the psql terminal
6. Type `\q` to exit

Alternatively, use Render's **Query** tab to run the schema SQL directly.

---

### Step 4: Create Backend Web Service

#### 4a. Create Service

1. From Render Dashboard, click **New +** → **Web Service**
2. Select your GitHub repository (`employee-task-tracker`)
3. Click **Connect**

#### 4b. Configure Service

Fill in the configuration:

- **Name:** `employee-tracker-backend`
- **Environment:** `Node`
- **Build Command:** `cd backend && npm install`
- **Start Command:** `cd backend && npm start`
- **Instance Type:** Free (for testing)

#### 4c. Add Environment Variables

Scroll to **Environment** section and add:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `DB_HOST` | Copy from PostgreSQL instance (Internal Database URL, extract hostname) |
| `DB_PORT` | `5432` |
| `DB_NAME` | `employee_tracker` |
| `DB_USER` | `postgres` |
| `DB_PASSWORD` | Copy from PostgreSQL instance credentials |
| `JWT_SECRET` | Generate a secure random string (e.g., use [randomkeygen.com](https://randomkeygen.com)) |

**To find PostgreSQL connection details:**
1. Go to your Render PostgreSQL instance
2. Click on it
3. Scroll down to see **Connections** → **Internal Database URL** or individual fields

**Example Internal URL:** `postgresql://postgres:password123@dpg-xxxxx.render.com:5432/employee_tracker`

Extract:
- `DB_HOST`: `dpg-xxxxx.render.com`
- `DB_USER`: `postgres`
- `DB_PASSWORD`: `password123`
- `DB_NAME`: `employee_tracker`
- `DB_PORT`: `5432`

#### 4d. Create Service

Click **Create Web Service** and wait for it to deploy (2-3 minutes).

Once deployed, you'll see a URL like: `https://employee-tracker-backend.onrender.com`

---

### Step 5: Build & Deploy Frontend

The frontend will be served by the backend. First, let's build it:

#### 5a. Update Frontend API URL

Edit `frontend/src/services/api.js`:

```javascript
// Change this line:
// const API_BASE_URL = 'http://localhost:5000/api';

// To your Render backend URL:
const API_BASE_URL = 'https://employee-tracker-backend.onrender.com/api';
```

#### 5b. Add Frontend Build to Backend Server

Modify `backend/src/server.js` to serve the built frontend:

```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/taskRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

// Serve static frontend files (after building)
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('/api', (req, res) => {
  res.json({ 
    message: 'Employee Task Tracker API is running!',
    version: '1.0.0'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/health', healthRoutes);

// Serve frontend for all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
```

#### 5c. Update Backend Build Command

Go back to your Render Web Service and update the **Build Command**:

```bash
cd backend && npm install && cd ../frontend && npm install && npm run build && cd ../backend
```

#### 5d. Redeploy

1. Go to your Render Web Service
2. Click **Manual Deploy** → **Deploy latest commit**
3. Wait for deployment to complete (3-5 minutes)

---

### Step 6: Test Your Deployment

1. Go to your backend URL: `https://employee-tracker-backend.onrender.com`
2. You should see: `{"message": "Employee Task Tracker API is running!", "version": "1.0.0"}`
3. Test the API: `https://employee-tracker-backend.onrender.com/api/health`
4. Access your app: `https://employee-tracker-backend.onrender.com/` (frontend should load)

---

### Step 7: First Login (Create Admin User)

1. Register a new user via the frontend
2. To make them admin, use Render PostgreSQL query:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your_email@example.com';
   ```

Or insert an admin directly:
   ```sql
   INSERT INTO users (email, password, role) 
   VALUES ('admin@example.com', '$2a$10$hashedpassword', 'admin');
   ```

---

### Step 8: Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **"Cannot find module"** | Check Build Command includes `npm install` |
| **Database connection failed** | Verify `DB_HOST`, `DB_USER`, `DB_PASSWORD` in Environment variables |
| **Frontend shows 404** | Make sure frontend is built; check Build Command |
| **CORS errors** | CORS is enabled for all origins in server.js; adjust if needed |
| **Free tier database hibernates** | Add at least 1 read replica or upgrade to paid plan |

---

### Step 9: Production Checklist

- [ ] Update `JWT_SECRET` to a strong random string
- [ ] Set `NODE_ENV=production` in environment variables
- [ ] Update CORS to allow only your domain
- [ ] Enable HTTPS (Render does this automatically)
- [ ] Set up database backups (Render paid tier)
- [ ] Monitor logs for errors
- [ ] Test all features (login, create task, update employee, etc.)

---

### Step 10: Custom Domain (Optional)

1. In Render Service settings, scroll to **Custom Domain**
2. Enter your domain (e.g., `employee-tracker.com`)
3. Update DNS records at your domain registrar
4. Render will provide DNS records to add

---

### Useful Links

- [Render Documentation](https://render.com/docs)
- [PostgreSQL Setup Guide](https://render.com/docs/databases)
- [Environment Variables Guide](https://render.com/docs/environment-variables)
- [Deploy from GitHub](https://render.com/docs/github)

---

## 💰 Render Pricing

- **Web Service (Free):** 750 free tier hours/month (shared CPU, RAM)
- **PostgreSQL (Free):** 90 days free, then paused if inactive
- **Paid tiers:** Starting $7/month for Web Service, $15/month for dedicated DB

For production use, consider upgrading to avoid free tier limitations.

---

## 📡 API Endpoint Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All endpoints (except `/auth/register`, `/auth/login`, and `/health`) require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

### 1. Health Check

#### Get API Health Status
```
GET /health
```
**Public endpoint - No authentication required**

**Response:** (200 OK)
```json
{
  "status": "UP",
  "timestamp": "2025-11-28T12:00:00.000Z"
}
```

### 2. Authentication Endpoints

#### Register User
```
POST /auth/register
```
**Public endpoint - No authentication required**

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "department": "Engineering",
  "position": "Developer"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user",
    "employee": {
      "id": 1,
      "user_id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "department": "Engineering",
      "position": "Developer"
    }
  }
}
```

#### Login
```
POST /auth/login
```
**Public endpoint - No authentication required**

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user",
    "employee": {
      "id": 1,
      "user_id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "department": "Engineering",
      "position": "Developer"
    }
  }
}
```

#### Get Current User
```
GET /auth/me
```
**Authentication required**

**Response:** (200 OK)
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user",
    "employee": {
      "id": 1,
      "user_id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "department": "Engineering",
      "position": "Developer"
    }
  }
}
```

---

### 3. Dashboard Endpoints

#### Get Dashboard Statistics
```
GET /dashboard
```
**Authentication required**

**For Admin Users:** Returns system-wide statistics.

**For Regular Users:** Returns only their assigned task statistics.

**Example Response (Admin):**
```json
{
  "success": true,
  "data": {
    "totalEmployees": 10,
    "totalTasks": 25,
    "completedTasks": 15,
    "completionRate": 60.0,
    "tasksByStatus": [
      { "status": "completed", "count": "15" },
      { "status": "pending", "count": "7" },
      { "status": "in_progress", "count": "3" }
    ]
  }
}
```

**Example Response (Regular User):**
```json
{
  "success": true,
  "data": {
    "myTasks": 5,
    "completedTasks": 3,
    "completionRate": 60.0,
    "tasksByStatus": [
      { "status": "completed", "count": "3" },
      { "status": "pending", "count": "1" },
      { "status": "in_progress", "count": "1" }
    ]
  }
}
```

---

### 4. Employee Endpoints

#### Get All Employees
```
GET /employees
```
**Authentication required - Admin only**

**Response:** Returns array of all employees.

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "department": "Engineering",
      "position": "Senior Developer",
      "created_at": "2025-11-28T10:00:00Z"
    }
  ]
}
```

#### Get Employee by ID
```
GET /employees/:id
```
**Authentication required**

**Access:**
- Admin: Can view any employee
- Regular users: Can only view their own profile

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "department": "Engineering",
    "position": "Senior Developer",
    "created_at": "2025-11-28T10:00:00Z"
  }
}
```

#### Create Employee
```
POST /employees
```
**Authentication required - Admin only**

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "department": "Design",
  "position": "UI/UX Designer",
  "user_id": 2
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "id": 2,
    "user_id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "department": "Design",
    "position": "UI/UX Designer",
    "created_at": "2025-11-28T10:30:00Z"
  }
}
```

#### Update Employee
```
PUT /employees/:id
```
**Authentication required**

**Access:**
- Admin: Can update any employee
- Regular users: Can only update their own profile

**Request Body:**
```json
{
  "name": "Jane Smith Updated",
  "department": "Design",
  "position": "Senior UI/UX Designer"
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": { ... }
}
```

#### Delete Employee
```
DELETE /employees/:id
```
**Authentication required - Admin only**

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

---

### 5. Task Endpoints

#### Get All Tasks
```
GET /tasks
```
**Authentication required**

**Access:**
- Admin: Can view all tasks
- Regular users: Can only view their assigned tasks

**Query Parameters:**
- `status` (optional) - Filter by status (pending, in_progress, completed)
- `employee_id` (optional) - Filter by employee

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Design Dashboard UI",
      "description": "Create mockups for the dashboard",
      "status": "in_progress",
      "priority": "high",
      "employee_id": 2,
      "employee_name": "Jane Smith",
      "employee_email": "jane@example.com",
      "assigned_by": 1,
      "due_date": "2025-12-15",
      "created_at": "2025-11-28T10:00:00Z",
      "updated_at": "2025-11-28T10:00:00Z"
    }
  ]
}
```

#### Get Task by ID
```
GET /tasks/:id
```
**Authentication required**

**Access:**
- Admin: Can view any task
- Regular users: Can only view their assigned tasks

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Design Dashboard UI",
    "description": "Create mockups for the dashboard",
    "status": "in_progress",
    "priority": "high",
    "employee_id": 2,
    "employee_name": "Jane Smith",
    "assigned_by": 1,
    "due_date": "2025-12-15",
    "created_at": "2025-11-28T10:00:00Z",
    "updated_at": "2025-11-28T10:00:00Z"
  }
}
```

#### Create Task
```
POST /tasks
```
**Authentication required - Admin only**

**Request Body:**
```json
{
  "title": "Fix login bug",
  "description": "Resolve authentication issue on login page",
  "priority": "urgent",
  "employee_id": 1,
  "due_date": "2025-12-01"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 2,
    "title": "Fix login bug",
    "description": "Resolve authentication issue on login page",
    "status": "pending",
    "priority": "urgent",
    "employee_id": 1,
    "assigned_by": 1,
    "due_date": "2025-12-01",
    "created_at": "2025-11-28T11:00:00Z",
    "updated_at": "2025-11-28T11:00:00Z"
  }
}
```

#### Update Task
```
PUT /tasks/:id
```
**Authentication required - Admin only**

**Request Body:**
```json
{
  "title": "Fix login bug",
  "description": "Updated description",
  "status": "completed",
  "priority": "high",
  "employee_id": 1,
  "due_date": "2025-12-05"
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": { ... }
}
```

#### Delete Task
```
DELETE /tasks/:id
```
**Authentication required - Admin only**

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Employees Table
```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50),
    position VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'medium',
    employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    assigned_by INTEGER REFERENCES users(id),
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Relationships:**
- Users have a one-to-one relationship with Employees
- Tasks have a many-to-one relationship with Employees
- Tasks track who assigned them via the `assigned_by` field
- Deleting an employee cascades to delete all their tasks
- Deleting a user cascades to delete their employee profile

---

## 📋 Assumptions & Limitations

### Authentication & Authorization
- **JWT Authentication:** JWT tokens are used for authentication and expire after 24 hours.
- **Role-based Access Control (RBAC):**
  - **Admin:** Can view, create, update, and delete employees and tasks. Can view all system statistics.
  - **Regular User:** Can view their own profile and assigned tasks only. Can see only their task statistics on the dashboard.
- **Admin Role Assignment:** Currently, users are created with the "user" role. To create an admin, manually update the role in the database.
- **Email Uniqueness:** Both user emails and employee emails must be unique in the system.

### Task Management
- **Task Assignment:** Tasks can only be assigned to existing employees by admins.
- **Task Status Values:** Valid statuses are `pending`, `in_progress`, and `completed`.
- **Task Priority Levels:** Valid priorities are `low`, `medium`, `high`, and `urgent`.
- **View Restrictions:** Regular users cannot view tasks assigned to other users.

### Limitations
- **No Pagination:** Large datasets are returned without pagination. This may cause performance issues with large datasets.
- **No Input Validation:** The backend has minimal validation on request data. In production, comprehensive validation should be added.
- **No File Uploads:** The application does not support file attachments or document uploads.
- **No Real-time Updates:** The application uses polling; WebSockets are not implemented for real-time updates.
- **No Audit Trail:** Changes to tasks and employees are not logged for audit purposes (though `updated_at` timestamps are tracked).
- **Limited Error Handling:** API responses don't include detailed error codes or messages in all cases.
- **Single Database Instance:** The application uses a single PostgreSQL instance without replication or backup strategy.
- **No Password Reset:** Users cannot reset their passwords via email or other mechanisms.
- **No User Management UI:** Admin cannot manage user roles through the UI.

### Security Considerations
- **JWT Secret:** In production, use a strong, randomly generated JWT secret (not the default).
- **CORS:** CORS is currently enabled for all origins. In production, restrict to specific domains.
- **Password Security:** Passwords are hashed with bcrypt (salt rounds: 10).
- **HTTPS:** Use HTTPS in production (not HTTP).
- **Rate Limiting:** Not implemented. Add rate limiting middleware in production.

### Future Enhancements

- Implement pagination for large datasets

- Add comprehensive input validation and sanitization

- Add file upload capability

- Implement WebSocket for real-time updates

- Add detailed audit logging

- Add password reset functionality

- Add user management dashboard for admins

- Add refresh token mechanism for JWT


