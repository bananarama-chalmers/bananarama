import React from 'react';
import './tailwind.css';
import StreetMap from "./components/StreetMap";

function App() {
  return (
    <div className="w-screen h-screen">
      <h1 className='text-5xl'>Hello, World!</h1>
      <p>foo bar</p>
      <StreetMap/>
    </div>
  );
}

export default App;
