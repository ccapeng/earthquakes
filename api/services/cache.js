let earthquakeData = []

const indexCache = (earthquakes) => {
    earthquakeData = earthquakes;
}

const searchCache = async(place) => {

    console.log("searchCache");
    let searchData;
    if (typeof(place) === "string") {
        searchData = earthquakeData.filter(item =>
            item.place.toLowerCase().indexOf(place.toLowerCase()) > -1
        );
    } else {
        searchData = earthquakeData;
    }
    return searchData;
}

export {
    indexCache,
    searchCache
}