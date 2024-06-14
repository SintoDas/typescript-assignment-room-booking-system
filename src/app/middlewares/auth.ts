import { NextFunction, Request, Response } from 'express';
import { USER_Role } from '../modules/user/user.constant';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';
import config from '../config';

export const auth = (...requiredRoles: (keyof typeof USER_Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new AppError(401, 'You are not authorized to access this route');
    }

    const verifyToken = jwt.verify(
      accessToken as string,
      config.jwt_access_token_secret as string,
    );

    const { role, email } = verifyToken as JwtPayload;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(401, 'User not found');
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized to access this route');
    }

    next();
  });
};
