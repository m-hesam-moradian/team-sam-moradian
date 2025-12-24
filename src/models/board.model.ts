// src/models/board.model.ts
import { z } from 'zod';

export const boardModel = {
  name: 'board',
  fields: {
    title: z.string().min(2),
    description: z.string().max(200).optional(),
    ownerId: z.string(), // The User ID who owns this board
  },
};

export const createBoardSchema = z.object({
  title: boardModel.fields.title,
  description: boardModel.fields.description,
  ownerId: boardModel.fields.ownerId,
});
