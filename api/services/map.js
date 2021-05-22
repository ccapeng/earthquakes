import 'log-timestamp';
import axios from 'axios';

const countryURL = {
    USA:
    "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA.geo.json"
}
const stateURL = {
    USA: [
        "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA/_.geo.json"
    ]
}


const loadMap = async (obj) => {

    try {
        let url;
        console.log("loadMap:", obj);
        if ("country" in obj) {
            if ("state" in obj) {
                url = stateURL[obj.country].replace(/_/, state);
            } else {
                url = countryURL[obj.country];
            }
        }
        console.log("url:", url);
        console.log("Getting Data From Host:", url);
        if (typeof(url) === "undefined") {
            return {}
        }
        let data = await axios.get( url,{
            headers: {
                'Content-Type': [
                    'application/json',  
                    'charset=utf-8' 
                ]
            }
        });
        //console.log("data:", data);
        //data = JSON.parse(data);
        //console.log("data2:", JSON.stringify(data.data, null, 4));
        return data.data;

    } catch (err) {
        console.log("err:", JSON.stringify(err, null, 4));
    };

}

export {
    loadMap
}