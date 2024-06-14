import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

// types/express/index.d.ts
declare namespace Express {
  export interface Response {
    noDataFound?: () => void;
  }
}
