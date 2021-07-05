import 'log-timestamp';
import axios from 'axios';
import { ping, indexSearchData, searchData } from './search.js';
import { indexCache, searchCache } from './cache.js';
import { settings } from '../settings.js';


const indexData = async () => {

    try {
        // get data from USGS
        const EARTHQUAKES = await axios.get(`${settings.USGS_URL}`,{
            headers: {
                'Content-Type': [
                    'application/json',  
                    'charset=utf-8' 
                ]
            }
        });

        let features = EARTHQUAKES.data.features;
        //console.log("features", features);
        // insert data to cache
        if (settings.isCachedDataUsed()) {
            console.log("isCachedDataUsed", features.length);
            indexCache(features);

        // insert data to search index
        } else if (settings.isBackendDataUsed()) {
            console.log("isBackendDataUsed");
            indexSearchData(features);
        }
        
    } catch (err) {
        console.error(error);
    };

}

const search = (place) => {
    if (settings.isCachedDataUsed()) {
        console.log("searchCache");
        return searchCache(place);
    } else if (settings.isBackendDataUsed()) {
        console.log("searchData");
        return searchData(place);
    }
}

const loadData = async() => {
    if (settings.isCachedDataUsed()) {
        console.log("CachedData");
        await indexData();
        setInterval(()=>indexData(), settings.INTERVAL);
    } else if (settings.isBackendDataUsed()) {
        console.log("BackendData");
        let isAvailable = await ping();
        if (isAvailable) {
            await indexData();
            setInterval(()=>indexData(), settings.INTERVAL);
        }
    }
}

export {
    loadData,
    search
}