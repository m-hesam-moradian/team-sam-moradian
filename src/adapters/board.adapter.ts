import { boardService } from '@/services/board.service';

export const boardAdapter = {
  list: async () => await boardService.getAllBoards(),
  create: async (input: any) => await boardService.createBoard(input),
  update: async (id: string, title: string) => await boardService.updateBoard(id, title),
  delete: async (id: string) => await boardService.removeBoard(id),
  getStats: async () => await boardService.getStats(),
};
