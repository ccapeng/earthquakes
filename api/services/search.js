import { Client } from '@elastic/elasticsearch';
import { settings } from "../settings.js";

const client = new Client({
	node: settings.ES_HOST,
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
        console.log('elasticsearch ready:', settings.ES_HOST);
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

const index = async(earthquakes) => {

    // insert data in bulk
    // set _id to avoid the duplication
    let body = earthquakes.flatMap(
        obj => [{ index: { _index: INDEX, _id: obj.id } }, obj]
    );
    let results = await client.bulk({ 
        refresh: true,
        body
    });
    console.log(
        'elasticsearch data indexed:', 
        results.body.items.length
    );

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
    let results = []
    for (let obj of body.hits.hits) {
        results.push(obj._source);
    }
    return results;
}

export {
	ping,
    index as indexSearchData,
    search as searchData
}