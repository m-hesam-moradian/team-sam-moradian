import { describe, it, expect } from 'vitest';
import { boardService } from '@/services/board.service';

describe('Board Service Lifecycle', () => {
  let createdId: string;

  it('should successfully create a new board', async () => {
    const res = await boardService.createBoard({
      title: 'Science Department',
      description: 'Boards for science teachers',
      ownerId: 'user-456',
    });
    createdId = res.id;
    expect(res.ok).toBe(true);
  });

  it('should fetch the board by ID', async () => {
    const board = await boardService.getBoard(createdId);
    expect(board.title).toBe('Science Department');
  });

  it('should delete the board', async () => {
    const res = await boardService.removeBoard(createdId);
    expect(res.ok).toBe(true);
  });
});
