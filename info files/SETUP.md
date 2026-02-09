# ARISZ - Setup and Deployment Guide

This guide will walk you through setting up ARISZ locally and deploying it to Vercel.

## 📋 Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Database Setup](#database-setup)
3. [Authentication Configuration](#authentication-configuration)
4. [Deploying to Vercel](#deploying-to-vercel)
5. [Post-Deployment Steps](#post-deployment-steps)
6. [Troubleshooting](#troubleshooting)

## 🔧 Local Development Setup

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/arisz.git
cd arisz

# Install dependencies
npm install
```

### Step 2: Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/arisz"
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secure `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### Step 3: Local Database (PostgreSQL)

**Option A: Using Docker** (Recommended)

```bash
# Create and start PostgreSQL container
docker run --name arisz-postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=arisz \
  -p 5432:5432 \
  -d postgres:15

# Your DATABASE_URL will be:
# postgresql://postgres:yourpassword@localhost:5432/arisz
```

**Option B: Using Local PostgreSQL**

```bash
# Install PostgreSQL (macOS)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb arisz

# Your DATABASE_URL will be:
# postgresql://yourusername@localhost:5432/arisz
```

### Step 4: Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Create tables
npx prisma db push

# Or run migrations
npx prisma migrate dev --name init
```

### Step 5: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Prisma Commands Cheat Sheet

```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes (development)
npx prisma db push

# Create migration
npx prisma migrate dev --name your_migration_name

# Run migrations (production)
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Viewing Your Database

```bash
# Open Prisma Studio
npx prisma studio
```

Access at [http://localhost:5555](http://localhost:5555)

## 🔐 Authentication Configuration

### Email/Password Authentication

Already configured! Users can register with email and password.

### Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-app.vercel.app/api/auth/callback/google`
7. Copy Client ID and Client Secret to `.env.local`:

```env
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### GitHub OAuth (Optional)

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in details:
   - Application name: ARISZ
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Generate a new client secret
6. Copy credentials to `.env.local`:

```env
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

## 🚀 Deploying to Vercel

### Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Your code pushed to GitHub

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create repository on GitHub, then:
git remote add origin https://github.com/yourusername/arisz.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel

1. Log in to [Vercel](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Setup Vercel Postgres

1. In your Vercel project dashboard, go to "Storage"
2. Click "Create Database"
3. Select "Postgres"
4. Choose a name (e.g., `arisz-db`) and region
5. Click "Create"
6. Go to ".env.local" tab
7. Copy the `POSTGRES_PRISMA_URL` value

### Step 4: Configure Environment Variables

In Vercel project settings → Environment Variables, add:

```
DATABASE_URL=[paste POSTGRES_PRISMA_URL from Vercel Postgres]
NEXTAUTH_SECRET=[generate new one for production]
NEXTAUTH_URL=https://your-app-name.vercel.app

# If using OAuth:
GOOGLE_CLIENT_ID=[your-google-client-id]
GOOGLE_CLIENT_SECRET=[your-google-client-secret]
GITHUB_ID=[your-github-client-id]
GITHUB_SECRET=[your-github-client-secret]
```

**Important**: Generate a NEW `NEXTAUTH_SECRET` for production!

```bash
openssl rand -base64 32
```

### Step 5: Update OAuth Redirect URIs

**Google OAuth:**
- Add: `https://your-app.vercel.app/api/auth/callback/google`

**GitHub OAuth:**
- Update callback URL to: `https://your-app.vercel.app/api/auth/callback/github`

### Step 6: Deploy Database Schema

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy
```

### Step 7: Deploy!

Click "Deploy" in Vercel dashboard, or:

```bash
vercel --prod
```

Your app is now live! 🎉

## 📝 Post-Deployment Steps

### Verify Deployment

1. Visit your app URL
2. Test user registration
3. Test login
4. Create a test task
5. Verify data persists across page reloads

### Monitor Your App

- **Vercel Dashboard**: View deployment logs and analytics
- **Prisma Studio**: Connect to production database

```bash
# Open Prisma Studio for production
npx prisma studio
```

### Setup Custom Domain (Optional)

1. In Vercel project settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` environment variable

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push

# Vercel automatically builds and deploys!
```

## 🐛 Troubleshooting

### Build Failures

**Error: Prisma Client not generated**

```bash
# Add to package.json scripts if not present:
"postinstall": "prisma generate"
```

**Error: Database connection failed**

- Verify `DATABASE_URL` is correct
- Check Vercel Postgres is active
- Ensure migrations are deployed

### Runtime Errors

**Error: NEXTAUTH_SECRET not set**

- Add `NEXTAUTH_SECRET` to Vercel environment variables
- Redeploy

**Error: OAuth redirect mismatch**

- Update OAuth provider settings with production URL
- Ensure URLs don't have trailing slashes

### Database Issues

**Need to reset production database:**

```bash
# Connect to production
vercel env pull

# Reset (WARNING: deletes all data)
npx prisma migrate reset
```

**View production database:**

```bash
npx prisma studio
```

### Performance Issues

**Slow API responses:**

- Check database indexes (already configured in schema)
- Monitor in Vercel Analytics
- Consider upgrading Vercel plan if needed

## 📊 Monitoring and Analytics

### Vercel Analytics

Enable in project settings for:
- Page views
- Performance metrics
- User analytics

### Database Monitoring

View in Vercel Postgres dashboard:
- Connection count
- Query performance
- Storage usage

## 🔒 Security Checklist

- [ ] Use strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Never commit `.env.local` to git
- [ ] Keep dependencies updated
- [ ] Use environment variables for all secrets
- [ ] Enable Vercel's security headers
- [ ] Configure OAuth callbacks correctly
- [ ] Regular database backups

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🆘 Getting Help

- Check the [GitHub Issues](https://github.com/yourusername/arisz/issues)
- Read the [Discussions](https://github.com/yourusername/arisz/discussions)
- Review Vercel deployment logs
- Check Prisma error messages

---

**Congratulations!** You now have ARISZ running in production! 🎊
