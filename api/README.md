# Earthquakes

## Features
- Load US earthquake data from [https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson)

- Store data into local elastic search.  
  Default elastic search server is `http://localhost:9200`.  
  For now, elastic search server must be up in order to see the result.  
  Docker version is coming.

- Run `npm run server` to start.


## API Endpoint
- Check eathquake data:  
  [http://127.0.0.1:5001/api/earthquakes](http://127.0.0.1:5001/api/earthquakes)

- Search earthquark location by query string `?place=CA`.   
  For example : [http://127.0.0.1:5001/api/earthquakes?place=CA](http://127.0.0.1:5001/api/earthquakes?place=CA)

## Tech Highlights
- When server startup, wait for elastic search ready.  
  In docker environment, elastic search takes longer time to start up.
  I have a sleeping loop to wait for it ready.
- Load earthquake data every 3 minutes.
