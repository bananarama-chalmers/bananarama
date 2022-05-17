import "./tailwind.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StreetMapView from "./components/StreetMapView";
import { PoolWizard } from "./components/PoolWizard";
import { LandingPage } from "./pages/LandingPage";
import { Navigation } from "./components/Navigation";
import { useState, useEffect } from "react";
import { Coordinate, Pooler } from "./types/types";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
    "pk.eyJ1Ijoic2ltam9obiIsImEiOiJjbDFxNGRwajYwN2lrM2xudWl4dzloaXo4In0.ul3d8p97UuUMYOLADmbNEg";

const defaultCoord: Coordinate = { lng: 11.946472, lat: 57.698864 };

function App() {
    const defaultCoord: Coordinate = { lng: 11.946472, lat: 57.698864 };

    const [startLocation, setStartLocation] = useState<Coordinate>();

    const [poolers] = useState<Array<Pooler>>(new Array<Pooler>());
    const [destination, setDestination] = useState<Coordinate>({
        lng: 11.946472,
        lat: 57.698864,
    });
    const [theme, setTheme] = useState("");

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
            <div className={theme}>
                <Navigation toggleTheme={setTheme} />
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
                                        startLocation={startLocation}
                                        theme={
                                            theme === ""
                                                ? "light-v10"
                                                : "dark-v10"
                                        }
                                    />
                                )}
                                <PoolWizard
                                    poolers={poolers}
                                    poolHandler={() => console.log("remove me")}
                                />
                            </div>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;
