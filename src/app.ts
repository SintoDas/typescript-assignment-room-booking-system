import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
const app = express();
// parser
app.use(express.json());
app.use(cors());

// application route
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
// notFound middleware
app.use(notFound);
// globalErrorHandler
app.use(globalErrorHandler);
export default app;
