import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { RoomRoutes } from '../modules/room/room.route';
import { SlotsRoutes } from '../modules/slot/slot.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { UserBookingRoutes } from '../modules/booking/booking.user.route';

const router = Router();
const modulesRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/rooms',
    route: RoomRoutes,
  },
  { path: '/slots', route: SlotsRoutes },
  { path: '/bookings', route: BookingRoutes },
  { path: '/my-bookings', route: UserBookingRoutes },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
