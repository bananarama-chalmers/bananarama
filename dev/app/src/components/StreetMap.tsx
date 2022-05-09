import React, { useRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { Coordinate, streetMap } from "../model/generate-map";

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

const StreetMap = () => {
    const map = useRef<streetMap | null>(null);

    let pos = usePos()
    
    //TODO: be abstracted
    const [poolers] = useState<Number>(2);
    const [startLocation, setStartLocation] = useState<Coordinate>({
        lng: pos.lng,
        lat: pos.lat,
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
                setStartLocation(pos);
            }
        );
    }, []);

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
                    map.current?.getRoute({ lng: 11.72, lat: 57.7 });
                }}
                className="absolute z-10 top-5 right-5 hover:bg-green-600 bg-green-500 rounded-lg font-bold p-2 text-white"
            >
                Generate route
            </button>
        </div>
    );
};

export default StreetMap;
