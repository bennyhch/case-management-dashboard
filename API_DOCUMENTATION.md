# Case Management API Documentation

**Base URL**: `/api/tasks`

This API manages tasks with CRUD operations, supporting basic functions such as soft deletes and status updates. Tasks have statuses: `OPEN`, `IN_PROGRESS`, or `COMPLETED`.

<hr/>

## NOtes

- Soft delete: Tasks are not permanently deleted. They're marked with a `deletedAt` timestamp and filtered out in the `GET /api/tasks` endpoint
- Status Options: `Open`, `IN_PROGRESS`, `COMPLETED`

## Tech Stack

- Backend: Nextjs Route Handlers
- Database: Prisma ORM, MySQL

## Overview

1. POST /api/tasks — Create a task.
2. GET /api/tasks — Fetch all tasks.
3. PATCH /api/tasks/:id — Update the status of a task.
4. DELETE /api/tasks/:id — Soft delete a single task.
5. GET /api/tasks/:id — Fetch one single task.

## Endpoints

### Get All Tasks

- **Method**: `GET`
- **URL**: `/api/tasks`
- **Description**: Fetches all active (not deleted) tasks, ordered by newest first.

#### Response

```json
[
  {
    "id": 1,
    "title": "Complete assignment",
    "description": "Finish math homework",
    "status": "IN_PROGRESS",
    "dueDate": "2025-05-01T00:00:00.000Z"
  },
  ...
]
```

Status Codes

    200 OK: Tasks fetched successfully.

### Create a Task

- **Method**: `POST`
- **URL**: `/api/tasks`
- **Description**: Creates a new task

#### Request BoDy

```json
[
  {
    "title": "New Task",
    "description": "Optional task descrition",
    "status": "IN_PROGRESS",
    "dueDate": "2025-05-01T00:00:00.000Z"
  }
]
```

#### Response

```json
[
  {
    "id": 2,
    "title": "New Task",
    "description": "Optional task descrition",
    "status": "IN_PROGRESS",
    "dueDate": "2025-05-01T00:00:00.000Z"
  }
]
```

Status Codes

    201 Created: Tasks created successfully.
    400 Bad Request: Missing required fields (`title`, `status`, `dueDate`)

### Get a Single Task

- **Method**: `GET`
- **URL**: `/api/tasks/:id`
- **Description**: Fetches a specific task by its ID

#### Response

```json
[
  {
    "id": 1,
    "title": "Complete assignment",
    "description": "Finish math homework",
    "status": "IN_PROGRESS",
    "dueDate": "2025-05-01T00:00:00.000Z"
  }
]
```

Status Codes

    200 OK: Task fetched successfully.
    400 Bad Request: Missing or invalid ID.

### Update Task Status

- **Method**: `PATCH`
- **URL**: `/api/tasks/:id`
- **Description**: Updates only teh status of a task

#### Request Body

```json
[
  {
    "status": "IN_PROGRESS"
  }
]
```

#### Response

```json
[
  {
    "id": 1,
    "title": "Complete assignment",
    "description": "Finish math homework",
    "status": "IN_PROGRESS",
    "dueDate": "2025-05-01T00:00:00.000Z"
  }
]
```

Status Codes

    200 OK: Task status updated successfully.
    400 Bad Request: Missing status or invalid ID.

### Delete a Task (Soft Delete)

- **Method**: `DELETE`
- **URL**: `/api/tasks/:id`
- **Description**: Soft deletes a task by setting its deleteAt field (not removing the record)

#### Response

```json
[
  {
    "id": 1,
    "title": "Complete assignment",
    "description": "Finish math homework",
    "status": "IN_PROGRESS",
    "dueDate": "2025-05-01T00:00:00.000Z",
    "deletedAt": "2025-04-27T14:22:00.000Z"
  }
]
```

Status Codes

    200 OK: Task soft-deleted successfully.
    400 Bad Request: Missing or invalid ID.
