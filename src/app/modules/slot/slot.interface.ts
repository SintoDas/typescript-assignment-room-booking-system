import { Types } from 'mongoose';
export interface TSlot {
  date: string;
  room: Types.ObjectId;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
  slotDuration?: number;
}
