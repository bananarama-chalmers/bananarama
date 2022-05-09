import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./tailwind.css";
import StreetMapView from "./components/StreetMapView";
import { PoolWizard } from "./components/PoolWizard";

function App() {
    return (
        <div className="w-screen h-screen">
            <StreetMapView />
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
