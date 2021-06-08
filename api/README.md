# Earthquakes

## Features
- Load US earthquake data from [https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson)

- Click a location to zoom in.
- Click "USA Earthquake Locations" to go back the full USA map.
- Run `npm run server` to start.

## API Endpoint
- Check eathquake data:  
  [http://127.0.0.1:5001/api/earthquakes](http://127.0.0.1:5001/api/earthquakes)

- Search earthquark location by query string `?place=CA`.   
  For example : [http://127.0.0.1:5001/api/earthquakes?place=CA](http://127.0.0.1:5001/api/earthquakes?place=CA)

## Tech Highlights
- All environment settings are in the `settings.js`.
- Two data mode, cache and elastic search, are available.
- When server startup, load earthquake data first.  
- When backend mode is used:
  - When server startup, wait for elastic search ready.  
    In docker environment, elastic search takes longer time to start up. Use a loop to wait for it ready.
  - Default elastic search server is `http://localhost:9200`.  
