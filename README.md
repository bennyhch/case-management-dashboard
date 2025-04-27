# Case Management System

A simple task management app built with **Next.js**, **TypeScript**, **TailwindCSS**, and **Prisma ORM**.

---

## Features

- Create, view, update, and soft-delete tasks.
- Update task status directly from the task card.
- Soft delete system (no permanent deletion).
- API endpoints fully RESTful.
- Responsive design

---

## Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Prisma ORM** (with MySQL)
- **React Hooks** (useState, useEffect)

---

## API Overview

| Method | Endpoint         | Description            |
| :----- | :--------------- | :--------------------- |
| GET    | `/api/tasks`     | Fetch all active tasks |
| POST   | `/api/tasks`     | Create a new task      |
| GET    | `/api/tasks/:id` | Fetch a single task    |
| PATCH  | `/api/tasks/:id` | Update task status     |
| DELETE | `/api/tasks/:id` | Soft delete a task     |

[Full API Documentation](./API_DOCUMENTATION.md)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/bennyhch/case-management-dashboard.git
cd case-management-dashboard
```

### 2. Clone the repo

```
npm install

```

### 3. Set up env variables

Create a `.env` file, with your own USERNAME (e.g., root), PASSWORD, and PORTNUMBER (e.g., 3306)

```
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:PORTNUMBER/case_management_dashboard"
```

### 4. Run migration

```
npx prisma migrate dev --name init
```

### 5. Run the dev server

```
npm run dev
```

<hr/>

### Test

If you need to run tests, execute the following command after installing all dependencies:

```
npm run test
```
