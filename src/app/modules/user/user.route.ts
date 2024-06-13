import express from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';

const router = express.Router();
router.post(
  '/signup',
  validateRequest(UserValidations.createUserSchema),
  UserControllers.createUser,
);
router.post('/login', UserControllers.userLogin);

export const UserRoutes = router;
