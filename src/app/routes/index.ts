import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { RoomRoutes } from '../modules/room/room.route';
import { SlotsRoutes } from '../modules/slot/slot.route';

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
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
