/* eslint-disable no-console */
import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';
import { dataSource } from '../typeorm';

const port = process.env.PORT ?? 3000;

dataSource.initialize().then(() => {
  app.listen(process.env.PORT || port, () => {
    console.log(`Server started on port ${process.env.PORT || port}! 🏆`);
  });
});
