import express from 'express';
import earthquakeRouter from './routes/earthquakes.js';
import mapRouter from './routes/maps.js';
import geojsonRouter from './routes/geojson.js';
import { loadData } from './services/earthquake.js';
import { settings } from './settings.js';

// initialize express
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
export const server = app.listen(settings.PORT, () => {
    let host = settings.HOST + ":" + settings.PORT;
    console.log("server:", host);
    for (let router of routers) {
      router.stack.forEach(function(r){
        if (r.route && r.route.path){
          console.log(`Route: ${host}${r.route.path}`)
        }
      });
    }

});