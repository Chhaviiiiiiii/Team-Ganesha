# Kumbh Sava - API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

Most endpoints will require JWT authentication in production. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Health Check

### GET /health

Check API health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-06T10:30:00.000Z",
  "uptime": 3600.5
}
```

---

## Dashboard APIs

### GET /dashboard

Get dashboard summary with KPIs and recent activity.

**Response:**
```json
{
  "success": true,
  "data": {
    "kpis": {
      "totalVisitors": 2847532,
      "activeZones": 24,
      "alertsActive": 3,
      "systemHealth": 98.5
    },
    "recentActivity": [...],
    "analytics": {...},
    "timestamp": "2026-01-06T10:30:00.000Z"
  }
}
```

### GET /dashboard/widgets/:widgetId

Get data for a specific widget.

**Parameters:**
- `widgetId` (path): Widget identifier

**Response:**
```json
{
  "success": true,
  "widgetId": "chart1",
  "data": {...}
}
```

### POST /dashboard/layout

Save user's widget layout preferences.

**Request Body:**
```json
{
  "userId": "user-id",
  "layout": [
    { "i": "widget1", "x": 0, "y": 0, "w": 4, "h": 2 }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Layout saved successfully"
}
```

---

## Analytics APIs

### GET /analytics/summary

Get analytics summary for today.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalVisitors": 12543,
    "analytics": {...},
    "lastUpdated": "2026-01-06T10:30:00.000Z"
  }
}
```

### GET /analytics/trends

Get visitor trends over time.

**Query Parameters:**
- `days` (optional, default: 7): Number of days to fetch

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "date": "2026-01-01",
      "metrics": {
        "visitorCount": 5000,
        "crowdDensity": 0.75
      }
    }
  ]
}
```

### GET /analytics/zones

Get zone-wise analytics.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "zone": "Zone A",
      "visitorCount": 1500,
      "totalScans": 3200
    }
  ]
}
```

### GET /analytics/hourly

Get hourly visitor distribution for today.

**Response:**
```json
{
  "success": true,
  "data": [
    { "_id": 9, "count": 450 },
    { "_id": 10, "count": 680 }
  ]
}
```

### GET /analytics/demographics

Get visitor demographics.

**Response:**
```json
{
  "success": true,
  "data": [
    { "_id": "male", "count": 6500 },
    { "_id": "female", "count": 5200 }
  ]
}
```

---

## Alerts APIs

### GET /alerts

Get all alerts with optional filtering.

**Query Parameters:**
- `type` (optional): critical, warning, info, success
- `status` (optional): active, acknowledged, resolved, scheduled
- `priority` (optional): high, medium, low

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "alert-id",
      "type": "critical",
      "title": "High Crowd Density",
      "message": "Zone A approaching capacity",
      "location": "Zone A - Main Ghat",
      "priority": "high",
      "status": "active",
      "createdAt": "2026-01-06T10:25:00.000Z"
    }
  ]
}
```

### POST /alerts

Create a new alert.

**Request Body:**
```json
{
  "type": "warning",
  "title": "RFID Reader Offline",
  "message": "Checkpoint #5 not responding",
  "location": "Gate 2",
  "zone": "Zone B",
  "priority": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "new-alert-id",
    "type": "warning",
    "title": "RFID Reader Offline",
    "status": "active",
    "createdAt": "2026-01-06T10:30:00.000Z"
  }
}
```

### PATCH /alerts/:id/acknowledge

Acknowledge an alert.

**Request Body:**
```json
{
  "userId": "user-id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "alert-id",
    "status": "acknowledged",
    "acknowledgedBy": {...},
    "acknowledgedAt": "2026-01-06T10:30:00.000Z"
  }
}
```

### PATCH /alerts/:id/resolve

Mark an alert as resolved.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "alert-id",
    "status": "resolved",
    "resolvedAt": "2026-01-06T10:35:00.000Z"
  }
}
```

### GET /alerts/stats

