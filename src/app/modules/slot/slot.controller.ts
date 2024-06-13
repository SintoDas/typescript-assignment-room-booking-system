import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { SlotServices } from './slot.service';
import httpStatus from 'http-status';

const createSlots: RequestHandler = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotsIntoDB(req.body);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: result,
  });
});
const getAllSlotsData: RequestHandler = catchAsync(async (req, res) => {
  const { date, roomId } = req.query;
  let allSlotsData;

  if (typeof date === 'string' && typeof roomId === 'string') {
    allSlotsData = await SlotServices.getAllSlotsDataFromDB({ date, roomId });
  } else {
    allSlotsData = await SlotServices.getAllAvailableSlotsFromDB();
  }

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
    data: allSlotsData,
  });
});

export const SlotControllers = {
  createSlots,
  getAllSlotsData,
};
