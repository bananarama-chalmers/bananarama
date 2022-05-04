import React from "react";
import "./tailwind.css";
import StreetMap from "./components/StreetMap";
import { PoolWizard } from "./components/PoolWizard";

function App() {
    return (
        <div className="w-screen h-screen">
            <StreetMap />
            <PoolWizard />
        </div>
    );
}

export default App;
