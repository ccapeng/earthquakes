import React, { useEffect, useState} from "react";
import { fromLonLat, get as getProjectionObj } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import Map from "./map";
import { Layers, TileLayer, VectorLayer } from "./layers";
import { osm, vector } from "./source";
import { Controls, FullScreenControl } from "./controls";
import Header from "./layout/Header.js";
import appHandler from './appHandler.js';
import mapConfig from "./config.json";
import "./app.css";

const App = () => {

  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(3);
  const [outlineLayers, setOutlineLayers] = useState([]);
  const [pointLayers, setPointLayers] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(async()=> {
    let usaMapData = await appHandler.getMapData();
    setOutlineLayers([usaMapData]);
  },[]);

  useEffect(async()=> {
    let {locations, points} = await appHandler.getEarthquakeData();
    setLocations(locations);
    setPointLayers(points);
  },[]);

  const gotoLocation = (id)=> {
    let {lat, lon} = appHandler.getLocation(id, locations);
    setCenter([lat, lon]);
    setZoom(8);    
  }

  const restUSACenter = ()=> {
    setCenter(mapConfig.center);
    setZoom(3);
  }

  return (
    <>
      <Header />
      <main className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8 col-sm-12">

            <Map center={fromLonLat(center)} zoom={zoom}>
              <Layers>
                <TileLayer source={osm()} zIndex={0} />
                {outlineLayers.map((layer,index)=>{
                  console.log("rendering outline layer");
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
                {pointLayers.map((layer,index)=>{
                  console.log("rendering point layer");
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
              <ul className="list-group list-group-flush">
                <li key={`loc-usa`} className="list-group-item bg-light">
                  <a href="#usa" onClick={()=>restUSACenter()}>
                    USA Earthquake Locations
                  </a>
                </li>
                {locations.map(location=>{
                  console.log("rendering location:", location.id);
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
            </div>
          </div>
          <div className="d-block d-md-none col-12 py-3"></div>
        </div>
      </main>
    </>
  );
};

export default App;