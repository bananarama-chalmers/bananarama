<<<<<<< HEAD
import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import FormPage from "./pages/FormPage";
import Home from "./pages/Home";
import PoolPage from "./pages/PoolPage";
import "./tailwind.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="" element={<Home />} />
          <Route path="pool" element={<PoolPage />} />
          <Route path="form" element={<FormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
=======
import React, {useEffect, useState} from "react";
import "./tailwind.css";
import StreetMap from "./components/StreetMap";
import {PoolWizard} from "./components/PoolWizard";
import {Coordinate} from "./model/generate-map";

const App = () => {
    const [startLocation, setStartLocation] = useState<Coordinate>();

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
>>>>>>> 3031504ffeed5f5bab363867ca504cda60d33027
}
export default App;
