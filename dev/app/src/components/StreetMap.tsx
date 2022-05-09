import React, { useRef, useEffect, useState } from "react";
import {Coordinate, streetMap} from "../model/street-map";

const StreetMap = (startLocation:Coordinate) => {
    const map = useRef<streetMap | null>(null);

    //TODO: be abstracted
    const [poolers] = useState<Number>(2);

    // Create map and markers
    useEffect(() => {
        if (map.current) return;
        map.current = new streetMap(
            startLocation,
            "mapbox://styles/mapbox/streets-v11",
            "mapContainer"
        );
        map.current?.generateMarkers(poolers);
    });

    return (
        <div>
            <div
                id="mapContainer"
                className="absolute w-full bottom-0 top-0 text-white"
            />
            <button
                onClick={() => {
                    map.current?.getRoute({lng:11.72, lat:57.70});
                }}
                className="absolute z-10 top-5 right-5 hover:bg-green-600 bg-green-500 rounded-lg font-bold p-2 text-white"
            >
                Generate route
            </button>
        </div>
    );
};

export default StreetMap;
