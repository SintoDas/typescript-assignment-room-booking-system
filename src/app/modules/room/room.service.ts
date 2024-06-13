import { TConferenceRoom } from './room.interface';
import { Room } from './room.model';

const createRoomIntoDbB = async (payload: TConferenceRoom) => {
  const newRoom = await Room.create(payload);
  return newRoom;
};
const getSingleRoomFromDB = async (id: string) => {
  const room = await Room.findById(id);
  return room;
};
const getAllRoomsFromDB = async () => {
  const rooms = await Room.find();
  return rooms;
};

const updateRoomIntoDB = async (
  id: string,
  payload: Partial<TConferenceRoom>,
) => {
  const modifiedData: Record<string, unknown> = payload;
  const room = await Room.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return room;
};
const deleteRoomFromDB = async (id: string) => {
  const room = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return room;
};

export const RoomServices = {
  createRoomIntoDbB,
  getSingleRoomFromDB,
  getAllRoomsFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
