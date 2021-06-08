import Request from "./request";

const URL = 
  process.env.REACT_APP_USGS || 
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

const EarthquakeService = {
  list: (obj) => {
    let url;
    if (typeof(obj) !== "undefined") {
      if (obj.place) {
        url = "api/earthquake?place=" + obj.search;
      } else {
        url = "api/earthquakes";  
      }
    } else {
      url = "api/earthquakes";
    }
    return Request.get(url);
  },
  get: (guid) => {
    let url = `api/earthquakes/${guid}`;
    return Request.get(url);
  },
  getExternalList:() => {
    return Request.getExternal(URL);
  }
}

export default EarthquakeService;