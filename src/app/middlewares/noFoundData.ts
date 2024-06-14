import { Request, Response, NextFunction } from 'express';

export interface CustomResponse extends Response {
  noDataFound?: () => void;
}

export const noDataFound = (
  req: Request,
  res: CustomResponse,
  next: NextFunction,
) => {
  res.noDataFound = () => {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  };
  next();
};
