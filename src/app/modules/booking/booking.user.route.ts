import express from 'express';
import { BookingControllers } from './booking.controller';
import { auth } from '../../middlewares/Auth';
import { USER_Role } from '../user/user.constant';

const router = express.Router();

router.get('/', auth(USER_Role.user), BookingControllers.getUserBookings);

export const UserBookingRoutes = router;
