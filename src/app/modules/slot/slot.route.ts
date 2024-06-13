import express from 'express';
import { SlotControllers } from './slot.controller';

const router = express.Router();
router.post('/', SlotControllers.createSlots);
router.get('/availability', SlotControllers.getAllSlotsData);
export const SlotsRoutes = router;
