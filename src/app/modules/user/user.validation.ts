import { z } from 'zod';
const createUserSchema = z.object({
  name: z.string().min(1), // Assuming name cannot be empty
  email: z.string().email(),
  password: z.string().min(8), // Example: Minimum 8 characters
  phone: z.string().min(10), // Example: Assuming minimum 10 digits
  address: z.string().min(1), // Assuming address cannot be empty
  role: z.enum(['user', 'admin']), // Assuming role can only be 'user' or 'admin'
});

export const UserValidations = {
  createUserSchema,
};
