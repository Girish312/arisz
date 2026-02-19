import { NextRequest, NextResponse } from 'next/server'

// GET single task
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  // No authentication, allow all users
  // const user = { id: 'demo' };
  try {
    // const task = await prisma.task.findUnique({
    //   where: {
    //     id: params.id,
    //   },
    //   include: {
    //     subtasks: true,
    //   },
    // });
    // if (!task) {
    //   return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    // }
    // return NextResponse.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

// UPDATE task
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  // No authentication, allow all users
  // const user = { id: 'demo' };
  try {
    // const body = await req.json();
    // const { title, description, category, priority, status, estimatedTime, actualTime, dueDate } = body;
    // Check if task exists and belongs to user
    // const existingTask = await prisma.task.findUnique({
    //   where: {
    //     id: params.id,
    //   },
    // });
    // if (!existingTask) {
    //   return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    // }
    // const updateData: any = {};
    // if (title !== undefined) updateData.title = title;
    // if (description !== undefined) updateData.description = description;
    // if (category !== undefined) updateData.category = category;
    // if (priority !== undefined) updateData.priority = priority;
    // if (status !== undefined) {
    //   updateData.status = status;
    //   if (status === 'COMPLETED') {
    //     updateData.completedAt = new Date();
    //   } else {
    //     updateData.completedAt = null;
    //   }
    // }
    // if (estimatedTime !== undefined) updateData.estimatedTime = estimatedTime ? parseInt(estimatedTime) : null;
    // if (actualTime !== undefined) updateData.actualTime = actualTime ? parseInt(actualTime) : null;
    // if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    // const task = await prisma.task.update({
    //   where: { id: params.id },
    //   data: updateData,
    //   include: {
    //     subtasks: true,
    //   },
    // });
    // return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE task
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  // No authentication, allow all users
  // const user = { id: 'demo' };
  try {
    // Check if task exists and belongs to user
    // const existingTask = await prisma.task.findUnique({
    //   where: {
    //     id: params.id,
    //   },
    // });
    // if (!existingTask) {
    //   return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    // }
    //   // Delete all subtasks first (cascading delete)
    //   await prisma.task.deleteMany({
    //     where: { parentId: params.id },
    //   });
    // // Delete the main task
    //   await prisma.task.delete({
    //     where: { id: params.id },
    //   });
    // return NextResponse.json({ message: 'Task and subtasks deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}