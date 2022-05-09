import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./tailwind.css";
import StreetMap from "./components/StreetMap";
import { PoolWizard } from "./components/PoolWizard";

function App() {
    return (
        <div className="w-screen h-screen">
            <StreetMap />
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
