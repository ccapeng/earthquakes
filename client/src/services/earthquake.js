import Request from "./request";

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
  }
}

export default EarthquakeService;