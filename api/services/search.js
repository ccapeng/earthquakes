import { Client } from '@elastic/elasticsearch';

const ES_HOST = process.env.ES_HOST || 'http://localhost:9200';
const client = new Client({
	node: ES_HOST,
	log: 'trace'
});

const INDEX = "earthquakes";
let pingCount = 0;
const PING_MAX = 20, PING_INTERVAL = 5000;
// check that Elasticsearch is up and running
// then check if search index, create it if not exists.
const ping = async () => {
    try {
        await client.ping();
        console.log('elasticsearch ready:', ES_HOST);
        let result = await client.indices.exists({index: INDEX});
        if (result && result.statusCode === 200) {
            console.log(`elasticsearch index, ${INDEX}, exist.`);
        } else {
            await client.indices.create( {index: INDEX});
            console.log(`elasticsearch index, ${INDEX}, created.`);
        }
        return true;

    } catch (e) {
        if (
            e.constructor.name === "ConnectionError"
        ) {
            if (pingCount < PING_MAX) {
                console.error('elasticsearch is not ready.');
                pingCount++;
                await new Promise(resolve => setTimeout(resolve, PING_INTERVAL));
                console.log(`#${pingCount} sleep: ${PING_INTERVAL}ms`);
                return await ping();
            } else {
                console.error('elasticsearch is not up.');
                console.error(e);
            }
        } else {
            console.error('elasticsearch cluster is down.');
            console.error(e);
        }
    }
    return false;
}

const index = async(features) => {

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

    let earthquakes = [];
    for (let feature of features) {
        let earthquake = getEarthquakeObject(feature);
        earthquakes.push(earthquake);
    }

    // insert data in bulk
    let body = earthquakes.flatMap(
        obj => [{ index: { _index: INDEX } }, obj]
    );
    let results = await client.bulk({ 
        refresh: true,
        body
    });
    console.log('elasticsearch data indexed:', results.body.items.length);

}

const search = async(place) => {

    let cond = {
        index: INDEX
    }
    if (typeof(place) === "string") {
        cond.body = {
            query: {
                match : {
                    place: place
                }
            }
        }
    }
    let { body } = await client.search(cond);
    return body.hits.hits;
}

export {
	ping,
    index as indexSearchData,
    search as searchData
}