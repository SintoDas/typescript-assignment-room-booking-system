import { Room } from '../room/room.model';
import { Slot } from '../slot/slot.model';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (payload: TBooking) => {
  const { date, room, user, slots } = payload;

  // Find room, user, and slots documents
  const roomDoc = await Room.findById(room);
  if (!roomDoc) {
    throw new Error('Room not found');
  }

  const userDoc = await User.findById(user);
  if (!userDoc) {
    throw new Error('User not found');
  }

  const slotsDoc = await Slot.find({ _id: { $in: slots } });
  if (slotsDoc.length !== slots.length) {
    throw new Error('Some slots not found');
  }

  // Calculate total amount
  const totalAmount = slotsDoc.length * roomDoc.pricePerSlot;

  // Create new booking
  const newBooking = await Booking.create({
    date,
    slots,
    room: roomDoc._id,
    user: userDoc._id,
    totalAmount,
    isConfirmed: 'unconfirmed',
    isDeleted: false,
  });

  // Populate user, room, and slots fields
  const populatedBooking = await Booking.findById(newBooking._id)
    .populate('user')
    .populate('room')
    .populate('slots');

  return populatedBooking;
};
const getAllBookingsFromDB = async () => {
  const bookings = await Booking.find()
    .populate('slots')
    .populate('room')
    .populate('user');
  return bookings;
};
const getUserBookingsFromDB = async (userId: string) => {
  const userBookings = await Booking.find({ userId })
    .populate('room')
    .populate('slots')
    .populate('user');
  return userBookings;
};
const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const modifiedData: Record<string, unknown> = payload;
  const singleRoom = await Booking.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return singleRoom;
};
const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};
export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
