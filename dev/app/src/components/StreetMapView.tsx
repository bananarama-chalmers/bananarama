import { useRef, useEffect } from "react";
import { StreetMap } from "../model/street-map";
import { Coordinate, Pooler } from "../types/types";

const StreetMapView = (startLocation: Coordinate, poolers: Array<Pooler>, destination: Coordinate) => {
    const map = useRef<StreetMap | null>(null);


    // Create map and markers
    useEffect(() => {
        if (map.current) return;
            map.current = new StreetMap(
                startLocation,
                "mapbox://styles/mapbox/streets-v11",
                "mapContainer",
            );
        //map.current?.generateMarkers(poolers);
    });

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
