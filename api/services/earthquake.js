import 'log-timestamp';
import axios from 'axios';
import { ping, indexSearchData, searchData } from './search.js';

const URL = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`;
const INTERVAL = process.env.DATA_INTERVAL || 180000; //3 minutes

const indexData = async () => {

    try {
        // get data from USGS
        console.log(`Getting Data From Host: ${URL}`);
        const EARTHQUAKES = await axios.get(`${URL}`,{
            headers: {
                'Content-Type': [
                    'application/json',  
                    'charset=utf-8' 
                ]
            }
        });

        // insert data to search index
        let features = EARTHQUAKES.data.features
        indexSearchData(features);

    } catch (err) {
        console.log("err:", JSON.stringify(err, null, 4));
    };

}

const search = (place) => {
    return searchData(place);
}

const loadData = async() => {
    let isAvailable = await ping();
    if (isAvailable) {
        indexData();
        setInterval(()=>indexData(), INTERVAL);
    }
}

export {
    loadData,
    search
}