import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import jwt from 'jsonwebtoken';
import { isPasswordMatched } from './user.utils';

const registerUserIntoDB = async (payload: TUser): Promise<any> => {
  // find user already registered
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already in exist');
  }

  const newUser = await User.create(payload);
  return newUser;
};
const userLogin = async (payload: TLoginUser) => {
  // find user exist
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is not found');
  }
  // check password matched
  const passwordMatch = await isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!passwordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password does not match');
  }
  const jwtPayload = {
    email: user?.email,
    password: user?.password,
  };
  const userDataWithoutPassword = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_token_secret as string,
    {
      expiresIn: config.jwt_access_token_expires_in,
    },
  );
  return { accessToken, userDataWithoutPassword };
};
export const UserServices = {
  registerUserIntoDB,
  userLogin,
};
