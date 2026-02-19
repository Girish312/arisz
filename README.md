# ARISZ: Analyze Routine and Increase Stats Zestfully

![ARISZ Banner](https://img.shields.io/badge/ARISZ-Task%20Management-4CAF50?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-orange.svg?style=for-the-badge)

A modern task management application that helps you track your daily routines, manage tasks with subtasks, and visualize your progress through beautiful charts and graphs.

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
- **Zod**: Schema validation

### Deployment & Storage
- **Vercel**: Frontend and API hosting
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

### 3. Run Development Server

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
│   ├── dashboard/            # Dashboard pages
│   │   ├── tasks/
│   │   ├── analytics/
│   │   └── settings/
│   ├── api/                  # API routes
│   │   ├── tasks/            # Task CRUD operations
│   │   └── analytics/        # Analytics data
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page (redirects to dashboard)
├── components/               # React components
│   ├── ui/                   # Reusable UI components
│   ├── tasks/                # Task-related components
│   ├── analytics/            # Chart and stats components
│   └── layout/               # Layout components
├── lib/                      # Utility functions
│   └── utils.ts              # Helper functions
├── public/                   # Static assets
├── styles/                   # Global styles
├── types/                    # TypeScript types
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.