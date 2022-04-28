import React, { FormEvent, useState } from "react";

export default function PoolForm() {
  const [name, setName] = useState("");
  const [lat, setLat] = useState(100)
  const [long, setLong] = useState(100)


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const search = `${window.location.host}/pool?name=${name}&long=${long}&lat=${lat}`
    alert(`URL: ${search}`)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        </label>
        <label> Enter your destination longitude:
          <input
            type="number"   
            value={long}
            onChange={(e: any) => setLong(e.target.value)}
          />
          <label> Enter your destination latitude
              <input
                type="number"
                value={lat}
                onChange={(e: any) => setLat(e.target.value)}
              />
          </label>
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
