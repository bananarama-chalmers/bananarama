import { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { StreetMap } from "../model/street-map";
import { Coordinate, Pooler } from "../types/types";

type StreetMapViewProps = {
    startLocation: Coordinate,
    poolers: Array<Pooler>,
    destination: Coordinate
}

const defaultCoord: Coordinate = {lng: 11.946472, lat: 57.698864}

function usePos() {
    let [searchParams, setSearchParams] = useSearchParams()

    let lng = (searchParams.get("lng"))
    let lat = (searchParams.get("lat"))

    let pos: Coordinate = defaultCoord

    let nullCheck = (lng !== null) && (lat !== null)
    let nanCheck = (!isNaN(+lng!)) && (!isNaN(+lat!))


    // keep default values if any value is missing
    if(nullCheck && nanCheck) {
        pos = {lng: +lng!, lat: +lat!}
    }

    return pos;
}


const StreetMapView = (
    {startLocation,
     poolers,
     destination}: StreetMapViewProps
) => {
    const map = useRef<StreetMap | null>(null);

    let startPos = usePos()

    if(startPos === defaultCoord) {
        startPos = startLocation
    }
    // Create map and markers
    useEffect(() => {
        if (map.current) return;
            map.current = new StreetMap(
                startPos,
                "mapbox://styles/mapbox/streets-v11",
                "mapContainer",
            );

    });

    useEffect(() => {
        map.current?.generateMarkers(poolers);
    },[poolers])

    return (
        <div>
            <div
                id="mapContainer"
                className="absolute w-full bottom-0 top-0 text-white"
            />
            <button
                onClick={() => {
                    map.current?.getRoute(poolers, destination);
                }}
                className="absolute z-10 top-66px right-5 hover:bg-green-600 bg-green-500 rounded-lg font-bold p-2 text-white"
            >
                Generate route
            </button>
        </div>
    );
};

export default StreetMapView;
