import express from 'express';
import earthquakeRouter from './routes/earthquakes.js';
import mapRouter from './routes/maps.js';
import geojsonRouter from './routes/geojson.js';
import { loadData } from './services/earthquake.js';

// initialize express
const HOST = process.env.HOST || "http://127.0.0.1"
const app = express(); 

// init middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

let routers = [earthquakeRouter, mapRouter, geojsonRouter]
for (let router of routers) {
  app.use('', router);
}


// load data initially and contiguously
loadData();

// start up server
let port = process.env.PORT || 5001;
export const server = app.listen(port, () => {
    let host = HOST + ":" + port;
    console.log("server startat:", host);
    for (let router of routers) {
      router.stack.forEach(function(r){
        if (r.route && r.route.path){
          console.log(`Route: ${host}${r.route.path}`)
        }
      });
    }

});