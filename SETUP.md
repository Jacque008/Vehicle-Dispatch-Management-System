# Setup Guide

## Prerequisites

Ensure you have the following installed:
- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker & Docker Compose
- Expo CLI (for mobile): `npm install -g expo-cli`

## Installation Steps

### 1. Install Dependencies

```bash
# Install all workspace dependencies
npm install
```

### 2. Start Docker Services

```bash
# Start PostgreSQL and Redis
npm run docker:up

# Check logs
npm run docker:logs

# Stop services when done
npm run docker:down
```

### 3. Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and configure:
- `DATABASE_URL`: Should work with default Docker setup
- `JWT_SECRET`: Change to a secure random string
- `RESEND_API_KEY`: Get API key from https://resend.com (optional for MVP, will log to console)

### 4. Run Database Migrations

```bash
cd backend

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view database
npm run prisma:studio
```

### 5. Create Test Manager Account

You can create a manager account in two ways:

**Option A: Using GraphQL Playground**

1. Start the backend: `npm run dev:backend`
2. Open http://localhost:4000/graphql
3. Run this mutation:

```graphql
mutation {
  createManager(
    email: "manager@example.com"
    password: "password123"
    name: "Test Manager"
  ) {
    accessToken
    user {
      id
      email
      name
    }
  }
}
```

**Option B: Using Prisma Studio**

1. Run `npm run prisma:studio`
2. Manually create a manager record
3. For password hash, use bcrypt to hash your desired password

### 6. Start Development Servers

Open 3 separate terminal windows:

**Terminal 1: Backend**
```bash
npm run dev:backend
# Runs on http://localhost:4000
# GraphQL Playground: http://localhost:4000/graphql
```

**Terminal 2: Web Portal**
```bash
cd web
cp .env.local.example .env.local
npm run dev
# Runs on http://localhost:3000
```

**Terminal 3: Mobile App**
```bash
cd mobile
npm start
# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Scan QR code for physical device
```

## Testing the Setup

### Test Backend

1. Open http://localhost:4000/graphql
2. Try the "me" query (should fail without auth):

```graphql
query {
  me
}
```

3. Login as manager:

```graphql
mutation {
  managerLogin(
    email: "manager@example.com"
    password: "password123"
  ) {
    accessToken
  }
}
```

4. Copy the accessToken and add HTTP header:
```json
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
```

5. Now try the "me" query again - should succeed

### Test OTP Flow

```graphql
# 1. Send OTP
mutation {
  sendOtp(email: "driver@example.com") {
    success
    message
  }
}

# 2. Check backend logs for OTP code (in development mode)

# 3. Verify OTP
mutation {
  verifyOtp(email: "driver@example.com", code: "123456")
}

# 4. Register driver
mutation {
  registerDriver(
    email: "driver@example.com"
    phone: "+15551234567"
    name: "Test Driver"
  ) {
    id
    email
    status
  }
}
```

### Test Web Portal

1. Open http://localhost:3000
2. Navigate to Login page
3. (Frontend is not yet connected to backend, static pages only)

### Test Mobile App

1. Start Expo: `npm start` in mobile directory
2. Scan QR code or press 'i'/'a' for simulators
3. See login screen with OTP input
4. (Frontend is not yet connected to backend, UI only)

## Common Issues

### Database Connection Errors

```bash
# Reset database
docker-compose down -v
docker-compose up -d
cd backend
npm run prisma:migrate
```

### Port Already in Use

```bash
# Kill process on port 4000 (backend)
lsof -ti:4000 | xargs kill -9

# Kill process on port 3000 (web)
lsof -ti:3000 | xargs kill -9
```

### Prisma Client Out of Sync

```bash
cd backend
npm run prisma:generate
```

## Next Steps

Now that the framework is set up, you can:

1. **Connect Frontend to Backend**
   - Implement GraphQL clients in web and mobile
   - Add authentication state management
   - Connect login forms to real APIs

2. **Implement Core Features**
   - Tests module (create/manage tests)
   - Availability module (driver scheduling)
   - Assignments module (dispatch flow)
   - Notifications module (push notifications)
   - Jobs module (timeout handling)

3. **Deploy to Railway**
   - Follow Phase 1E deployment steps
   - Configure production environment variables
   - Set up Railway PostgreSQL and Redis

## Directory Structure

```
vehicle-dispatch/
├── backend/          # NestJS API ✅ Complete
├── web/              # Next.js portal ✅ Complete
├── mobile/           # React Native app ✅ Complete
├── shared/           # Shared types ✅ Complete
├── docker-compose.yml ✅ Complete
└── package.json      ✅ Complete
```

## Support

Refer to the main implementation plan at: `.claude/plans/snazzy-hatching-liskov.md`
