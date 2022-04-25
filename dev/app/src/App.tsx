import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
