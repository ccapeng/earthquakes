import FeatureStyles from "./features/Styles";

import MapData from './services/mapData.js';
import EarthquakeService from './services/earthquake.js';
import {dateTimeFormatter} from './services/datetimeFormatter';


export default {

  getMapData: async() => {
    let usaMapData = await MapData.getUSAMapData();
    usaMapData.style = FeatureStyles.MultiPolygon
    usaMapData.id="USA";
    return usaMapData;
  },

  getEarthquakeData: async() => {
    let earthquakeData = await EarthquakeService.list();
    let locations = [], points = [];
    for (let item of earthquakeData) {
      let loc = {
        id: item._id,
        place: item._source.place,
        time: dateTimeFormatter.format(item._source.time),
        url: item._source.url,
        lat: item._source.latitude,
        lon: item._source.longitude,
        mag: item._source.mag
      }
      locations.push(loc);
      let point = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              name: loc.place
            },
            id: loc.id,
            geometry:{
              type:"Point",
              coordinates:[loc.lat, loc.lon]
            }
          }
        ]
      }
      points.push(point);
    }
    console.log('locations:', locations);
    console.log('points:', points);
    return {locations, points};

  },

  getLocation: (id, locations) => {
    for (let location of locations) {
      if (location.id === id) {
        return {lat:location.lat, lon:location.lon}
      }
    }
    return {}
  }

}