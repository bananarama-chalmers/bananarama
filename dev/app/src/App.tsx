import "./tailwind.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StreetMapView from "./components/StreetMapView";
import { PoolWizard } from "./components/PoolWizard";

import { Coordinate, Pooler } from "./types/types";
import mapboxgl from "mapbox-gl";


mapboxgl.accessToken =
    "pk.eyJ1Ijoic2ltam9obiIsImEiOiJjbDFxNGRwajYwN2lrM2xudWl4dzloaXo4In0.ul3d8p97UuUMYOLADmbNEg";

function App() {
    const [startLocation, setStartLocation] = useState<Coordinate>();
    const [poolers] = useState<Array<Pooler>>(new Array<Pooler>())
    const [destination, setDestination] = useState<Coordinate>()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((response:GeolocationPosition) => {
                setStartLocation({lng:response.coords.longitude, lat:response.coords.latitude});
            }, () => {
                setStartLocation({lng:11.946472,lat:57.698864});
            })
    },[])

    return (
        <div className="w-screen h-screen">
            {startLocation && <StreetMapView lat={startLocation.lat} lng={startLocation.lng} />}
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="" element={<PoolWizard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
