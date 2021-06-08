import React, { useEffect} from "react";
import { useAtom } from "jotai";

import { fromLonLat, get as getProjectionObj } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import Map from "./map";
import { Layers, TileLayer, VectorLayer } from "./layers";
import { osm, vector } from "./source";
import { Controls, FullScreenControl } from "./controls";
import Header from "./layout/Header.js";
import Location from "./components/Location.js";
import appHandler from './appHandler.js';
import { locationListAtom, mapAtom, store } from "./store/storeAtom.js";
import "./app.css";

const App = () => {

  const [_, setLocationList] = useAtom(locationListAtom);
  const [map, setMap] = useAtom(mapAtom);

  useEffect(async()=> {
    let usaMapData = await appHandler.getMapData();
    let {locations, points} = await appHandler.getEarthquakeData();
    setMap({
      ...map,
      mapList:[usaMapData],
      pointList: points
    });
    setLocationList(locations);
  },[]);

  const setPosition = (center, zoom)=> {
    setMap({...map,center, zoom});
  }
  store.setPosition = setPosition;
  return (
    <>
      <Header />
      <main className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            {console.log("rendering map.")}
            <Map center={fromLonLat(map.center)} zoom={map.zoom}>
              <Layers>
                <TileLayer source={osm()} zIndex={0} />
                {map.mapList.map((layer, index)=>{
                  return (
                  <VectorLayer
                      source={vector({
                        features: new GeoJSON().readFeatures(layer, {
                          featureProjection: getProjectionObj("EPSG:3857")
                        }),
                      })}
                      style={layer.style}
                      key={`map-${index}`}
                  />
                  )
                  }
                )}
                {map.pointList.map((layer,index)=>{
                  return (
                  <VectorLayer
                      source={vector({
                        features: new GeoJSON().readFeatures(layer, {
                          featureProjection: getProjectionObj("EPSG:3857")
                        }),
                      })}
                      style={layer.style}
                      key={`layer-${index}`}
                  />
                  )
                  }
                )}
              </Layers>
              <Controls>
                <FullScreenControl />
              </Controls>
            </Map>
          </div>
          <div className="d-block d-md-none col-12 py-3"></div>
          <div className="col-md-4 col-sm-12">
            <div className="loc-panel border border-secondary">
              <Location />
            </div>
          </div>
          <div className="d-block d-md-none col-12 py-3"></div>
        </div>
      </main>
    </>
  );
};

export default App;