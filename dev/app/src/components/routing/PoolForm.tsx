import React, { useState } from 'react'

export default function PoolForm() {
    const [name, setName] = useState("")

    const handleChange = (event:Event) => {
        setName((event.target as HTMLTextAreaElement)?.value)
    }

    return (
        <div>
            <form>
                <label>Enter your name:
                    <input
                    type="text"
                    value={name}
                    onChange={(e:any) => handleChange(e) }
                    />
                </label>
            </form>
        </div>
    )
}