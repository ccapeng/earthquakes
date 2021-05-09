import { Client } from '@elastic/elasticsearch';

const ES_HOST = process.env.ES_HOST || 'http://localhost:9200';
const client = new Client({
	node: ES_HOST,
	log: 'trace'
});

const INDEX_EQRTHQUAKES = "earthquakes";

// check that Elasticsearch is up and running
const pingElastic = async () => {
    try {
        await client.ping();
        console.log('Elasticsearch Ready:', ES_HOST);
        return true;
    } catch (e) {
        console.error('elasticsearch cluster is down!');
        console.error(e);
    }
    return false;
}

export {
	client,
	INDEX_EQRTHQUAKES,
	pingElastic
}