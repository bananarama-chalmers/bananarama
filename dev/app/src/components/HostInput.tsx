import React, { useState } from 'react';

function HostInput() {
    const [name, setName] = useState("Bob");
    const [pos, setPos] = useState("57.676685, 11.965728");
    const [dest, setDest] = useState("57.681497, 11.970830");

    const handleInput = () => {
        console.log(name + pos + dest);
    };

    return (
        <div>
            <input onChange={e => setName(e.target.value)}/>
            <input onChange={e => setPos(e.target.value)}/>
            <input onChange={e => setDest(e.target.value)}/>
            <button onClick={() => handleInput()}> Send link </button>
        </div>
    );
}

export default HostInput;
