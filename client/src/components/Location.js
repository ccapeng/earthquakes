import React from "react";
import locationHandler from './locationHandler.js';
import { useAtom } from "jotai";
import { locationListAtom, initialCenter, store } from "../store/storeAtom";

const Location = () => {

  const [locationList] = useAtom(locationListAtom);

  const gotoLocation = (id)=> {
    let {lat, lon} = locationHandler.getLocation(id, locationList);
    store.setPosition([lat,lon], 9);
  }

  const restUSACenter = ()=> {
    store.setPosition(initialCenter, 3);
  }

  return (
    <>
    {locationList.length > 0 &&
      <ul className="list-group list-group-flush">
        {console.log("rendering location")}
        <li key="loc-usa" className="list-group-item bg-light">
          <a href="#usa" onClick={()=>restUSACenter()}>
            USA Earthquake Locations
          </a>
        </li>
        {locationList.map(location=>{
          return (
            <li key={`loc-${location.id}`} className="list-group-item">
              <a href={`#${location.id}`} onClick={()=>gotoLocation(`${location.id}`)}>
                {location.place}
              </a>
              <div className="clearfix">
                <div 
                  className="badge badge-secondary float-left mt-1"
                  title="Magnitude"
                >
                  {location.mag}
                </div>
                <div className="float-right">
                  {location.time}
                </div>
              </div>
            </li>
          )}
        )}
      </ul>
    }
    </>
  );
};

export default React.memo(Location);