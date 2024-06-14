import config from '../../config';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import { isPasswordMatched } from './user.utils';
import jwt from 'jsonwebtoken';

const registerUserIntoDB = async (payload: TUser): Promise<any> => {
  // find user already registered
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new Error('User already exists');
  }

  const newUser = await User.create(payload);
  return newUser;
};
// const userLogin = async (payload: TLoginUser) => {
//   // find user exist
//   const user = await User.findOne({ email: payload.email }).select('+password');

//   if (!user) {
//     throw new Error('User not found');
//   }

//   // check password matched
//   const passwordMatch = await isPasswordMatched(
//     payload.password,
//     user.password,
//   );

//   if (!passwordMatch) {
//     throw new Error('Password not matched');
//   }
//   const jwtPayload = {
//     email: user?.email,
//     password: user?.password,
//   };
//   const userDataWithoutPassword = {
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//     address: user.address,
//     role: user.role,
//   };

//   const accessToken = jwt.sign(
//     jwtPayload,
//     config.jwt_access_token_secret as string,
//     {
//       expiresIn: config.jwt_access_token_expires_in,
//     },
//   );
//   return { accessToken, userDataWithoutPassword };
// };
const userLogin = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password,
  );

  if (!passwordMatch) {
    throw new Error('Password not matched');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_token_secret as string,
    {
      expiresIn: config.jwt_access_token_expires_in,
    },
  );
  const userDataWithoutPassword = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role,
  };

  return {
    accessToken,
    userDataWithoutPassword,
  };
};

export const UserServices = {
  registerUserIntoDB,
  userLogin,
};
