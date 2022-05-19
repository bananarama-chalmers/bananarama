import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GeoCoding } from "../model/geo-coding";
import { StreetMap } from "../model/street-map";
import { Coordinate, Pooler } from "../types/types";

type StreetMapViewProps = {
    startLocation: Coordinate;
    poolers: Array<Pooler>;
    destination: Coordinate;
    theme: string;
};

const defaultCoord: Coordinate = { lng: 11.946472, lat: 57.698864 };

function usePos() {
    let [searchParams] = useSearchParams(); // Add setter when its needed.
    let lng = searchParams.get("lng");
    let lat = searchParams.get("lat");
    let pos: Coordinate = defaultCoord;
    let nullCheck = lng !== null && lat !== null;
    let nanCheck = !isNaN(+lng!) && !isNaN(+lat!);

    // keep default values if any value is missing
    if (nullCheck && nanCheck) {
        pos = { lng: +lng!, lat: +lat! };
    }

    return pos;
}

const StreetMapView = ({
    startLocation,
    poolers,
    destination,
    theme,
}: StreetMapViewProps) => {
    const map = useRef<StreetMap | null>(null);
    let startPos = usePos();
    const [prevTheme, setPrevTheme] = useState<string>(theme);

    if (startPos === defaultCoord) {
        startPos = startLocation;
    }
    // Create map and markers
    useEffect(() => {
        if (!map.current) {
            map.current = new StreetMap(
                startPos,
                "mapbox://styles/mapbox/" + theme,
                "mapContainer"
            );
        } else if (theme !== prevTheme) {
            map.current.changeMapStyle(theme);
            setPrevTheme(theme);
        }
    }, [theme, prevTheme, startPos]);

    useEffect(() => {
        map.current?.generateMarkers(poolers);
    }, [poolers]);

    useEffect(() => {
        map.current?.generateMarkerFromPos(destination);
    }, [destination]);

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
