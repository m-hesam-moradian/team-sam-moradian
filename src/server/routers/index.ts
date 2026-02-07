import { router } from '../trpc';
import { userRouter } from './user.router';
import { boardRouter } from './board.router'; // <-- ADD THIS
import { lessonRouter } from './lesson.router';

export const appRouter = router({
  user: userRouter,
  board: boardRouter, // <-- ADD THIS
  lesson: lessonRouter,
});

export type AppRouter = typeof appRouter;
