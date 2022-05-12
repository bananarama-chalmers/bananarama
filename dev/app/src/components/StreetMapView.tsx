import { useRef, useEffect, useState } from "react";
import { Coordinate, StreetMap } from "../model/street-map";

const StreetMapView = () => {
    const map = useRef<StreetMap | null>(null);
    //TODO: be abstracted
    const [poolers] = useState<Number>(2);
    const [startLocation, setStartLocation] = useState<Coordinate>({
        lng: 11.946472,
        lat: 57.698864,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (response: GeolocationPosition) => {
                setStartLocation({
                    lng: response.coords.longitude,
                    lat: response.coords.latitude,
                });
            },
            (e: any) => {
                setStartLocation({ lng: 11.946472, lat: 57.698864 });
            }
        );
    }, []);

    // Create map and markers
    useEffect(() => {
        if (map.current) return;
        map.current = new StreetMap(
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
                    map.current?.getRoute({ lng: 11.72, lat: 57.7 });
                }}
                className="absolute z-10 top-66px right-5 hover:bg-green-600 bg-green-500 rounded-lg font-bold p-2 text-white"
            >
                Generate route
            </button>
        </div>
    );
};

export default StreetMapView;
