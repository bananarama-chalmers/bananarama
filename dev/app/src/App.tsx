import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import PoolPage from "./pages/PoolPage";
import "./tailwind.css";

function Wrapper() {
  return (
    <div>
      <h1>wrapper</h1>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Outlet />}>
          <Route path="" element={<Home />} />
          <Route path="pool" element={<PoolPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
