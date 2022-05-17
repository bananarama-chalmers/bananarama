import { useState } from "react";
import { Pooler, Coordinate, Travel } from "../types/types";
import { PoolItem } from "./PoolItem";
import { SearchBox } from "./SearchBox";
import { GeoCoding } from "../model/geo-coding";

type PoolCreatorProps = {
    callback: Function;
    pool: Array<Pooler>;
};

export const PoolCreator = ({ callback, pool }: PoolCreatorProps) => {
    const [name, setName] = useState<string>("");
    const [dest, setDest] = useState<string>("");
    const [pos, setPos] = useState<string>("");
    const [travelType, setTravelType] = useState<Travel>(Travel.Car);

    const handleSubmit = (e: any) => {
        // Sends the state to the parent component and prevents the page from refeshing
        e.preventDefault();
        let gc = new GeoCoding();
        gc.forwardGeoCoding(pos).then((r: Coordinate) => {
            callback(
                pool.concat([
                    {
                        name: name,
                        coords: r,
                        street: pos,
                        travelType: travelType,
                        color: "purple-500",
                        poolElement: (
                            <PoolItem
                                poolerName={name}
                                travelType={travelType}
                                key={pool.length}
                                color={"purple-500"}
                            />
                        ),
                    } as Pooler,
                ])
            );
        });
        callback(name, pos);
        // Prevent the page from refreshing
        e.preventDefault();
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
            className="grid grid-cols-3 drop-shadow-lg gap-2 p-2 rounded-lg fixed m-4 left-0 top-66px z-10 w-box-width bg-white dark:bg-neutral-900 dark:text-white"
            onSubmit={handleSubmit}
            name="creator"
        >
            <label className="col-span-3 text-slate-600 dark:text-white  text-base font-semibold">
                My position
                <SearchBox placeholder="Enter position" textSetter={setPos} />
            </label>
            <label className="col-span-2 text-slate-600 dark:text-white  text-base font-semibold">
                Name
                <input
                    className="p-2 bg-white rounded-md border h-10 outline-slate-200 dark:bg-black dark:text-white dark:outline-neutral-800 dark:border-neutral-800"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder={"Enter name"}
                />
            </label>
            <label className="col-span-1 text-slate-600 dark:text-white text-base font-semibold">
                Travel type
                <select
                    id="true"
                    name="travelTypeList"
                    className="block z-10 relative w-full p-2 bg-white rounded-md border h-10 outline-slate-200 dark:bg-black dark:text-white dark:outline-neutral-800 dark:border-neutral-800"
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
            <label className="col-span-3 text-slate-600 dark:text-white  text-base font-semibold">
                Destination
                <SearchBox
                    placeholder="Enter destination"
                    textSetter={setDest}
                />
            </label>
            <input
                className="outline-0 mt-1 hover:cursor-pointer hover:bg-slate-900 bg-slate-800 dark:bg-blue-500 dark:hover:bg-blue-600  col-span-3 text-white rounded-lg p-2 font-semibold text-base"
                type="submit"
                value="Next: add poolers"
            />
        </form>
    );
};
