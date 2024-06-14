import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { Request, RequestHandler, Response } from 'express';
import { BookingServices } from './booking.service';

const createBooking: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: ' Booking created successfully',
    data: result,
  });
});

const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  const bookings = await BookingServices.getAllBookingsFromDB();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'All bookings retrieved successfully',
    data: bookings,
  });
});
const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user;
  const userBookings = await BookingServices.getUserBookingsFromDB(userId);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User bookings retrieved successfully',
    data: userBookings,
  });
});
const updateBooking: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const booking = await BookingServices.updateBookingIntoDB(id, req.body);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking updated successfully',
    data: booking,
  });
});
const deleteBooking: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const booking = await BookingServices.deleteBookingFromDB(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking deleted successfully',
    data: booking,
  });
});
export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBooking,
  deleteBooking,
};
