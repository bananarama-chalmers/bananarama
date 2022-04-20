import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2ltam9obiIsImEiOiJjbDFxNGRwajYwN2lrM2xudWl4dzloaXo4In0.ul3d8p97UuUMYOLADmbNEg';

function StreetMap() {
    const mapContainer = useRef<any>(null);
    const map = useRef<Map|null>(null);
    const [lng, setLng] = useState(11.97);
    const [lat, setLat] = useState(57.71);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    return (
        <div ref={mapContainer} className="map-container w-2/3 h-2/3 text-white" />
    );
}

export default StreetMap;