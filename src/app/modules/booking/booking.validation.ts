import { z } from 'zod';

const createBookingSchema = z.object({
  room: z.string(),
  slots: z.array(z.string()),
  user: z.string(),
  date: z.string(),
  totalAmount: z.number().optional(),
  isConfirmed: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export const BookingValidations = {
  createBookingSchema,
};
