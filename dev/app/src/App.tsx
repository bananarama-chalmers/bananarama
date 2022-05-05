import React, {useEffect, useState} from "react";
import "./tailwind.css";
import StreetMap from "./components/StreetMap";
import {PoolWizard} from "./components/PoolWizard";
import {coordinate} from "./model/generate-map";

const App = () => {
    const [startLocation, setStartLocation] = useState<coordinate>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((response:GeolocationPosition) => {
            setStartLocation({lng:response.coords.longitude, lat:response.coords.latitude});
        },
        (e:any) => {
            setStartLocation({lng:11.946472,lat:57.698864});
        })
    },[])

    return (
        <div className="w-screen h-screen">
            {startLocation && <StreetMap lat={startLocation.lat} lng={startLocation.lng}/>}
            <PoolWizard />
        </div>
    );
}

export default App;
