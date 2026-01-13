# Vehicle Dispatch & Driver Qualification System

A comprehensive system for managing driver registration, qualification testing, availability scheduling, and assignment dispatch.

## Project Structure

```
vehicle-dispatch/
├── backend/          # NestJS API with GraphQL
├── web/              # Next.js manager portal
├── mobile/           # React Native (Expo) driver app
├── miniprogram/      # WeChat Mini Program driver app
├── shared/           # Shared TypeScript types
└── docker-compose.yml
```

## Tech Stack

- **Backend**: NestJS + Prisma + GraphQL + PostgreSQL + Redis
- **Web**: Next.js 14 + shadcn/ui + TailwindCSS
- **Mobile**: React Native + Expo
- **Mini Program**: WeChat Mini Program Native (for European WeChat users)
- **Auth**: JWT for managers, Email OTP for drivers
- **Deployment**: Railway

## Getting Started

### Prerequisites

- Node.js >= 18
- Docker & Docker Compose
- Expo CLI (for mobile development)
- WeChat DevTools (for Mini Program development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start Docker services (Postgres + Redis):
   ```bash
   npm run docker:up
   ```

4. Set up environment variables (see `.env.example` in each package)

5. Run database migrations:
   ```bash
   cd backend
   npx prisma migrate dev
   ```

### Development

Run all services in separate terminals:

```bash
# Terminal 1: Backend API
npm run dev:backend

# Terminal 2: Web portal (Manager dashboard)
npm run dev:web

# Terminal 3: Mobile app (React Native driver app)
npm run dev:mobile

# Terminal 4: Mini Program (WeChat driver app)
# Open miniprogram/ in WeChat DevTools
```

See [miniprogram/README.md](./miniprogram/README.md) for WeChat Mini Program setup instructions.

## Features

### MVP (Phase 1)
- ✅ Driver registration with email OTP
- ✅ Digital qualification test
- ✅ Availability scheduling
- ✅ Assignment dispatch with notifications
- ✅ Overlap detection
- ✅ Assignment history
- ✅ Manager portal

### Roadmap
- Smart driver matching (salary, distance)
- SMS notifications
- Document uploads
- Multi-organization support
- Analytics dashboard

## License

MIT
