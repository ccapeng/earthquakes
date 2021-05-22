import Request from "./request";

let geoJsonData = {}

const EarthquakeGeoJsonService = {
  list: async() => {
    let url = "api/geojson";
    let list = await Request.get(url);
    console.log("list:", list);
    let geoJsonDataList = [];
    for (let item of list) {
      let geoJson = await Request.getExternal(item.url);
      geoJsonDataList.push(geoJson);
    }
    console.log("geoJsonDataList:", geoJsonDataList);
    return geoJsonDataList;
  },

  get: async(id, url) => {
    if (id in geoJsonData) {
      return geoJsonData[id];
    } else {
      let data = await Request.getExternal(url);
      geoJsonData[id] = data;
      return data;
    }
  }
}

export default EarthquakeGeoJsonService;