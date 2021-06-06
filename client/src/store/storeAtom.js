import { atom } from "jotai";
import mapConfig from "../config.json";

export const initialCenter = mapConfig.center;
const initialSearchState = {
    search: ""
}

const initialLocationListState = [];
const initialMapState = {
    mapList: [],
    pointList: [],
    zoom: 3,
    center: initialCenter
}

export const searchAtom = atom(initialSearchState);
export const locationListAtom = atom(initialLocationListState);
export const mapAtom = atom(initialMapState);

export const store = {}