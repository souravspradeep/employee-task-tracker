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
```

**Note:** Replace with your PostgreSQL credentials.

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

### 1. Dashboard Endpoints

#### Get Dashboard Statistics
```
GET /dashboard
```
**Response:** Returns summary statistics including total employees, total tasks, and task status breakdown.

**Example Response:**
```json
{
  "totalEmployees": 10,
  "totalTasks": 25,
  "completedTasks": 15,
  "pendingTasks": 7,
  "urgentTasks": 3
}
```

---

### 2. Employee Endpoints

#### Get All Employees
```
GET /employees
```
**Response:** Returns array of all employees.

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "department": "Engineering",
    "position": "Senior Developer",
    "created_at": "2025-11-28T10:00:00Z"
  }
]
```

#### Get Employee by ID
```
GET /employees/:id
```
**Parameters:**
- `id` (path) - Employee ID

**Example Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "department": "Engineering",
  "position": "Senior Developer",
  "created_at": "2025-11-28T10:00:00Z"
}
```

#### Create Employee
```
POST /employees
```
**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "department": "Design",
  "position": "UI/UX Designer"
}
```

**Response:** (201 Created)
```json
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "department": "Design",
  "position": "UI/UX Designer",
  "created_at": "2025-11-28T10:30:00Z"
}
```

---

### 3. Task Endpoints

#### Get All Tasks
```
GET /tasks
```
**Query Parameters:**
- `employee_id` (optional) - Filter by employee
- `status` (optional) - Filter by status (pending, in_progress, completed)
- `priority` (optional) - Filter by priority (low, medium, high, urgent)

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "Design Dashboard UI",
    "description": "Create mockups for the dashboard",
    "status": "in_progress",
    "priority": "high",
    "employee_id": 2,
    "due_date": "2025-12-15",
    "created_at": "2025-11-28T10:00:00Z"
  }
]
```

#### Get Task by ID
```
GET /tasks/:id
```
**Parameters:**
- `id` (path) - Task ID

**Example Response:**
```json
{
  "id": 1,
  "title": "Design Dashboard UI",
  "description": "Create mockups for the dashboard",
  "status": "in_progress",
  "priority": "high",
  "employee_id": 2,
  "due_date": "2025-12-15",
  "created_at": "2025-11-28T10:00:00Z"
}
```

#### Create Task
```
POST /tasks
```
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
  "id": 2,
  "title": "Fix login bug",
  "description": "Resolve authentication issue on login page",
  "status": "pending",
  "priority": "urgent",
  "employee_id": 1,
  "due_date": "2025-12-01",
  "created_at": "2025-11-28T11:00:00Z"
}
```

#### Update Task
```
PUT /tasks/:id
```
**Parameters:**
- `id` (path) - Task ID

**Request Body:** (any of the following)
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
  "id": 2,
  "title": "Fix login bug",
  "description": "Updated description",
  "status": "completed",
  "priority": "high",
  "employee_id": 1,
  "due_date": "2025-12-05",
  "created_at": "2025-11-28T11:00:00Z"
}
```

#### Delete Task
```
DELETE /tasks/:id
```
**Parameters:**
- `id` (path) - Task ID

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## 🗄️ Database Schema

### Employees Table
```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
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
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Relationships:**
- Tasks have a foreign key relationship with Employees
- Deleting an employee cascades to delete all their tasks

---

## 📋 Assumptions & Limitations

### Assumptions
- **Authentication:** No authentication system is implemented. All endpoints are publicly accessible.
- **Email Uniqueness:** Employee emails must be unique in the system.
- **Task Status Values:** Assumed valid statuses are `pending`, `in_progress`, and `completed`.
- **Task Priority Levels:** Assumed valid priorities are `low`, `medium`, `high`, and `urgent`.
- **PostgreSQL:** The application assumes PostgreSQL is the database system.
- **Environment Variables:** The backend requires environment variables to be set before running.
- **CORS:** CORS is enabled for all origins. In production, this should be restricted.

### Limitations
- **No User Authentication:** Tasks and employees cannot be restricted by user. All users can view and modify all data.
- **No Pagination:** Large datasets are returned without pagination. This may cause performance issues with large datasets.
- **No Input Validation:** The backend has minimal validation on request data. In production, comprehensive validation should be added.
- **No File Uploads:** The application does not support file attachments or document uploads.
- **No Real-time Updates:** The application uses polling; WebSockets are not implemented for real-time updates.
- **No Audit Trail:** Changes to tasks and employees are not logged for audit purposes.
- **Limited Error Handling:** API responses don't include detailed error codes or messages in all cases.
- **Single Database:** The application uses a single PostgreSQL instance without replication or backup strategy.
- **Frontend Performance:** Large lists may have performance issues due to lack of virtualization.
- **No Search or Advanced Filtering:** Search functionality is not implemented on the frontend.

### Future Enhancements
- Add JWT authentication and authorization
- Implement pagination for large datasets
- Add input validation and sanitization
- Add file upload capability
- Implement WebSocket for real-time updates
- Add audit logging
- Implement advanced search and filtering
- Add unit and integration tests
- Deploy with CI/CD pipeline
