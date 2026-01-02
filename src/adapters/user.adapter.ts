// src/adapters/user.adapter.ts
import { userService } from '@/services/user.service';

export const userAdapter = {
  createUser: async (input: any) => {
    // Ensure this calls registerUser
    return await userService.registerUser(input);
  },
  listUsers: async () => {
    return await userService.getAllUsers(); // Make sure this exists in your service
  },
  deleteUser: async (id: string) => {
    return await userService.removeUser(id);
  },
};
