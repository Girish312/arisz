import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Logo/Title */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              ARISZ
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300">
              Analyze Routine and Increase Stats Zestfully
            </p>
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              A modern task management application that helps you track your daily routines,
              manage complex tasks with subtasks, and visualize your productivity through
              beautiful analytics.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-bold text-xl mb-2">Task Management</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create tasks with unlimited subtasks, set priorities, and track time
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-bold text-xl mb-2">Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visual charts showing daily, weekly, monthly, and yearly progress
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="font-bold text-xl mb-2">Cloud Sync</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access your tasks from any device with secure cloud storage
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center mt-12">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-16 text-gray-500 dark:text-gray-400">
            <p>Built with Next.js, TypeScript, and PostgreSQL</p>
          </div>
        </div>
      </div>
    </div>
  )
}