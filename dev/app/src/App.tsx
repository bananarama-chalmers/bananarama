import "./tailwind.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StreetMapView from "./components/StreetMapView";
import { PoolWizard } from "./components/PoolWizard";
import { LandingPage } from "./pages/LandingPage";
import { Navigation } from "./components/Navigation";
import { useState, useEffect } from "react";
import { Coordinate, Pooler } from "./types/types";
import mapboxgl from "mapbox-gl";
import {AboutPage} from "./pages/About";

mapboxgl.accessToken =
    "pk.eyJ1Ijoic2ltam9obiIsImEiOiJjbDFxNGRwajYwN2lrM2xudWl4dzloaXo4In0.ul3d8p97UuUMYOLADmbNEg";

function App() {
    const defaultCoord: Coordinate = { lng: 11.946472, lat: 57.698864 };
    const [startLocation, setStartLocation] = useState<Coordinate>();
    const [destination] = useState<Coordinate>({
        lng: 11.946472,
        lat: 57.698864,
    }); // Add setter when its needed.
    const [theme, setTheme] = useState("");

    const [pool, setPool] = useState<Array<Pooler>>(new Array<Pooler>());
    /**
     * Adds a pooler to the pool. This function is sent to multiple components within the frontend.
     * @param p Pooler to push to @poolRefactor
     */
    const addPooler = async (p: Pooler) => {
        // FIXME: Remove null check somehow ewwww
        if (p.coords != null) {
            setPool(pool.concat([p]));
        }
    };

    const changeTheme = (theme: string) => {
        setTheme(theme);
    };

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
    });

    const mapboxTheme = () => {
        return theme === "" ? "light-v10" : "dark-v10";
    };

    return (
        <BrowserRouter>
            <div className={theme}>
                <Navigation toggleTheme={changeTheme} />
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
                                        poolers={pool}
                                        startLocation={startLocation}
                                        theme={mapboxTheme()}
                                    />
                                )}
                                <PoolWizard pool={pool} setPool={addPooler} />
                            </div>
                        }
                    />
                    <Route path="/about" element={<div className="bg-red-500"><AboutPage /></div>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;
