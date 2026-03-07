import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@/lib/firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
const db = getFirestore();

// Helper to verify Firebase Auth token and extract userId
async function getUserId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return null;
  const idToken = authHeader.replace('Bearer ', '').trim();
  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    console.log('Decoded UID:', decoded.uid);
    return decoded.uid;
  } catch (err) {
    console.error('Token verification error:', err);
    return null;
  }
}

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const params = await context.params;
  const id = params.id;
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
  }
  try {
    const ref = db.collection('users').doc(userId!).collection('tasks').doc(id);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json({ id: snap.id, ...snap.data() });
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const params = await context.params;
  const id = params.id;
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const ref = db.collection('users').doc(userId!).collection('tasks').doc(id);
    await ref.update(body);
    return NextResponse.json({ id, ...body });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const params = await context.params;
  const id = params.id;
  const userId = await getUserId(req);
  if (!userId || !id) {
    return NextResponse.json({ error: 'Unauthorized: Missing or invalid token or invalid id' }, { status: 401 });
  }
  try {
    const ref = db.collection('users').doc(userId).collection('tasks').doc(id);
    await ref.delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
};