initial commit
# Task Manager App (MERN + Next.js)

Full-stack task management app with JWT authentication and CRUD tasks.

## Tech Stack

- **Frontend:** Next.js (App Router) + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB
- **Auth:** JWT with email/password
- **Validation:** express-validator

## Project Structure

- `frontend/` - Next.js client (`/signup`, `/login`, `/dashboard`)
- `backend/` - Express API (`/api/auth/*`, `/api/tasks/*`)

## Backend API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

All task routes are protected by JWT middleware.

## Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task-manager
JWT_SECRET=your_super_secret_key
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Run Locally

### 1) Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2) Start backend

```bash
cd backend
npm run dev
```

### 3) Start frontend

```bash
cd frontend
npm run dev
```

Frontend: `http://localhost:3000`

## Features

- User registration and login with hashed passwords (`bcryptjs`)
- JWT-based route protection for tasks
- Create, read, update, delete tasks
- Task fields: `taskName` (required), `description`, `dueDate` (required)
- Client-side required-field validation and protected dashboard route