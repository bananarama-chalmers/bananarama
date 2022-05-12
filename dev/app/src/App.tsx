import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./tailwind.css";
import StreetMapView from "./components/StreetMapView";
import { PoolWizard } from "./components/PoolWizard";
import { LandingPage } from "./pages/LandingPage";
import { Navigation } from "./components/Navigation";

function App() {
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
                        <div className="w-screen h-screen">
                            <StreetMapView />
                            <PoolWizard />
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
