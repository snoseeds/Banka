import express from 'express';
import logger from 'morgan';
import { config } from './config/config';

require('dotenv').config();

// calling an instance of express
const app = express();

// logging all request to console using morgan
app.use(logger('dev'));

config(app);

export default app;
