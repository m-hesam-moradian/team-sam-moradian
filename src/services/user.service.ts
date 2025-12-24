// src/services/user.service.ts
import { userRepository } from '@/repositories/user.repository';

export const userService = {
  async registerUser(input: {
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'student';
  }) {
    // This was failing because findByEmail was missing in the repository
    const existingUser = await userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new Error('ALREADY_EXISTS');
    }

    const newUser = {
      type: 'user' as const,
      name: input.name,
      email: input.email,
      role: input.role,
      createdAt: new Date().toISOString(),
    };

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
};
