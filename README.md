# Earthquakes

## Backend APIs
-Features
- Load US earthquake data from [https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson)

- Store data into local elastic search.  
  Default elastic search server is `http://localhost:9200`.  
  For now, elastic search server must be up in order to see the result.  
  Docker version is coming.

- In `api` folder, run `npm run server` to start.  
  Check eathquake data [http://127.0.0.1:5001/api/earthquakes](http://127.0.0.1:5001/api/earthquakes)

- Search eqrthquak location by query string `?place=CA`.   
  For example : [http://127.0.0.1:5001/api/earthquakes?place=CA](http://127.0.0.1:5001/api/earthquakes?place=CA)



## Frontend
Coming

