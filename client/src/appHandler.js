import FeatureStyles from "./features/Styles";
import MapData from './services/mapData.js';
import EarthquakeService from './services/earthquake.js';
import {dateTimeFormatter} from './services/datetimeFormatter';

const getBackendData = async() => {
  let earthquakeData = await EarthquakeService.list();
  //console.log("earthquakeData", earthquakeData);
  let locations = [], points = [];
  for (let item of earthquakeData) {
    let loc = {
      id: item.id,
      place: item.properties.place,
      time: dateTimeFormatter.format(item.properties.time),
      url: item.properties.url,
      lat: item.geometry.coordinates[0],
      lon: item.geometry.coordinates[1],
      mag: item.properties.mag
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
  return {locations, points};
}

const getExternalData = async() => {
  let earthquakeMeta = await EarthquakeService.getExternalList();
  let earthquakeData = earthquakeMeta.features;
  let locations = [], points = [];
  for (let item of earthquakeData) {
    let loc = {
      id: item.id,
      place: item.properties.place,
      time: dateTimeFormatter.format(item.properties.time),
      url: item.properties.url,
      lat: item.geometry.coordinates[0],
      lon: item.geometry.coordinates[1],
      mag: item.properties.mag
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
  return {locations, points};
}

const DATA_ENV_TYPE = {
  EXTERNAL: 1,
  BACKEND: 2
}
const DATA_ENV =  process.env.REACT_APP_DATA_ENV || 
                  DATA_ENV_TYPE.EXTERNAL;

export default {

  getMapData: async() => {
    let usaMapData = await MapData.getUSAMapData();
    usaMapData.style = FeatureStyles.MultiPolygon
    usaMapData.id="USA";
    return usaMapData;
  },
  
  getEarthquakeData: async() => {
    console.log("getEarthquakeData REACT_DATA_ENV", DATA_ENV)
    if (DATA_ENV == DATA_ENV_TYPE.BACKEND) {
      return getBackendData();
    } else {
      return getExternalData();
    }

  }
}