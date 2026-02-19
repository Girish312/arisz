import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, query, where as fsWhere } from 'firebase/firestore'

// GET all tasks
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const parentId = searchParams.get('parentId');

    let q = collection(db, 'tasks');
    let constraints = [];
    if (status && status !== 'all') constraints.push(fsWhere('status', '==', status));
    if (category && category !== 'all') constraints.push(fsWhere('category', '==', category));
    if (parentId) {
      if (parentId === 'null') constraints.push(fsWhere('parentId', '==', null));
      else constraints.push(fsWhere('parentId', '==', parentId));
    }
    const finalQuery = constraints.length ? query(q, ...constraints) : q;
    const snapshot = await getDocs(finalQuery);
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
    const { title, description, category, priority, estimatedTime, dueDate, parentId, status = 'PENDING' } = body;
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    const newTask = {
      title,
      description: description || '',
      category: category || 'Personal',
      priority: priority || 'MEDIUM',
      estimatedTime: estimatedTime || null,
      dueDate: dueDate || null,
      parentId: parentId || null,
      status,
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, 'tasks'), newTask);
    return NextResponse.json({ id: docRef.id, ...newTask }, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}