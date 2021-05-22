import Request from "./request.js"
const usaURL = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA.geo.json";
const usaStateURL = [
    "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA/",
    "",
    ".geo.json"
]

let allMapData = {}
const COUNTRY_USA = "USA";

const mapData = {

    getUSAMapData : async() => {
        if (COUNTRY_USA in allMapData) {
            return allMapData[COUNTRY_USA];
        } else {
            // let url = "api/maps/USA";  
            // let data = await Request.get(url);
            let url = usaURL;  
            let data = await Request.getExternal(url);
            allMapData[COUNTRY_USA] = data;
            return data;
        }
    },

    getStateMapData : async(state) => {
        state = state.toUpperCase();
        if (state in allMapData) {
            return allMapData[state];
        } else {
            // let url = "api/maps/USA/" + state;  
            // let data = await Request.get(url);
            let url = usaStateURL[0] + state + usaStateURL[2];  
            let data = await Request.getExternal(url);
            data = data.data;
            allMapData[state] = data;
            return data;
        }
    }
}


export default mapData;