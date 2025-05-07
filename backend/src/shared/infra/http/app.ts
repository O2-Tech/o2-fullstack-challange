import 'express-async-errors';
import express, { RequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import '@utils/env';
import routes from './routes/index';
import { errorHandling } from '@utils/errorHandling';
import customErrors from './middlewares/customErrors';

const app = express();
const accessControl: RequestHandler = (_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,DELETE,OPTIONS,PUT,PATCH',
  );
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '100mb' }));
app.use(accessControl);
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use('/api/v1/', routes);
app.use(customErrors());
app.use(errorHandling);

export { app };
