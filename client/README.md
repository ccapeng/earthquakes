# USA Earchquakes

- Features
  - Show all earthquake location in USA.
  - Use open street map.
  - Load earthquake data from https://earthquake.usgs.gov
  - Click the place name to zoom in map.
  - Coming
    - Location search

- Development
  - To start: `npm start`
  - To build: `npm build`
  - To view: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

- Tech
  - It's react. 
  - Use [open layer](https://www.npmjs.com/package/ol) to lay map and location. Also apply the react [map component](https://github.com/mbrown3321/openlayers-react-map).
  - [USA map](https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA.geo.json)
  - [Earthquake data](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson)
  - Use state management [Jotai](https://github.com/pmndrs/jotai).
  - Decouple state and set state method to reduce react render.  
    Soon, I will have an article to talk about what is that and how to improve the performance.