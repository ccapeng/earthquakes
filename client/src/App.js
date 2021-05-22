import React, { useEffect, useState, useReducer } from "react";
import Map from "./map";
import Header from "./layout/Header.js";
import { Layers, TileLayer, VectorLayer } from "./layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./source";
import { fromLonLat, get as getProjectionObj } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./controls";
import FeatureStyles from "./features/Styles";

import MapData from './services/mapData.js';
import EarthquakeService from './services/earthquake.js';
import {dateTimeFormatter} from './services/datetimeFormatter';
import mapConfig from "./config.json";
import "./app.css";


const App = () => {

  const [center, setCenter] = useState(mapConfig.center);

  //const [zoom, setZoom] = useState(9);
  const [zoom, setZoom] = useState(3);
  const [outlineLayers, setOutlineLayers] = useState([]);
  const [pointLayers, setPointLayers] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(async()=> {
    let usaMapData = await MapData.getUSAMapData();
    usaMapData.style = FeatureStyles.MultiPolygon
    usaMapData.id="USA";
    console.log("map data:", usaMapData);
    setOutlineLayers([usaMapData]);
  },[]);

  useEffect(async()=> {
    let earthquakeData = await EarthquakeService.list();
    let locations = [], points = [];
    for (let item of earthquakeData) {
      let loc = {
        id: item._id,
        place: item._source.place,
        time: dateTimeFormatter.format(item._source.time),
        url: item._source.url,
        lat: item._source.latitude,
        lon: item._source.longitude,
        mag: item._source.mag
      }
      locations.push(loc);
      let point = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            id: "USA",
            properties: {
              name: loc.place
            },
            id: loc.id,
            geometry:{
              type:"Point",
              coordinates:[loc.lat, loc.lon]
            }
          }
        ]
      }
      points.push(point);
    }
    console.log('locations:', locations);
    console.log('points:', points);
    setLocations(locations);
    setPointLayers(points);

  },[]);

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
                {locations.map((location,index)=>{
                  console.log("rendering location");
                  return (
                    <li key={`loc-${index}`} className="list-group-item">
                      {location.place}
                      <div className="clearfix">
                        <div className="badge badge-secondary float-left mt-1">
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