import { lessonAdapter } from '@/adapters/lesson.adapter';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const lesson = await lessonAdapter.get(params.id);
    if (!lesson) return NextResponse.json({ error: 'Not Found' }, { status: 404 });

    return NextResponse.json(lesson);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
