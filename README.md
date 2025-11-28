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

3. (Optional) Load sample data:
   ```bash
   psql -U postgres -d employee_tracker -f ../database/sample_data.sql
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

## 📡 API Endpoint Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All endpoints (except `/auth/register` and `/auth/login`) require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

### 1. Authentication Endpoints

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

### 2. Dashboard Endpoints

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

### 3. Employee Endpoints

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

### 4. Task Endpoints

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
- **Frontend Not Updated:** The frontend has not been updated to handle authentication. Manual API calls or frontend updates needed for login/register UI.
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
- Implement email verification on registration
- Add two-factor authentication (2FA)
- Add refresh token mechanism for JWT
- Add unit and integration tests
- Deploy with CI/CD pipeline
