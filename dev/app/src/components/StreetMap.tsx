import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";

mapboxgl.accessToken =
    "pk.eyJ1Ijoic2ltam9obiIsImEiOiJjbDFxNGRwajYwN2lrM2xudWl4dzloaXo4In0.ul3d8p97UuUMYOLADmbNEg";

function StreetMap() {
    const markerOffset = 0.015;
    const fstColor = "#ef3038";
    const sndColor = "#1f75fe";

    const mapContainer = useRef<any>(null);
    const map = useRef<Map | null>(null);

    const [lng, setLng] = useState(11.97);
    const [lat, setLat] = useState(57.71);
    const [zoom, setZoom] = useState(12);

    const [fstMarker, setFstMarker] = useState<Marker | null>(null);
    const [sndMarker, setSndMarker] = useState<Marker | null>(null);

    // Create map
    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });
        map.current.resize();
    });

    // Create markers
    useEffect(() => {
        if (map.current instanceof Map) {
            if (fstMarker) return;
            setFstMarker(
                new mapboxgl.Marker({
                    color: fstColor,
                    draggable: true,
                })
                    .setLngLat([lng - markerOffset, lat - markerOffset])
                    .addTo(map.current)
            );

            if (sndMarker) return;
            setSndMarker(
                new mapboxgl.Marker({
                    color: sndColor,
                    draggable: true,
                })
                    .setLngLat([lng + markerOffset, lat + markerOffset])
                    .addTo(map.current)
            );
        }
    });

    return (
        <div>
            <div
                ref={mapContainer}
                className="absolute w-full bottom-0 top-0 text-white"
            />
        </div>
    );
}

export default StreetMap;
