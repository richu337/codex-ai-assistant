# Codex API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

## Endpoints

### Authentication

#### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {
      "name": "John Doe"
    }
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

#### POST /api/auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "user": { ... },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

#### POST /api/auth/logout
Logout current user.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

#### GET /api/auth/me
Get current user information.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": { ... }
  }
}
```

### Chat

#### POST /api/chat/message
Send a message and get AI response.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "message": "Hello, how are you?",
  "conversationId": "uuid" // optional, creates new if not provided
}
```

**Response:**
```json
{
  "conversationId": "uuid",
  "message": "I'm doing great! How can I help you today?",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### GET /api/chat/conversations
Get all user conversations.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `limit` (optional): Number of conversations to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "conversations": [
    {
      "id": "uuid",
      "title": "Conversation about...",
      "created_at": "2024-01-01T12:00:00Z",
      "updated_at": "2024-01-01T12:30:00Z"
    }
  ]
}
```

#### GET /api/chat/conversations/:id
Get a specific conversation.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "title": "Conversation about...",
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:30:00Z"
}
```

#### DELETE /api/chat/conversations/:id
Delete a conversation.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Conversation deleted successfully"
}
```

#### GET /api/chat/conversations/:id/messages
Get all messages in a conversation.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `limit` (optional): Number of messages to return (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "messages": [
    {
      "id": "uuid",
      "conversation_id": "uuid",
      "role": "user",
      "content": "Hello!",
      "created_at": "2024-01-01T12:00:00Z"
    },
    {
      "id": "uuid",
      "conversation_id": "uuid",
      "role": "assistant",
      "content": "Hi! How can I help?",
      "created_at": "2024-01-01T12:00:01Z"
    }
  ]
}
```

### User

#### GET /api/user/profile
Get user profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "avatar_url": "https://...",
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z"
}
```

#### PUT /api/user/profile
Update user profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Jane Doe",
  "avatar_url": "https://..."
}
```

#### GET /api/user/preferences
Get user preferences.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "interests": ["technology", "science"],
  "settings": {
    "theme": "dark",
    "notifications": true
  }
}
```

#### PUT /api/user/preferences
Update user preferences.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "interests": ["technology", "science", "art"],
  "settings": {
    "theme": "light",
    "notifications": false
  }
}
```

#### GET /api/user/stats
Get user statistics.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "conversations": 15,
  "messages": 234,
  "searches": 42
}
```

### Search

#### GET /api/search
Search for information.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `q` (required): Search query

**Response:**
```json
{
  "query": "What is AI?",
  "answer": "Artificial Intelligence (AI) is...",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### GET /api/search/history
Get search history.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `limit` (optional): Number of results (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "history": [
    {
      "id": "uuid",
      "query": "What is AI?",
      "result": "Artificial Intelligence...",
      "created_at": "2024-01-01T12:00:00Z"
    }
  ]
}
```

#### DELETE /api/search/history/:id
Delete a search history item.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Search history deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid token"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "error": "Too many requests, please try again later"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

The API implements rate limiting:
- **100 requests per 15 minutes** per IP address
- Rate limit headers are included in responses:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Time when limit resets
