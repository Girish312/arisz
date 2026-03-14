import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@/lib/firebase-admin'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
const db = getFirestore();

// Helper to verify Firebase Auth token and extract userId
async function getUserId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return null;
  const idToken = authHeader.replace('Bearer ', '').trim();
  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    return decoded.uid;
  } catch {
    return null;
  }
}

// GET all tasks
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const parentId = searchParams.get('parentId');

    const userId = await getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
    }
    let queryRef = db.collection('users').doc(userId).collection('tasks') as FirebaseFirestore.Query;
    if (status && status !== 'all') queryRef = queryRef.where('status', '==', status);
    if (category && category !== 'all') queryRef = queryRef.where('category', '==', category);
    if (parentId) {
      if (parentId === 'null') queryRef = queryRef.where('parentId', '==', null);
      else queryRef = queryRef.where('parentId', '==', parentId);
    }
    const snapshot = await queryRef.get();
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
    const userId = await getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
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
    const docRef = await db.collection('users').doc(userId).collection('tasks').add(newTask);
    return NextResponse.json({ id: docRef.id, ...newTask }, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    // Log the error object for Vercel logs
    if (error instanceof Error) {
      console.error(error.stack || error.message);
    } else {
      console.error(error);
    }
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}