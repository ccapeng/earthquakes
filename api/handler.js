import app from './app';
import awsServerlessExpress from 'aws-serverless-express';

const server = awsServerlessExpress.createServer(app)

export function universal(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    awsServerlessExpress.proxy(server, event, context);
}
// "use strict";

// const app = require('./app');
// const awsServerlessExpress  = require('aws-serverless-express');

// const server = awsServerlessExpress.createServer(app)

// exports.universal = (event, context) => 
//         awsServerlessExpress.proxy(server, event, context);

