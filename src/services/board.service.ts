import { boardRepository } from '@/repositories/board.repository';

export const boardService = {
  async getAllBoards() {
    return await boardRepository.findAll();
  },

  async createBoard(input: { title: string; ownerId: string }) {
    return await boardRepository.create({
      ...input,
      type: 'board',
      createdAt: new Date().toISOString(),
    });
  },

  async updateBoard(id: string, title: string) {
    return await boardRepository.update(id, { title });
  },

  async removeBoard(id: string) {
    const board = await boardRepository.findById(id);
    if (!board) throw new Error('BOARD_NOT_FOUND');
    return await boardRepository.delete(id, board._rev!);
  },

  async getStats() {
    const total = await boardRepository.count();
    return { totalBoards: total };
  },
  async getBoardStats() {
    const count = await boardRepository.count();
    // THE KEY MUST BE 'totalBoards' to match your Dashboard.tsx
    return { totalBoards: count };
  },
};
