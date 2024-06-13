import { z } from 'zod';

const createRoomSchema = z.object({
  name: z.string(),
  roomNo: z
    .number()
    .min(1, { message: 'Room number must be a positive number' }),
  floorNo: z
    .number()
    .min(1, { message: 'Floor number must be a positive number' }),
  capacity: z
    .number()
    .min(1, { message: 'Capacity must be a positive number' }),
  pricePerSlot: z
    .number()
    .min(0.01, { message: 'Price per slot must be greater than 0' }),
  amenities: z.array(z.string()),
  isDeleted: z.boolean().optional(),
});

const updateRoomSchema = z.object({
  name: z.string().optional(),
  roomNo: z
    .number()
    .min(1, { message: 'Room number must be a positive number' })
    .optional(),
  floorNo: z
    .number()
    .min(1, { message: 'Floor number must be a positive number' })
    .optional(),
  capacity: z
    .number()
    .min(1, { message: 'Capacity must be a positive number' })
    .optional(),
  pricePerSlot: z
    .number()
    .min(0.01, { message: 'Price per slot must be greater than 0' })
    .optional(),
  amenities: z.array(z.string()).optional(),
  isDeleted: z.boolean().optional(),
});
export const RoomValidations = {
  createRoomSchema,
  updateRoomSchema,
};
