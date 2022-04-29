import React, { useRef, useEffect, useState } from 'react';
import {streetMap} from "../model/generate-map";

function StreetMap() {

    const map = useRef<streetMap|null>(null);
    const [poolers] = useState<Number>(2);

    // Create map and markers
    useEffect(() => {
        if (map.current) return;
        map.current = new streetMap('mapbox://styles/mapbox/streets-v11', "mapContainer");
        map.current?.generateMarkers(poolers);
    });


    return (
        <div>
            <div id="mapContainer" className="h-400px w-2/3 text-white"/>
            <button onClick={() => {map.current?.getRoute()}}> Generate route </button>
        </div>
    );
}

export default StreetMap;