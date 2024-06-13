import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Slot } from './slot.model';
import { TSlot } from './slot.interface';
import { convertToMinutes, convertToTime } from './slot.utils';
import { Room } from '../room/room.model';

const createSlotsIntoDB = async (payload: TSlot) => {
  const { startTime, endTime, room, date } = payload;
  const isRoomExist = await Room.findById(room);
  if (!isRoomExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room does not exist');
  }

  const slotDuration = 60; // Default slot duration in minutes

  // Convert start and end times to minutes since midnight
  const startTimeInMinutes = convertToMinutes(startTime);
  const endTimeInMinutes = convertToMinutes(endTime);

  // Calculate the total duration in minutes
  const totalDurationInMinutes = endTimeInMinutes - startTimeInMinutes;

  // Calculate the number of slots
  const numberOfSlots = Math.floor(totalDurationInMinutes / slotDuration);

  const slots = [];
  for (let i = 0; i < numberOfSlots; i++) {
    // Calculate start time for each slot
    const slotStartTime = startTimeInMinutes + i * slotDuration;
    // Calculate end time for each slot
    const slotEndTime = slotStartTime + slotDuration;
    const slotData: TSlot = {
      room,
      date,
      startTime: convertToTime(slotStartTime), // Implement this function to convert minutes to time format
      endTime: convertToTime(slotEndTime),
    };
    const createdSlot = await Slot.create(slotData);
    slots.push(createdSlot);
  }

  // Return the array of created slots
  return slots;
};

const getAllSlotsDataFromDB = async (payload: {
  date: string;
  roomId: string;
}) => {
  const slotsData = await Slot.find();
  return slotsData;
};

const getAllAvailableSlotsFromDB = async () => {
  const slotsData = await Slot.find({ isBooked: false });
  return slotsData;
};
export const SlotServices = {
  createSlotsIntoDB,
  getAllSlotsDataFromDB,
  getAllAvailableSlotsFromDB,
};
