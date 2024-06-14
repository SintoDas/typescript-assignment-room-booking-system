import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  room: { type: Schema.Types.ObjectId, ref: 'room', required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: 'slot', required: true }],
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  date: { type: String, required: true },
  totalAmount: { type: Number },
  isConfirmed: { type: String, default: 'unconfirmed' },
  isDeleted: { type: Boolean, default: false },
});
export const Booking = model<TBooking>('booking', bookingSchema);
