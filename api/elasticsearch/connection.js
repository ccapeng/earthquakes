import { Client } from '@elastic/elasticsearch';

const ES_HOST = process.env.ES_HOST || 'http://localhost:9200';
const client = new Client({
	node: ES_HOST,
	log: 'trace'
});

const INDEX_EQRTHQUAKES = "earthquakes";

// check that Elasticsearch is up and running
const pingElastic = () => {
    client.ping(
        function(error, res) {
            if (error) {
                console.error('elasticsearch cluster is down!');
            } else {
                console.log('Elasticsearch Ready:', ES_HOST);
            }
        }
    );
}

export {
	client,
	INDEX_EQRTHQUAKES,
	pingElastic
}