Get alert statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "byStatus": [
      { "_id": "active", "count": 3 },
      { "_id": "resolved", "count": 45 }
    ],
    "byPriority": [
      { "_id": "high", "count": 1 },
      { "_id": "medium", "count": 2 }
    ]
  }
}
```

---

## RFID APIs

### GET /rfid/events

Get RFID scan events.

**Query Parameters:**
- `zone` (optional): Filter by zone
- `checkpoint` (optional): Filter by checkpoint ID
- `limit` (optional, default: 100): Number of records

**Response:**
```json
{
  "success": true,
  "count": 100,
  "data": [
    {
      "_id": "event-id",
      "tagId": "RFID-12345",
      "checkpointId": "CP-001",
      "checkpointName": "Main Gate",
      "zone": "Zone A",
      "eventType": "entry",
      "timestamp": "2026-01-06T10:25:00.000Z",
      "visitorInfo": {
        "name": "Visitor Name",
        "age": 35,
        "gender": "male"
      }
    }
  ]
}
```

### POST /rfid/events

Record a new RFID scan event.

**Request Body:**
```json
{
  "tagId": "RFID-67890",
  "checkpointId": "CP-002",
  "checkpointName": "East Gate",
  "zone": "Zone B",
  "eventType": "entry",
  "visitorInfo": {
    "name": "John Doe",
    "age": 28,
    "gender": "male"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "new-event-id",
    "tagId": "RFID-67890",
    "timestamp": "2026-01-06T10:30:00.000Z"
  }
}
```

### GET /rfid/checkpoints/stats

Get checkpoint statistics.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "checkpointId": "CP-001",
      "zone": "Zone A",
      "scanCount": 1543,
      "lastScan": "2026-01-06T10:28:00.000Z"
    }
  ]
}
```

### GET /rfid/visitor/:tagId/journey

Get a visitor's journey through checkpoints.

**Parameters:**
- `tagId` (path): RFID tag identifier

**Response:**
```json
{
  "success": true,
  "tagId": "RFID-12345",
  "journey": [
    {
      "checkpointName": "Main Gate",
      "zone": "Zone A",
      "timestamp": "2026-01-06T09:00:00.000Z",
      "eventType": "entry"
    },
    {
      "checkpointName": "Central Plaza",
      "zone": "Zone B",
      "timestamp": "2026-01-06T09:45:00.000Z",
      "eventType": "scan"
    }
  ]
}
```

---

## Authentication APIs

### POST /auth/register

Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "viewer"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "viewer"
    },
    "token": "jwt-token-here"
  }
}
```

### POST /auth/login

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "viewer",
      "avatar": "avatar-url"
    },
    "token": "jwt-token-here"
  }
}
```

### GET /auth/me

Get current authenticated user.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Add auth middleware to verify JWT token"
  }
}
```

---

## Notifications APIs

### GET /notifications

Get user notifications.

**Query Parameters:**
- `userId` (required): User ID
- `read` (optional): Filter by read status (true/false)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "notification-id",
      "type": "alert",
      "title": "High crowd detected",
      "message": "Zone A density: 85%",
      "read": false,
      "createdAt": "2026-01-06T10:20:00.000Z"
    }
  ],
  "unreadCount": 5
}
```

### POST /notifications

Create a notification.

**Request Body:**
```json
{
  "userId": "user-id",
  "type": "info",
  "title": "System Update",
  "message": "New features available"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "new-notification-id",
    "type": "info",
    "title": "System Update",
    "read": false,
    "createdAt": "2026-01-06T10:30:00.000Z"
  }
}
```

### PATCH /notifications/:id/read

Mark a notification as read.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "notification-id",
    "read": true,
    "readAt": "2026-01-06T10:30:00.000Z"
  }
}
```

### PATCH /notifications/read-all

Mark all user notifications as read.

**Request Body:**
```json
{
  "userId": "user-id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

### DELETE /notifications/:id

Delete a notification.

**Response:**
```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

Currently no rate limiting is implemented. In production, consider adding rate limiting middleware.

## Pagination

For endpoints returning large datasets, consider adding pagination:

```
GET /api/resource?page=1&limit=50
```

## WebSocket Support (Future)

Real-time updates can be implemented using Socket.io:
- Real-time alerts
- Live visitor counts
- Dashboard updates
- Notifications

---

## Testing with cURL

**Get Dashboard:**
```bash
curl http://localhost:5000/api/dashboard
```

**Create Alert:**
```bash
curl -X POST http://localhost:5000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "type": "warning",
    "title": "Test Alert",
    "message": "This is a test",
    "priority": "medium"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@kumbhsava.com",
    "password": "admin123"
  }'
```

---

For more information, see [SETUP.md](SETUP.md)
