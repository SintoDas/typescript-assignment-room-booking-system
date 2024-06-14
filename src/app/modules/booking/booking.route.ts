import express from 'express';
import { BookingControllers } from './booking.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';
import { USER_Role } from '../user/user.constant';
import { auth } from '../../middlewares/Auth';
const router = express.Router();
router.post(
  '/',
  validateRequest(BookingValidations.createBookingSchema),
  auth(USER_Role.user),
  BookingControllers.createBooking,
);
router.get('/', auth(USER_Role.admin), BookingControllers.getAllBookings);
router.put('/:id', auth(USER_Role.admin), BookingControllers.updateBooking);
router.delete('/:id', auth(USER_Role.admin), BookingControllers.deleteBooking);

export const BookingRoutes = router;
