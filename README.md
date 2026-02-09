# ARISZ: Analyze Routine and Increase Stats Zestfully

![ARISZ Banner](https://img.shields.io/badge/ARISZ-Task%20Management-4CAF50?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-orange.svg?style=for-the-badge)

A modern, full-stack task management application that helps you track your daily routines, manage tasks with subtasks, and visualize your progress through beautiful charts and graphs.

## 🌟 Features

### Task Management
- **Hierarchical Tasks**: Create tasks with unlimited subtasks
- **Time Allocation**: Set estimated time for each task and subtask
- **Rich Descriptions**: Add detailed notes and descriptions to tasks
- **Categories**: Organize tasks by categories (Personal, Work, Health, etc.)
- **Priority Levels**: Set High, Medium, or Low priority
- **Status Tracking**: Mark tasks as Pending, In Progress, or Completed

### Progress Analytics
- **Daily Overview**: Track completion rates and time spent per day
- **Weekly Charts**: Visual representation of task completion trends
- **Monthly Stats**: Comprehensive monthly progress analysis
- **Yearly Insights**: Long-term productivity patterns and achievements
- **Category Breakdown**: See which areas you're focusing on most
- **Streak Tracking**: Maintain and visualize consistency streaks

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Choose your preferred theme
- **Real-time Updates**: Instant synchronization across devices
- **Drag & Drop**: Reorder tasks and subtasks easily
- **Quick Actions**: Keyboard shortcuts for power users
- **Search & Filter**: Find tasks quickly with advanced filtering

## 🏗️ Technology Stack

### Frontend
- **React 18.3+**: Modern UI library with hooks
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Recharts**: Beautiful, responsive charts
- **React Hook Form**: Efficient form management
- **Zustand**: Lightweight state management
- **date-fns**: Modern date utility library

### Backend
- **Next.js API Routes**: Serverless backend functions
- **Prisma**: Modern database ORM
- **PostgreSQL**: Robust relational database
- **NextAuth.js**: Complete authentication solution
- **Zod**: Schema validation

### Deployment & Storage
- **Vercel**: Frontend and API hosting
- **Vercel Postgres**: Managed PostgreSQL database
- **GitHub**: Version control and CI/CD

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Git** for version control
- **GitHub** account for deployment
- **Vercel** account (free tier works)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/arisz.git
cd arisz
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/arisz"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

**Generate a secure NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database with sample data
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## 📦 Project Structure

```
arisz/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── tasks/
│   │   ├── analytics/
│   │   └── settings/
│   ├── api/                 # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── tasks/           # Task CRUD operations
│   │   └── analytics/       # Analytics data
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── tasks/               # Task-related components
│   ├── analytics/           # Chart and stats components
│   └── layout/              # Layout components
├── lib/                     # Utility functions
│   ├── db.ts               # Database client
│   ├── auth.ts             # Auth configuration
│   └── utils.ts            # Helper functions
├── prisma/                  # Database schema
│   ├── schema.prisma       # Prisma schema
│   └── migrations/         # Database migrations
├── public/                  # Static assets
├── styles/                  # Global styles
├── types/                   # TypeScript types
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String?
  image         String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  tasks         Task[]
  accounts      Account[]
  sessions      Session[]
}
```

### Task Model
```prisma
model Task {
  id          String      @id @default(cuid())
  title       String
  description String?
  category    String      @default("Personal")
  priority    Priority    @default(MEDIUM)
  status      Status      @default(PENDING)
  estimatedTime Int?      // in minutes
  actualTime  Int?        // in minutes
  dueDate     DateTime?
  completedAt DateTime?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  userId      String
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  parentId    String?
  parent      Task?       @relation("TaskSubtasks", fields: [parentId], references: [id], onDelete: Cascade)
  subtasks    Task[]      @relation("TaskSubtasks")
}
```

### Enums
```prisma
enum Priority {
  LOW
  MEDIUM
  HIGH
}

enum Status {
  PENDING
  IN_PROGRESS
  COMPLETED
}
```

## 🔐 Authentication

ARISZ uses NextAuth.js for comprehensive authentication:

### Supported Methods
1. **Email & Password**: Traditional authentication
2. **Google OAuth**: Sign in with Google
3. **GitHub OAuth**: Sign in with GitHub

### Setup OAuth (Optional)

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

**GitHub OAuth:**
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to `.env.local`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/signin` - Sign in user
- `GET /api/auth/signout` - Sign out user
- `GET /api/auth/session` - Get current session

### Tasks
- `GET /api/tasks` - Get all tasks for user
- `POST /api/tasks` - Create new task
- `GET /api/tasks/[id]` - Get specific task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task
- `POST /api/tasks/[id]/subtasks` - Add subtask

### Analytics
- `GET /api/analytics/daily` - Get daily stats
- `GET /api/analytics/weekly` - Get weekly stats
- `GET /api/analytics/monthly` - Get monthly stats
- `GET /api/analytics/yearly` - Get yearly stats
- `GET /api/analytics/categories` - Get category breakdown

## 🎨 Design System

### Color Palette
```css
Primary: #4CAF50 (Green)
Secondary: #2196F3 (Blue)
Accent: #FF9800 (Orange)
Success: #8BC34A (Light Green)
Warning: #FFC107 (Amber)
Error: #F44336 (Red)
Background: #FAFAFA (Light) / #1A1A1A (Dark)
```

### Typography
- **Headings**: Space Grotesk (Bold, Display)
- **Body**: Inter (Regular, Text)
- **Mono**: JetBrains Mono (Code, Numbers)

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/arisz.git
git push -u origin main
```

### Step 2: Setup Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `arisz` repository
5. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables

In Vercel dashboard, add these environment variables:

```
DATABASE_URL (from Vercel Postgres)
NEXTAUTH_SECRET (generate new for production)
NEXTAUTH_URL (your-app.vercel.app)
GOOGLE_CLIENT_ID (if using Google auth)
GOOGLE_CLIENT_SECRET (if using Google auth)
GITHUB_ID (if using GitHub auth)
GITHUB_SECRET (if using GitHub auth)
```

### Step 4: Setup Vercel Postgres

1. In Vercel project dashboard, go to "Storage"
2. Click "Create Database"
3. Select "Postgres"
4. Choose a name and region
5. Click "Create"
6. Copy the `DATABASE_URL` to environment variables

### Step 5: Run Database Migrations

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull

# Run migrations
npx prisma migrate deploy
```

### Step 6: Deploy

```bash
vercel --prod
```

Your app is now live! 🎉

## 🔧 Configuration

### Next.js Config

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  experimental: {
    serverActions: true,
  },
}
```

### Tailwind Config

Custom configuration in `tailwind.config.js` includes:
- Custom color palette
- Extended spacing
- Custom animations
- Font family definitions

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage
```

## 📱 Features in Detail

### Task Creation Workflow

1. **Create Main Task**
   - Title, description, category
   - Set priority and due date
   - Allocate estimated time

2. **Add Subtasks**
   - Break down complex tasks
   - Each subtask has its own time estimate
   - Nested hierarchy support

3. **Track Progress**
   - Update status as you work
   - Log actual time spent
   - Mark completion

### Analytics Dashboard

**Daily View:**
- Tasks completed today
- Total time spent
- Completion rate
- Active streaks

**Weekly View:**
- 7-day completion trend
- Category distribution
- Time allocation chart
- Productivity patterns

**Monthly View:**
- 30-day overview
- Best/worst days
- Category insights
- Goal achievement

**Yearly View:**
- 12-month trends
- Seasonal patterns
- Long-term growth
- Milestone tracking

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema changes
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run type-check   # Check TypeScript
```

### Adding New Features

1. **Create API Route**: Add to `app/api/`
2. **Create Component**: Add to `components/`
3. **Update Schema**: Modify `prisma/schema.prisma`
4. **Run Migration**: `npx prisma migrate dev`
5. **Update Types**: Add to `types/`
6. **Test**: Write tests for new functionality

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Reset database
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

### Build Errors

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Authentication Issues

- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Ensure OAuth credentials are correct

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and database solutions
- Tailwind CSS for the utility-first approach
- All open-source contributors

## 📞 Support

- **Documentation**: [Full Docs](https://github.com/yourusername/arisz/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/arisz/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/arisz/discussions)

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Team collaboration features
- [ ] AI-powered task suggestions
- [ ] Calendar integration
- [ ] Export/import functionality
- [ ] Pomodoro timer integration
- [ ] Voice commands
- [ ] Offline mode with sync

---

**Built with ❤️ by the ARISZ Team**

*Analyze Routine and Increase Stats Zestfully!*
