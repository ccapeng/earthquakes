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

  // getEarthquakeData: async() => {
  //   //let earthquakeData = await EarthquakeService.list();
  //   let earthquakeMeta = await EarthquakeService.getExternalList();
  //   console.log("earthquakeMetata", earthquakeMeta);
  //   let earthquakeData = earthquakeMeta.features;
  //   console.log("earthquakeData", earthquakeData);
  //   let locations = [], points = [];
  //   for (let item of earthquakeData) {
  //     let loc = {
  //       id: item._id,
  //       place: item._source.place,
  //       time: dateTimeFormatter.format(item._source.time),
  //       url: item._source.url,
  //       lat: item._source.latitude,
  //       lon: item._source.longitude,
  //       mag: item._source.mag
  //     }
  //     locations.push(loc);
  //     let point = {
  //       type: "FeatureCollection",
  //       features: [
  //         {
  //           type: "Feature",
  //           properties: {
  //             name: loc.place
  //           },
  //           id: loc.id,
  //           geometry:{
  //             type:"Point",
  //             coordinates:[loc.lat, loc.lon]
  //           }
  //         }
  //       ]
  //     }
  //     points.push(point);
  //   }
  //   return {locations, points};
  // }

  getEarthquakeData: async() => {
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

}