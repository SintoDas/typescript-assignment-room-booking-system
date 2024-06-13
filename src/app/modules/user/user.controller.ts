import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDB(req.body);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });
});
const userLogin: RequestHandler = async (req, res) => {
  const result = await UserServices.userLogin(req.body);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: result.accessToken,
    data: result?.userDataWithoutPassword,
  });
};

export const UserControllers = {
  createUser,
  userLogin,
};
