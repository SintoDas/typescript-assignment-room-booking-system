import { Schema, model } from 'mongoose';
import { TRoom } from './room.interface';

const roomSchema = new Schema<TRoom>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  roomNo: {
    type: Number,
    required: [true, 'Room number is required'],
    unique: true,
  },
  floorNo: {
    type: Number,
    required: [true, 'Floor number is required'],
  },
  capacity: { type: Number, required: [true, 'Capacity is required'] },
  pricePerSlot: { type: Number, required: [true, 'pricePerSlot is required'] },
  amenities: {
    type: [String],
    required: [true, 'Amenities is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Room = model<TRoom>('room', roomSchema);
