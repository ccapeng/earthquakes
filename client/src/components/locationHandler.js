export default {

  getLocation: (id, locations) => {
    for (let location of locations) {
      if (location.id === id) {
        return {lat:location.lat, lon:location.lon}
      }
    }
    return {}
  }

}