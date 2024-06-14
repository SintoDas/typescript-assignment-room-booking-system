import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRoom } from './room.interface';
import { Room } from './room.model';

const createRoomIntoDbB = async (payload: TRoom) => {
  const room = await Room.findOne({ roomNo: payload.roomNo });
  if (room) {
    throw new AppError(httpStatus.CONFLICT, 'Already exist!');
  }

  const newRoom = await Room.create(payload);
  return newRoom;
};
const getSingleRoomFromDB = async (id: string) => {
  const singleRoom = await Room.findById(id);
  return singleRoom;
};
const getAllRoomsFromDB = async () => {
  const rooms = await Room.find();
  return rooms;
};

const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  const modifiedData: Record<string, unknown> = payload;
  const singleRoom = await Room.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return singleRoom;
};
const deleteRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDbB,
  getSingleRoomFromDB,
  getAllRoomsFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
