import { boardRepository } from '@/repositories/board.repository';

export const boardService = {
  async createBoard(input: { title: string; description?: string; ownerId: string }) {
    const newBoard = {
      ...input,
      type: 'board' as const,
      createdAt: new Date().toISOString(),
    };
    return await boardRepository.create(newBoard);
  },

  async getBoard(id: string) {
    const board = await boardRepository.findById(id);
    if (!board) throw new Error('BOARD_NOT_FOUND');
    return board;
  },

  async removeBoard(id: string) {
    const board = await boardRepository.findById(id);
    if (!board) throw new Error('BOARD_NOT_FOUND');
    return await boardRepository.delete(id, board._rev!);
  },
};
