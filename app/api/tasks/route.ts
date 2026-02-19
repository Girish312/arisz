import { NextRequest, NextResponse } from 'next/server'

// GET all tasks
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const parentId = searchParams.get('parentId');
      const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (parentId === 'null') {
      where.parentId = null;
    } else if (parentId) {
      where.parentId = parentId;
    }
    const tasks = []; // In-memory placeholder for tasks
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// CREATE new task
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, category, priority, estimatedTime, dueDate, parentId } = body;
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    const task = { title, description, category: category || 'Personal', priority: priority || 'MEDIUM', estimatedTime, dueDate, parentId }; // Placeholder for task creation
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}