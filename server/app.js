import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './router';

require('dotenv').config();

// calling an instance of express
const app = express();

// logging all request to console using morgan
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/', router);
// app.use('/api/v1', router);

export default app;
