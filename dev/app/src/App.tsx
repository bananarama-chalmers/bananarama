import "./tailwind.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StreetMapView from "./components/StreetMapView";
import { PoolWizard } from "./components/PoolWizard";
import { LandingPage } from "./pages/LandingPage";
import { Navigation } from "./components/Navigation";

import { Coordinate, Pooler } from "./types/types";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
    "pk.eyJ1Ijoic2ltam9obiIsImEiOiJjbDFxNGRwajYwN2lrM2xudWl4dzloaXo4In0.ul3d8p97UuUMYOLADmbNEg";


function App() {
    const defaultCoord: Coordinate = {lng: 11.946472, lat: 57.698864}

    const [startLocation, setStartLocation] = useState<Coordinate>();
    const [poolers] = useState<Array<Pooler>>(new Array<Pooler>());
    const [destination, setDestination] = useState<Coordinate>(defaultCoord);



    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (response: GeolocationPosition) => {
                setStartLocation({
                    lng: response.coords.longitude,
                    lat: response.coords.latitude,
                });
            },
            () => {
                setStartLocation(defaultCoord);
            }
        );
    }, []);

    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <LandingPage />
                        </div>
                    }
                />
                <Route
                    path="/map"
                    element={
                        <div>
                            {startLocation && (
                                <StreetMapView
                                    destination={destination}
                                    poolers={poolers}
                                    startLocation={startLocation}/>
                            )}
                            <PoolWizard />
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
