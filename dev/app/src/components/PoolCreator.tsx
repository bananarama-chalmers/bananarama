import { useState } from "react";
import { Pooler, Coordinate, Travel } from "../types/types";
import { PoolItem } from "./PoolItem";

type PoolCreatorProps = {
    callback: Function;
};

export const PoolCreator = ({ callback }: PoolCreatorProps) => {
    const [name, setName] = useState<string>("");
    const [dest, setDest] = useState<string>("");
    const [pos, setPos] = useState<string>("");
    const [travelType, setTravelType] = useState<Travel>(Travel.Car);

    const handleSubmit = (e: any) => {
        // Sends the state to the parent component and prevents the page from refeshing
        e.preventDefault();
        callback(
            {
                name: name,
                coords: { lat: 0, lng: 0 } as Coordinate,
                street: pos,
                travelType: travelType,
                color: "purple-500",
                poolElement: (
                    <PoolItem
                        poolerName={name}
                        travelType={travelType}
                        key={0}
                        color={"purple-500"}
                    />
                ),
            } as Pooler,
            dest
        );
    };

    const stringToTravelType = (travelString: string): Travel => {
        // blasphemy
        switch (travelString) {
            case "bike":
                return Travel.Bike;
            case "walk":
                return Travel.Foot;
            case "bus":
                return Travel.Bus;
            default:
            case "car":
                return Travel.Car;
        }
    };

    return (
        <form
            className="grid grid-cols-3 drop-shadow-lg gap-2 p-2 rounded-lg fixed m-4 left-0 top-0 z-10 w-box-width bg-white"
            onSubmit={handleSubmit}
            name="creator"
        >
            <label className="col-span-3 text-slate-600 text-base font-semibold">
                My position
                <input
                    className="w-full bg-search-icon bg-sm bg-no-repeat p-1 pl-9  bg-left-sm bg-white rounded-md border h-10 outline-slate-200"
                    type="text"
                    onChange={(e) => setPos(e.target.value)}
                    placeholder={"Enter position"}
                />
            </label>
            <label className="col-span-2 text-slate-600 text-base font-semibold">
                Name
                <input
                    className="p-2 bg-white rounded-md border h-10 outline-slate-200"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder={"Enter name"}
                />
            </label>
            <label className="col-span-1 text-slate-600 text-base font-semibold">
                Travel type
                <select
                    id="true"
                    name="travelTypeList"
                    className="block z-10 relative w-full p-2 bg-white rounded-md border h-10 outline-slate-200"
                    onChange={(e) => {
                        setTravelType(stringToTravelType(e.target.value));
                    }}
                >
                    <option value={"car"}>Car</option>
                    <option value={"bike"}>Bike</option>
                    <option value={"walk"}>Walk</option>
                    <option value={"bus"}>Bus</option>
                </select>
            </label>
            <label className="col-span-3 text-slate-600 text-base font-semibold">
                Destination
                <input
                    className="w-full bg-search-icon bg-sm bg-no-repeat p-1 pl-9  bg-left-sm bg-white rounded-md border h-10 outline-slate-200"
                    type="text"
                    onChange={(e) => setDest(e.target.value)}
                    placeholder={"Enter destination"}
                />
            </label>
            <input
                className="outline-0 mt-1 hover:cursor-pointer hover:bg-slate-900 bg-slate-800 col-span-3 text-white rounded-lg p-2 font-semibold text-base"
                type="submit"
                value="Next: add poolers"
            />
        </form>
    );
};
