import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import routes from './routes';

let app = express();

app.server = http.createServer(app);
//middlewares
app.use(bodyParser.json({limit:config.bodyLimit}));

//passport config


//api routes version 1
app.use('/api/v1', routes);

app.server.listen(config.port);

console.log(`Server running on ${app.server.address().port}`);

export default app;
