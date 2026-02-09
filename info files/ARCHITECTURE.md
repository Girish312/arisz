# ARISZ - Technical Architecture

## System Overview

ARISZ is a full-stack web application built with modern technologies, following a serverless architecture pattern optimized for Vercel deployment.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React Components (App Router)                        │  │
│  │  - Task Management UI                                 │  │
│  │  - Analytics Dashboard                                │  │
│  │  - Authentication Pages                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↕                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  State Management (Zustand)                           │  │
│  │  - Task Store                                         │  │
│  │  - User Preferences                                   │  │
│  │  - UI State                                           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                       API Layer (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  /api/tasks  │  │ /api/analytics│  │  /api/auth   │     │
│  │              │  │               │  │              │     │
│  │ - CRUD ops   │  │ - Daily stats │  │ - NextAuth   │     │
│  │ - Subtasks   │  │ - Weekly      │  │ - OAuth      │     │
│  │ - Filtering  │  │ - Monthly     │  │ - Sessions   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                    Data Access Layer (Prisma)                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Prisma ORM                                           │  │
│  │  - Type-safe queries                                  │  │
│  │  - Auto-generated client                              │  │
│  │  - Migration management                               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                  Database (PostgreSQL)                       │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │  Users  │  │  Tasks  │  │Accounts │  │Sessions │       │
│  │         │  │         │  │         │  │         │       │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: UI library with Server Components
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animations
- **Recharts**: Data visualization

### Backend
- **Next.js API Routes**: Serverless functions
- **Prisma**: Database ORM
- **NextAuth.js**: Authentication
- **Zod**: Runtime validation

### Database
- **PostgreSQL**: Relational database
- **Prisma Migrate**: Schema management

### Deployment
- **Vercel**: Hosting and CI/CD
- **Vercel Postgres**: Managed database

## Data Model

### User
```typescript
{
  id: string (cuid)
  email: string (unique)
  name?: string
  password?: string (hashed)
  image?: string
  tasks: Task[]
  accounts: Account[] // OAuth
  sessions: Session[]
}
```

### Task
```typescript
{
  id: string (cuid)
  title: string
  description?: string
  category: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  estimatedTime?: number (minutes)
  actualTime?: number (minutes)
  dueDate?: DateTime
  completedAt?: DateTime
  userId: string (foreign key)
  parentId?: string (self-reference)
  subtasks: Task[] (recursive)
}
```

## API Design

### RESTful Endpoints

**Tasks**
- `GET /api/tasks` - List all tasks
  - Query params: `status`, `category`, `startDate`, `endDate`
- `POST /api/tasks` - Create task
- `GET /api/tasks/[id]` - Get task details
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task
- `POST /api/tasks/[id]/subtasks` - Add subtask

**Analytics**
- `GET /api/analytics/daily?date=YYYY-MM-DD`
- `GET /api/analytics/weekly?startDate=YYYY-MM-DD`
- `GET /api/analytics/monthly?month=YYYY-MM`
- `GET /api/analytics/yearly?year=YYYY`

**Authentication**
- `POST /api/auth/register`
- `POST /api/auth/[...nextauth]` (NextAuth handlers)

## Security

### Authentication Flow

1. User submits credentials
2. NextAuth validates against database
3. JWT token generated and signed
4. Token stored in httpOnly cookie
5. Subsequent requests include token
6. Middleware validates token
7. User session established

### Authorization

- All API routes check authentication
- Tasks are user-scoped (userId filter)
- Prisma queries enforce data isolation
- No cross-user data access possible

### Data Protection

- Passwords hashed with bcrypt (10 rounds)
- Environment variables for secrets
- HTTPS enforced in production
- CSRF protection via NextAuth
- SQL injection prevented by Prisma

## Performance Optimizations

### Frontend
- React Server Components for initial render
- Code splitting per route
- Image optimization with next/image
- Font optimization with next/font
- Static generation where possible

### Backend
- Database connection pooling
- Indexed queries (userId, status, dates)
- Efficient Prisma queries
- Serverless function optimization

### Database
- Composite indexes on common queries
- Cascade deletes for data integrity
- Optimized schema design

## Scalability Considerations

### Current Architecture
- Serverless functions (auto-scaling)
- Managed PostgreSQL (Vercel)
- CDN for static assets
- Edge runtime where applicable

### Future Scaling Options
1. **Database**: Upgrade to larger Vercel Postgres tier
2. **Caching**: Add Redis for frequently accessed data
3. **CDN**: Cloudflare for global distribution
4. **Search**: Elasticsearch for advanced queries
5. **Queue**: Background jobs for heavy operations

## Monitoring and Observability

### Vercel Analytics
- Page load metrics
- Core Web Vitals
- User flow analysis

### Application Logs
- API request/response logs
- Error tracking
- Performance metrics

### Database Monitoring
- Query performance
- Connection pool usage
- Storage metrics

## Development Workflow

### Local Development
```bash
1. Clone repo
2. Install dependencies (npm install)
3. Setup database (docker or local)
4. Run migrations (npx prisma migrate dev)
5. Start dev server (npm run dev)
```

### Code Quality
- ESLint for code linting
- TypeScript for type checking
- Prettier for formatting
- Prisma for schema validation

### Testing Strategy
- Unit tests for utilities
- Integration tests for API routes
- E2E tests for critical flows
- Manual QA before deployment

### Deployment Pipeline
```
1. Push to GitHub
   ↓
2. Vercel builds
   ↓
3. Tests run
   ↓
4. Deploy to preview
   ↓
5. Manual approval
   ↓
6. Deploy to production
```

## File Structure Explained

```
arisz/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group (shared layout)
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── (dashboard)/       # Dashboard route group (protected)
│   │   ├── layout.tsx     # Dashboard layout with nav
│   │   ├── tasks/         # Task management
│   │   ├── analytics/     # Analytics dashboard
│   │   └── settings/      # User settings
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth endpoints
│   │   ├── tasks/         # Task CRUD
│   │   └── analytics/     # Analytics data
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── ui/               # Reusable UI primitives
│   ├── tasks/            # Task-specific components
│   ├── analytics/        # Chart components
│   └── layout/           # Layout components
│
├── lib/                  # Utility libraries
│   ├── db.ts            # Prisma client
│   ├── auth.ts          # Auth config
│   └── utils.ts         # Helper functions
│
├── prisma/              # Database
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Migration history
│
├── public/              # Static files
│   └── images/          # Images
│
├── types/               # TypeScript definitions
│   └── index.ts         # Shared types
│
└── Configuration files
    ├── next.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    └── package.json
```

## Design Patterns

### Component Architecture
- Atomic design principles
- Composition over inheritance
- Props drilling avoided (Zustand for global state)
- Server Components by default
- Client Components only when needed

### State Management
- Server state: React Query patterns
- Client state: Zustand stores
- Form state: React Hook Form
- URL state: Next.js routing

### Error Handling
- Try-catch in API routes
- Error boundaries in React
- Toast notifications for user feedback
- Detailed logging for debugging

## Best Practices

### Code Organization
- Feature-based structure
- Shared utilities in lib/
- Type definitions centralized
- Consistent naming conventions

### TypeScript Usage
- Strict mode enabled
- No any types
- Proper type inference
- Shared type definitions

### React Best Practices
- Functional components
- Custom hooks for logic
- Memoization where needed
- Accessibility (ARIA labels)

### Database Best Practices
- Migrations for schema changes
- Seed data for development
- Indexes on foreign keys
- Cascade deletes configured

## Future Architecture Considerations

### Microservices
If scaling beyond monolith:
- Separate auth service
- Dedicated analytics service
- Task service with its own database

### Real-time Features
- WebSocket for live updates
- Pusher or Ably integration
- Optimistic UI updates

### Advanced Features
- Background job processing (Inngest, Temporal)
- Full-text search (Algolia, Meilisearch)
- File uploads (Vercel Blob, S3)
- Email notifications (Resend, SendGrid)

---

This architecture is designed to be:
- **Scalable**: Handles growth efficiently
- **Maintainable**: Clean code organization
- **Performant**: Optimized at every layer
- **Secure**: Multiple security layers
- **Developer-friendly**: Easy to understand and extend
