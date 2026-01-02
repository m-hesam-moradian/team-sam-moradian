// src/services/user.service.ts
import { userRepository } from '@/repositories/user.repository';

export const userService = {
  async registerUser(input: { name: string; email: string; role: string }) {
    // 1. Check if email exists
    const existing = await userRepository.findByEmail(input.email);
    if (existing) throw new Error('USER_ALREADY_EXISTS');

    // 2. Prepare data for CouchDB
    const newUser = {
      ...input,
      type: 'user' as const,
      createdAt: new Date().toISOString(),
    };

    // 3. Save
    return await userRepository.create(newUser);
  },

  async getUser(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('NOT_FOUND');
    return user;
  },

  async removeUser(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('NOT_FOUND');
    return await userRepository.delete(id, user._rev!);
  },
  async getAllUsers() {
    return await userRepository.findAll();
  },
};
