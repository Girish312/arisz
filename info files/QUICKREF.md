# ARISZ - Developer Quick Reference

Quick commands and code snippets for common tasks.

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Database commands
npm run db:push      # Push schema changes
npm run db:migrate   # Create migration
npm run db:studio    # Open database GUI
```

## 🗄️ Database Quick Commands

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Push schema to database (dev only)
npx prisma db push

# Create a migration
npx prisma migrate dev --name add_new_field

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (WARNING: deletes data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Format schema file
npx prisma format
```

## 📝 Common Code Snippets

### Creating a New API Route

```typescript
// app/api/your-route/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await prisma.yourModel.findMany({
      where: { userId: session.user.id }
    })
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    
    const newItem = await prisma.yourModel.create({
      data: {
        ...body,
        userId: session.user.id
      }
    })
    
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
```

### Creating a Protected Page

```typescript
// app/(dashboard)/your-page/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function YourPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome, {session.user.name}!</p>
    </div>
  )
}
```

### Creating a React Component

```typescript
// components/your-component.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface YourComponentProps {
  title: string
  onSave?: (data: string) => void
}

export function YourComponent({ title, onSave }: YourComponentProps) {
  const [data, setData] = useState('')

  const handleSave = () => {
    onSave?.(data)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <Button onClick={handleSave}>Save</Button>
    </div>
  )
}
```

### Fetching Data in Client Component

```typescript
'use client'

import { useEffect, useState } from 'react'

export function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/your-endpoint')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>

  return <div>{/* Render your data */}</div>
}
```

### Using Prisma Client

```typescript
import { prisma } from '@/lib/db'

// Find all
const tasks = await prisma.task.findMany()

// Find with filter
const completedTasks = await prisma.task.findMany({
  where: {
    status: 'COMPLETED',
    userId: 'user-id'
  }
})

// Find with relations
const taskWithSubtasks = await prisma.task.findUnique({
  where: { id: 'task-id' },
  include: { subtasks: true }
})

// Create
const newTask = await prisma.task.create({
  data: {
    title: 'New Task',
    userId: 'user-id',
    status: 'PENDING'
  }
})

// Update
const updatedTask = await prisma.task.update({
  where: { id: 'task-id' },
  data: { status: 'COMPLETED' }
})

// Delete
await prisma.task.delete({
  where: { id: 'task-id' }
})

// Count
const taskCount = await prisma.task.count({
  where: { userId: 'user-id' }
})

// Aggregate
const stats = await prisma.task.aggregate({
  where: { userId: 'user-id' },
  _count: true,
  _avg: { actualTime: true }
})
```

## 🎨 Styling Quick Reference

### Tailwind Common Classes

```css
/* Layout */
flex items-center justify-between
grid grid-cols-3 gap-4
container mx-auto px-4

/* Spacing */
p-4 px-6 py-3 m-2 mx-auto space-y-4

/* Typography */
text-lg font-bold text-gray-900 dark:text-white

/* Colors */
bg-primary text-primary-foreground
bg-card border border-border

/* Responsive */
sm:text-sm md:text-base lg:text-lg xl:text-xl

/* State */
hover:bg-primary/90 focus:ring-2 active:scale-95
disabled:opacity-50 disabled:cursor-not-allowed
```

### Custom CSS Variables

```css
/* Access in Tailwind */
bg-[hsl(var(--primary))]
text-[hsl(var(--foreground))]

/* Access in CSS */
background: hsl(var(--primary));
color: hsl(var(--foreground));
```

## 🔐 Authentication Helpers

```typescript
// Get session in Server Component
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const session = await getServerSession(authOptions)

// Get session in Client Component
import { useSession } from 'next-auth/react'

const { data: session, status } = useSession()

// Sign out
import { signOut } from 'next-auth/react'

await signOut({ callbackUrl: '/login' })
```

## 📊 Common Prisma Queries for Analytics

```typescript
// Tasks completed today
const today = new Date()
today.setHours(0, 0, 0, 0)

const completedToday = await prisma.task.count({
  where: {
    userId: 'user-id',
    status: 'COMPLETED',
    completedAt: { gte: today }
  }
})

// Tasks by category
const tasksByCategory = await prisma.task.groupBy({
  by: ['category'],
  where: { userId: 'user-id' },
  _count: true
})

// Average completion time
const avgTime = await prisma.task.aggregate({
  where: {
    userId: 'user-id',
    status: 'COMPLETED',
    actualTime: { not: null }
  },
  _avg: { actualTime: true }
})

// Tasks due this week
const weekStart = new Date()
const weekEnd = new Date()
weekEnd.setDate(weekEnd.getDate() + 7)

const dueThisWeek = await prisma.task.findMany({
  where: {
    userId: 'user-id',
    dueDate: {
      gte: weekStart,
      lte: weekEnd
    }
  }
})
```

## 🐛 Debugging Tips

```bash
# View detailed Prisma queries
DATABASE_URL="..." npx prisma studio --preview-feature

# Check environment variables
npm run dev # then visit http://localhost:3000/api/debug

# Verify database connection
npx prisma db push --skip-generate

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Deployment Checklist

```bash
# Before deploying:
□ Run build locally: npm run build
□ Test production build: npm start
□ Check environment variables are set
□ Verify database migrations are ready
□ Test authentication flows
□ Check API endpoints
□ Review error handling

# After deploying:
□ Run migrations: npx prisma migrate deploy
□ Verify environment variables in Vercel
□ Test production URL
□ Check Vercel logs for errors
□ Monitor performance metrics
```

## 📝 Git Workflow

```bash
# Start new feature
git checkout -b feature/your-feature-name

# Stage changes
git add .

# Commit with message
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/your-feature-name

# Merge to main (after PR approval)
git checkout main
git pull origin main
git merge feature/your-feature-name
git push origin main

# Delete feature branch
git branch -d feature/your-feature-name
```

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)

## 💡 Pro Tips

1. **Use Prisma Studio** for quick database inspection
2. **Enable TypeScript strict mode** for better type safety
3. **Use Server Components** by default, Client Components only when needed
4. **Leverage Next.js caching** for better performance
5. **Use environment variables** for all configuration
6. **Test locally before deploying** to catch issues early
7. **Monitor Vercel logs** to debug production issues
8. **Keep dependencies updated** with `npm outdated`

---

Save this file for quick reference during development!
