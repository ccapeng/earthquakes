import { atom } from "jotai";

export const initiarSearchState = {
    search: ""
}

export const searchAtom = atom(initiarSearchState)