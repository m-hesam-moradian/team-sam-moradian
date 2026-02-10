import { boardAdapter } from '@/adapters/board.adapter';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const boards = await boardAdapter.list();
    return NextResponse.json(boards);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch boards' }, { status: 500 });
  }
}
