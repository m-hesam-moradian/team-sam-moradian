import { z } from 'zod';

// This is the Source of Truth.
// If we change "email" to "username" later, we change it HERE.
export const userModel = {
  name: 'user',
  fields: {
    // Basic validation: Name must be at least 2 chars
    name: z.string().min(2),
    email: z.string().email(),
    role: z.enum(['admin', 'teacher', 'student']),
    // Optional fields
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  },
};

// We define the Zod schema for creating a user
export const createUserSchema = z.object({
  name: userModel.fields.name,
  email: userModel.fields.email,
  role: userModel.fields.role,
});
