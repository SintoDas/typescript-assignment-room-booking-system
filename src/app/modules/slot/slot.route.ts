import express from 'express';
import { SlotControllers } from './slot.controller';
import { auth } from '../../middlewares/Auth';
import { USER_Role } from '../user/user.constant';

const router = express.Router();
router.post('/', auth(USER_Role.admin), SlotControllers.createSlots);
router.get('/availability', SlotControllers.getAllSlotsData);
export const SlotsRoutes = router;
