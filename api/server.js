import express from 'express';
import earthquakeRrouter from './routes/earthquakes.js';
import { loadData } from './services/data.js';

// initialize express
const HOST = process.env.HOST || "http://127.0.0.1"
const app = express(); 

// init middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use('', earthquakeRrouter);

// load data initially and contiguously
loadData();

// start up server
let port = process.env.PORT || 5001;
export const server = app.listen(port, () => {
    let host = HOST + ":" + server.address().port;
    console.log("server startat:", host);
    earthquakeRrouter.stack.forEach(function(r){
        if (r.route && r.route.path){
          console.log(`Route: ${host}${r.route.path}`)
        }
    });
});