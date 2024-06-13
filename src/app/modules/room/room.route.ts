import express from 'express';
import { RoomControllers } from './room.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { RoomValidations } from './room.validation';
const router = express.Router();
router.post(
  '/',
  validateRequest(RoomValidations.createRoomSchema),
  RoomControllers.createRoom,
);
router.get('/:id', RoomControllers.getSingleRoom);
router.get('/', RoomControllers.getAllRooms);
router.put(
  '/:id',
  validateRequest(RoomValidations.updateRoomSchema),
  RoomControllers.updateRoom,
);
router.delete('/:id', RoomControllers.deleteRoom);

export const RoomRoutes = router;
