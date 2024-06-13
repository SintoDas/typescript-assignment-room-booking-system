import { z } from 'zod';
export const timeValidationSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format, expected "HH:MM" in 24 hours format',
  },
);

const createSlotSchema = z
  .object({
    room: z.string(),
    date: z.string(),
    startTime: timeValidationSchema,
    endTime: timeValidationSchema,
  })
  .refine(
    (body) => {
      // startTime : 10:30  => 1970-01-01T10:30
      //endTime : 12:30  =>  1970-01-01T12:30

      const start = new Date(`1970-01-01T${body.startTime}:00`);
      const end = new Date(`1970-01-01T${body.endTime}:00`);

      return end > start;
    },
    {
      message: 'Start time should be before End time !  ',
    },
  )
  .refine(
    (body) => {
      // startTime : 10:30  => 1970-01-01T10:30
      //endTime : 12:30  =>  1970-01-01T12:30

      const start = new Date(`1970-01-01T${body.startTime}:00`);
      const end = new Date(`1970-01-01T${body.endTime}:00`);

      return end > start;
    },
    {
      message: 'Start time should be before End time !  ',
    },
  );

export const SlotValidations = {
  createSlotSchema,
};
