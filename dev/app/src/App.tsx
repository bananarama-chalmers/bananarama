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
}
export default App;
