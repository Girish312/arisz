import { NextRequest, NextResponse } from 'next/server'

// GET single task
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  // No authentication, allow all users
  // const user = { id: 'demo' };
  try {
    // ...existing code...
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
    // ...existing code...
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
    // ...existing code...
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}