# ARISZ - API Documentation

Complete API reference for the ARISZ task management system.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-app.vercel.app/api`

## Authentication

All API endpoints (except auth endpoints) require authentication via NextAuth session cookie.

### Headers

```
Cookie: next-auth.session-token=<your-session-token>
```

### Error Responses

```json
{
  "error": "Unauthorized"
}
```

Status Code: `401`

---

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint**: `POST /api/auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response**: `201 Created`
```json
{
  "user": {
    "id": "clxxx...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses**:
- `400 Bad Request` - Invalid input data
- `409 Conflict` - Email already exists

---

### Sign In

Sign in with NextAuth (handled by NextAuth.js).

**Endpoint**: `POST /api/auth/signin`

Use NextAuth client methods for authentication.

---

## Task Endpoints

### Get All Tasks

Retrieve all tasks for the authenticated user.

**Endpoint**: `GET /api/tasks`

**Query Parameters**:
- `status` (optional): Filter by status (`PENDING`, `IN_PROGRESS`, `COMPLETED`)
- `category` (optional): Filter by category
- `startDate` (optional): Filter tasks from this date (ISO 8601)
- `endDate` (optional): Filter tasks until this date (ISO 8601)
- `parentId` (optional): Get subtasks of a specific task (`null` for top-level tasks)

**Example Request**:
```
GET /api/tasks?status=PENDING&category=Work
```

**Response**: `200 OK`
```json
{
  "tasks": [
    {
      "id": "clxxx...",
      "title": "Complete project proposal",
      "description": "Write and submit the Q1 project proposal",
      "category": "Work",
      "priority": "HIGH",
      "status": "PENDING",
      "estimatedTime": 120,
      "actualTime": null,
      "dueDate": "2024-01-15T00:00:00.000Z",
      "completedAt": null,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "userId": "clyyy...",
      "parentId": null,
      "subtasks": []
    }
  ]
}
```

---

### Get Single Task

Retrieve a specific task with all its subtasks.

**Endpoint**: `GET /api/tasks/[id]`

**Response**: `200 OK`
```json
{
  "id": "clxxx...",
  "title": "Complete project proposal",
  "description": "Write and submit the Q1 project proposal",
  "category": "Work",
  "priority": "HIGH",
  "status": "IN_PROGRESS",
  "estimatedTime": 120,
  "actualTime": 45,
  "dueDate": "2024-01-15T00:00:00.000Z",
  "completedAt": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-05T00:00:00.000Z",
  "userId": "clyyy...",
  "parentId": null,
  "subtasks": [
    {
      "id": "clzzz...",
      "title": "Research competitors",
      "status": "COMPLETED",
      "estimatedTime": 30,
      "actualTime": 35
    }
  ]
}
```

**Error Responses**:
- `404 Not Found` - Task doesn't exist or doesn't belong to user

---

### Create Task

Create a new task.

**Endpoint**: `POST /api/tasks`

**Request Body**:
```json
{
  "title": "Go to gym",
  "description": "Workout session focusing on upper body",
  "category": "Health",
  "priority": "MEDIUM",
  "estimatedTime": 60,
  "dueDate": "2024-01-10T18:00:00.000Z",
  "parentId": null
}
```

**Required Fields**:
- `title` (string): Task title

**Optional Fields**:
- `description` (string): Detailed description
- `category` (string): Category name (default: "Personal")
- `priority` (enum): LOW, MEDIUM, HIGH (default: MEDIUM)
- `status` (enum): PENDING, IN_PROGRESS, COMPLETED (default: PENDING)
- `estimatedTime` (number): Estimated time in minutes
- `actualTime` (number): Actual time spent in minutes
- `dueDate` (ISO 8601 string): Due date
- `parentId` (string): Parent task ID for subtasks

**Response**: `201 Created`
```json
{
  "id": "clxxx...",
  "title": "Go to gym",
  "description": "Workout session focusing on upper body",
  "category": "Health",
  "priority": "MEDIUM",
  "status": "PENDING",
  "estimatedTime": 60,
  "actualTime": null,
  "dueDate": "2024-01-10T18:00:00.000Z",
  "completedAt": null,
  "createdAt": "2024-01-08T00:00:00.000Z",
  "updatedAt": "2024-01-08T00:00:00.000Z",
  "userId": "clyyy...",
  "parentId": null
}
```

---

### Update Task

Update an existing task.

**Endpoint**: `PUT /api/tasks/[id]`

**Request Body**:
```json
{
  "status": "COMPLETED",
  "actualTime": 55,
  "completedAt": "2024-01-10T19:00:00.000Z"
}
```

**Response**: `200 OK`
```json
{
  "id": "clxxx...",
  "title": "Go to gym",
  "status": "COMPLETED",
  "actualTime": 55,
  "completedAt": "2024-01-10T19:00:00.000Z",
  "updatedAt": "2024-01-10T19:00:00.000Z"
}
```

---

### Delete Task

Delete a task and all its subtasks.

**Endpoint**: `DELETE /api/tasks/[id]`

**Response**: `204 No Content`

**Error Responses**:
- `404 Not Found` - Task doesn't exist or doesn't belong to user

---

### Add Subtask

Create a subtask under an existing task.

**Endpoint**: `POST /api/tasks/[id]/subtasks`

**Request Body**:
```json
{
  "title": "Warm up exercises",
  "estimatedTime": 10
}
```

**Response**: `201 Created`
```json
{
  "id": "clzzz...",
  "title": "Warm up exercises",
  "parentId": "clxxx...",
  "estimatedTime": 10,
  "status": "PENDING"
}
```

---

## Analytics Endpoints

### Get Daily Stats

Get statistics for a specific day.

**Endpoint**: `GET /api/analytics/daily`

**Query Parameters**:
- `date` (required): Date in YYYY-MM-DD format

**Example Request**:
```
GET /api/analytics/daily?date=2024-01-10
```

**Response**: `200 OK`
```json
{
  "date": "2024-01-10",
  "tasksCompleted": 5,
  "totalTasks": 8,
  "completionRate": 62.5,
  "totalTimeSpent": 180,
  "estimatedTime": 200,
  "categoryBreakdown": {
    "Work": 3,
    "Health": 1,
    "Personal": 1
  },
  "priorityBreakdown": {
    "HIGH": 2,
    "MEDIUM": 2,
    "LOW": 1
  }
}
```

---

### Get Weekly Stats

Get statistics for a week.

**Endpoint**: `GET /api/analytics/weekly`

**Query Parameters**:
- `startDate` (required): Start date in YYYY-MM-DD format

**Example Request**:
```
GET /api/analytics/weekly?startDate=2024-01-08
```

**Response**: `200 OK`
```json
{
  "startDate": "2024-01-08",
  "endDate": "2024-01-14",
  "totalTasksCompleted": 28,
  "totalTasks": 35,
  "averageCompletionRate": 80,
  "totalTimeSpent": 1260,
  "dailyStats": [
    {
      "date": "2024-01-08",
      "completed": 4,
      "total": 5,
      "timeSpent": 180
    },
    // ... more days
  ],
  "topCategories": [
    { "category": "Work", "count": 15 },
    { "category": "Health", "count": 8 },
    { "category": "Personal", "count": 5 }
  ]
}
```

---

### Get Monthly Stats

Get statistics for a month.

**Endpoint**: `GET /api/analytics/monthly`

**Query Parameters**:
- `month` (required): Month in YYYY-MM format

**Example Request**:
```
GET /api/analytics/monthly?month=2024-01
```

**Response**: `200 OK`
```json
{
  "month": "2024-01",
  "totalTasksCompleted": 120,
  "totalTasks": 150,
  "completionRate": 80,
  "totalTimeSpent": 5400,
  "weeklyBreakdown": [
    {
      "week": 1,
      "completed": 28,
      "total": 35,
      "timeSpent": 1260
    },
    // ... more weeks
  ],
  "categoryDistribution": {
    "Work": 60,
    "Health": 35,
    "Personal": 25
  },
  "bestDay": {
    "date": "2024-01-15",
    "completed": 8
  },
  "currentStreak": 12,
  "longestStreak": 15
}
```

---

### Get Yearly Stats

Get statistics for a year.

**Endpoint**: `GET /api/analytics/yearly`

**Query Parameters**:
- `year` (required): Year in YYYY format

**Example Request**:
```
GET /api/analytics/yearly?year=2024
```

**Response**: `200 OK`
```json
{
  "year": "2024",
  "totalTasksCompleted": 1440,
  "totalTasks": 1800,
  "completionRate": 80,
  "totalTimeSpent": 64800,
  "monthlyBreakdown": [
    {
      "month": "January",
      "completed": 120,
      "total": 150,
      "timeSpent": 5400
    },
    // ... more months
  ],
  "topCategories": [
    { "category": "Work", "count": 720 },
    { "category": "Health", "count": 420 },
    { "category": "Personal", "count": 300 }
  ],
  "productivityTrends": {
    "mostProductiveMonth": "March",
    "leastProductiveMonth": "December",
    "averageTasksPerDay": 3.9
  }
}
```

---

### Get Category Breakdown

Get task distribution across categories.

**Endpoint**: `GET /api/analytics/categories`

**Query Parameters**:
- `startDate` (optional): Filter from this date
- `endDate` (optional): Filter until this date

**Response**: `200 OK`
```json
{
  "categories": [
    {
      "name": "Work",
      "total": 150,
      "completed": 120,
      "pending": 20,
      "inProgress": 10,
      "totalTime": 7200,
      "averageTime": 60
    },
    {
      "name": "Health",
      "total": 90,
      "completed": 75,
      "pending": 10,
      "inProgress": 5,
      "totalTime": 3600,
      "averageTime": 48
    }
  ]
}
```

---

## Data Models

### Task Object

```typescript
interface Task {
  id: string                    // Unique identifier
  title: string                 // Task title
  description?: string          // Detailed description
  category: string              // Category name
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  estimatedTime?: number        // Minutes
  actualTime?: number           // Minutes
  dueDate?: string             // ISO 8601
  completedAt?: string         // ISO 8601
  createdAt: string            // ISO 8601
  updatedAt: string            // ISO 8601
  userId: string               // Owner ID
  parentId?: string            // Parent task ID
  subtasks?: Task[]            // Child tasks
}
```

### User Object

```typescript
interface User {
  id: string
  name?: string
  email: string
  image?: string
  createdAt: string
  updatedAt: string
}
```

---

## Rate Limits

- **Vercel Free Tier**: 100 requests per 10 seconds per IP
- **Authenticated API**: 1000 requests per hour per user

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content (successful deletion) |
| 400 | Bad Request (invalid input) |
| 401 | Unauthorized (not authenticated) |
| 403 | Forbidden (authenticated but no access) |
| 404 | Not Found |
| 409 | Conflict (duplicate resource) |
| 500 | Internal Server Error |

---

## Best Practices

1. **Always include authentication** via session cookies
2. **Use ISO 8601 format** for all dates
3. **Validate input** on client side before sending
4. **Handle errors gracefully** with try-catch
5. **Use appropriate HTTP methods** (GET, POST, PUT, DELETE)
6. **Filter data on server** for better performance
7. **Paginate large result sets** (implement as needed)

---

## Example Usage (JavaScript)

```javascript
// Fetch tasks
const response = await fetch('/api/tasks?status=PENDING')
const data = await response.json()

// Create task
const newTask = await fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Task',
    category: 'Work',
    priority: 'HIGH'
  })
})

// Update task
await fetch(`/api/tasks/${taskId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'COMPLETED',
    actualTime: 45
  })
})

// Delete task
await fetch(`/api/tasks/${taskId}`, {
  method: 'DELETE'
})
```

---

For more information, see the main [README.md](README.md)
