let earthquakeData = [];
let loadDataCount = 0;

const indexCache = (earthquakes) => {
    loadDataCount++;
    earthquakeData = earthquakes;
}

let count = 0, maxTrial = 10, sleepInterval = 5000;
const getCacheData = async() => {
    while (count < maxTrial) {
        if (loadDataCount > 0) {
            console.log("loadDataCount:", loadDataCount);
            return Promise.resolve(earthquakeData);
        }
        count++;
        await new Promise(resolve => setTimeout(resolve, sleepInterval));
        console.log("sleep:", sleepInterval)
    }
}

const searchCache = async(place) => {

    console.log("searchCache");
    let cacheData = await getCacheData();
    let searchData;
    if (typeof(place) === "string") {
        searchData = cacheData.filter(item =>
            item.place.toLowerCase().indexOf(place.toLowerCase()) > -1
        );
    } else {
        searchData = cacheData;
    }
    return searchData;
}

export {
    indexCache,
    searchCache
}