import React from "react";
import "./tailwind.css";
import StreetMap from "./components/StreetMap";
import { PoolCreator } from "./components/PoolCreator";

function App() {
    return (
        <div className="w-screen h-screen">
            <h1 className="text-5xl">Hello, World!</h1>
            <StreetMap />
            <PoolCreator />
        </div>
    );
}

export default App;
