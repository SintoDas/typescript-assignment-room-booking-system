import express from 'express';
import { RoomControllers } from './room.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { RoomValidations } from './room.validation';
import { USER_Role } from '../user/user.constant';
import { auth } from '../../middlewares/auth';

const router = express.Router();
router.post(
  '/',
  auth(USER_Role.admin),
  validateRequest(RoomValidations.createRoomSchema),
  RoomControllers.createRoom,
);
router.get('/:id', RoomControllers.getSingleRoom);
router.get('/', RoomControllers.getAllRooms);
router.put(
  '/:id',
  auth(USER_Role.admin),
  validateRequest(RoomValidations.updateRoomSchema),
  RoomControllers.updateRoom,
);
router.delete('/:id', auth(USER_Role.admin), RoomControllers.deleteRoom);

export const RoomRoutes = router;
