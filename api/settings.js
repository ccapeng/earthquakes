const DATA_ENV_TYPE = {
    CACHE: 1,
    BACKEND: 2
}

const DATA_ENV = 
    process.env.DATA_ENV || 
    //DATA_ENV_TYPE.BACKEND;
    DATA_ENV_TYPE.CACHE;


export const settings = {
    HOST:
        process.env.HOST || 
        "http://127.0.0.1",

    PORT:
        process.env.PORT || 
        5001,

    INTERVAL:
        process.env.DATA_INTERVAL || 
        10800000, //3 hours        

    ES_HOST:
        process.env.ES_HOST || 
        'http://localhost:9200',
    USGS_URL:
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",

    isCachedDataUsed: () => {
        return DATA_ENV == DATA_ENV_TYPE.CACHE;
    },
    
    isBackendDataUsed: () => {
        return DATA_ENV == DATA_ENV_TYPE.BACKEND;
    }
    
}