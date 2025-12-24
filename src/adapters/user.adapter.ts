// src/adapters/user.adapter.ts
import { userService } from '@/services/user.service';

export const userAdapter = {
  // This takes the input from tRPC and passes it to the Service
  registerUser: async (input: {
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'student';
  }) => {
    // Here we could also format data if the Service expected something slightly different
    return await userService.registerUser(input);
  },

  // We will add more (getUser, deleteUser) as we build them
};
