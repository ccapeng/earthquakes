import 'log-timestamp';
import axios from 'axios';
import { client, INDEX_EQRTHQUAKES } from '../elasticsearch/connection.js';

const URL = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`;

// getrom USGS and then index into Elasticsearch
const indexData = async () => {

    const getEarthquakeObject = (result) => {

        let props = result.properties;
        let geo = result.geometry;
        let obj = {
            id: result.id,
            place: props.place,
            time: props.time,
            tiamp: props.time,
            updmestated: props.updated,
            tz: props.tz,
            url: props.url,
            detail: props.detail,
            felt: props.felt,
            cdi: props.cdi,
            alert: props.alert,
            status: props.status,
            tsunami: props.tsunami,
            sig: props.sig,
            net: props.net,
            code: props.code,
            sources: props.sources,
            nst: props.nst,
            dmin: props.dmin,
            rms: props.rms,
            mag: props.mag,
            magType: props.magType,
            type: result.properties.type,
            latitude: geo.coordinates[0],
            longitude: geo.coordinates[1],
            location:
                { 
                    lat: geo.coordinates[1],
                    lon: geo.coordinates[0],
                },
            depth: geo.coordinates[2]
        }
        return obj;
    }

    try {
        console.log(`Getting Data From Host: ${URL}`);
        const EARTHQUAKES = await axios.get(`${URL}`,{
            headers: {
                'Content-Type': [
                    'application/json',  
                    'charset=utf-8' 
                ]
            }
        });

        let features = EARTHQUAKES.data.features
        //let earthquakeResults = [];
        // for (let result of results) {
        //     let earthquakeObject = getEarthquakeObject(result);
        //     let elasticResult = await client.index({ 
        //         index: INDEX_EQRTHQUAKES,
        //         id: result.id,
        //         body: earthquakeObject
        //     });
        //     earthquakeResults.push(elasticResult);
        // }

        let earthquakes = [];
        for (let feature of features) {
            let earthquake = getEarthquakeObject(feature);
            earthquakes.push(earthquake);
        }

        // insert data in bulk
        let body = earthquakes.flatMap(
            obj => [{ index: { _index: INDEX_EQRTHQUAKES } }, obj]
        );
        let results = await client.bulk({ 
            refresh: true,
            body
        });
        console.log('data indexed:', results.body.items.length);

    } catch (err) {
        console.log("err:", JSON.stringify(err, null, 4));
    };

}

export {
    indexData
}