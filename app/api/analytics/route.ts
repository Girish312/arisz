import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  // No authentication, allow all users
  // const user = { id: 'demo' };

  try {
    const { searchParams } = new URL(req.url)
    const period = searchParams.get('period') || 'daily'

    const now = new Date()
    let startDate: Date

    switch (period) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'weekly':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'yearly':
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    }

    // Get all tasks
      const allTasks = await prisma.task.findMany({
        where: {
          parentId: null, // Only main tasks
        },
    });

    // Get tasks in period
      const tasksInPeriod = await prisma.task.findMany({
        where: {
          parentId: null,
        createdAt: {
          gte: startDate,
        },
      },
    });

    // Get completed tasks in period
    const completedTasks = tasksInPeriod.filter(t => t.status === 'COMPLETED')

    // Category breakdown
    const categoryBreakdown = allTasks.reduce((acc: any, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1
      return acc
    }, {})

    // Priority breakdown
    const priorityBreakdown = allTasks.reduce((acc: any, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1
      return acc
    }, {})

    // Calculate total time
    const totalTimeSpent = completedTasks.reduce((sum, task) => {
      return sum + (task.actualTime || 0)
    }, 0)

    // Calculate completion rate
    const completionRate = tasksInPeriod.length > 0
      ? (completedTasks.length / tasksInPeriod.length) * 100
      : 0

    return NextResponse.json({
      period,
      totalTasks: allTasks.length,
      tasksInPeriod: tasksInPeriod.length,
      completedTasks: completedTasks.length,
      pendingTasks: allTasks.filter(t => t.status === 'PENDING').length,
      inProgressTasks: allTasks.filter(t => t.status === 'IN_PROGRESS').length,
      completionRate: Math.round(completionRate),
      totalTimeSpent,
      categoryBreakdown,
      priorityBreakdown,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}