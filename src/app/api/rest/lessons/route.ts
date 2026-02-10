import { lessonAdapter } from '@/adapters/lesson.adapter';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Changed from listLessons() to list()
    const lessons = await lessonAdapter.list();
    return NextResponse.json(lessons);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
