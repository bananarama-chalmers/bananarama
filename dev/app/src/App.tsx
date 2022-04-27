import React from "react";
import "./tailwind.css";
import StreetMap from "./components/StreetMap";
import { PoolCreator } from "./components/PoolCreator";
import { PoolWizard } from "./components/PoolWizard";

function App() {
    return (
        <div className="w-screen h-screen">
            <h1 className="text-5xl">Hello, World!</h1>
            <StreetMap />
            <PoolWizard />
        </div>
    );
}

export default App;
