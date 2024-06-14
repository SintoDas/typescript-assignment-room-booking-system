import { Request, Response, NextFunction } from 'express';

export const noDataFound = (
  req: Request,
  res: Response,
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
