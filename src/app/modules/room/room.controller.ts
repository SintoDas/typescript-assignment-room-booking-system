import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { RoomServices } from './room.service';
import httpStatus from 'http-status';
const createRoom: RequestHandler = catchAsync(async (req, res) => {
  const result = await RoomServices.createRoomIntoDbB(req.body);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room added successfully',
    data: result,
  });
});
const getSingleRoom: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const room = await RoomServices.getSingleRoomFromDB(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room retrieved successfully',
    data: room,
  });
});
const getAllRooms: RequestHandler = catchAsync(async (req, res) => {
  const rooms = await RoomServices.getAllRoomsFromDB();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rooms retrieved successfully',
    data: rooms,
  });
});
const updateRoom: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const room = await RoomServices.updateRoomIntoDB(id, req.body);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room updated successfully',
    data: room,
  });
});
const deleteRoom: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const room = await RoomServices.deleteRoomFromDB(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room deleted successfully',
    data: room,
  });
});
export const RoomControllers = {
  createRoom,
  getSingleRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
};
