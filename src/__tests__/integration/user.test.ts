// src/__tests__/integration/user.test.ts
import { describe, it, expect } from 'vitest';
import { userService } from '@/services/user.service';

describe('User Service Lifecycle', () => {
  const email = `test-${Date.now()}@example.com`;
  let createdId: string;

  it('should successfully register a new user', async () => {
    const res = await userService.registerUser({
      name: 'Vitest User',
      email,
      role: 'student',
    });
    createdId = res.id;
    expect(res.ok).toBe(true);
  });

  it('should block duplicate emails', async () => {
    // We expect this to throw an error
    await expect(
      userService.registerUser({
        name: 'Clone',
        email,
        role: 'student',
      }),
    ).rejects.toThrow('ALREADY_EXISTS');
  });

  it('should fetch the user by ID', async () => {
    const user = await userService.getUser(createdId);
    expect(user.email).toBe(email);
    expect(user.type).toBe('user');
  });

  it('should delete the user', async () => {
    const res = await userService.removeUser(createdId);
    expect(res.ok).toBe(true);
  });
});
