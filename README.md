# Next.js Authentication API

This project includes a complete authentication system with login, registration, and protected routes.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Set up the database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

3. Seed the database with an admin user:
```bash
npm run db:seed
```
This will create an admin user with:
- Email: admin@gmail.com
- Password: abcd123@

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

The server will start at http://localhost:3000

## API Endpoints

### Authentication

#### Register a new user
```
POST /api/auth/register
```
Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

#### Login
```
POST /api/auth/login
```
Body:
```json
{
  "email": "admin@gmail.com",
  "password": "abcd123@"
}
```

### Protected Routes

These routes require authentication via Bearer token in the Authorization header.

#### Get current user profile
```
GET /api/protected/user
```
Headers:
```
Authorization: Bearer your_jwt_token
```

### Admin Routes

These routes require admin role.

#### Get all users (admin only)
```
GET /api/admin/users
```
Headers:
```
Authorization: Bearer your_jwt_token
```

## Authentication Flow

1. Register a new user or login with existing credentials
2. Receive a JWT token in the response
3. Include the token in subsequent requests as a Bearer token in the Authorization header
4. Access protected routes based on user role

## Environment Variables

The following environment variables are required:

- `DATABASE_URL`: PostgreSQL database connection string
- `JWT_SECRET`: Secret key for JWT token generation and verification