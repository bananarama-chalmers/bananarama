import React, { useEffect, useState } from "react";
import { ThinSeparator, Separator } from "./Separator";
import { Pooler, Coordinate, Travel } from "../types/types";
import { PoolItem } from "./PoolItem";
import { SearchBox } from "./SearchBox";
import { GeoCoding } from "../model/geo-coding";

type PoolFillerProps = {
    destinationURL: string;
    destinationName: string;
    callback: Function;
    owner: Pooler;
    pool: Array<Pooler>;
};

export const PoolFiller = ({
    callback,
    destinationName,
    destinationURL,
    owner,
    pool,
}: PoolFillerProps) => {
    const [pos, setPos] = useState("");
    const [name, setName] = useState("");
    const [travelType, setTravelType] = useState(Travel.Car);
    const travelTypes = ["car", "walk", "bike", "bus"]; // FIXME: this is too qnd

    const handleSubmit = (e: React.FormEvent) => {
        // Sends the event to the parent component and prevents the page from refreshing
        e.preventDefault();
        callback(pool);
    };

    const addPooler = (e: React.FormEvent) => {
        setTravelType(travelType);
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
        // Prevent the page from refreshing
        e.preventDefault();
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTravelType(travelTypes.indexOf(e.currentTarget.value));
    };

    useEffect(() => {
        // Populate the pooler list with the owners info when mounting the component
        callback([owner]);
    }, [owner]);

    return (
        <form
            className="grid grid-cols-3 drop-shadow-lg gap-2 p-2 rounded-lg fixed m-4 left-0 top-66px z-10 w-box-width bg-white dark:bg-neutral-900 dark:text-white"
            onSubmit={handleSubmit}
        >
            <label className="col-span-3 text-slate-600 dark:text-white text-base font-semibold">
                Destination
                <br />
                <a
                    href={destinationURL}
                    className="text-blue-400 text-lg underline hover:text-blue-500"
                >
                    {destinationName}
                </a>
            </label>
            <Separator />
            <label className="col-span-2 text-slate-600 dark:text-white text-base font-semibold">
                Pooler name
                <input
                    className="p-2 bg-white dark:bg-black dark:text-white dark:outline-neutral-800 dark:border-neutral-800 rounded-md border h-10 outline-slate-200"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder={"Enter name"}
                />
            </label>
            <label className="col-span-1 text-slate-600 dark:text-white text-base font-semibold">
                Travel type
                <select
                    id="travel types"
                    name="travelTypeList"
                    value={travelTypes[travelType]}
                    onChange={(e) => handleSelect(e)}
                    className="block z-10 relative w-full p-2 bg-white rounded-md border h-10 outline-slate-200 dark:bg-black dark:text-white dark:outline-neutral-800 dark:border-neutral-800"
                >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="walk">Walk</option>
                    <option value="bus">Bus</option>
                </select>
            </label>
            <label className="col-span-2 text-slate-600 dark:text-white text-base font-semibold">
                Pooler position
                <SearchBox placeholder="Enter position" textSetter={setPos} />
            </label>
            <label className="col-span-1 text-slate-600 dark:text-white text-base font-semibold">
                <br />
                <input
                    className="w-full hover:bg-green-600 hover:cursor-pointer bg-green-500 font-semibold text-white rounded-md h-10"
                    type="submit"
                    value="Add pooler"
                    onClick={(e) => addPooler(e)}
                />
            </label>
            <ThinSeparator />
            <p className="col-span-2 mt-1 text-slate-600 dark:text-white text-base font-semibold">
                Poolers
            </p>
            <p className="col-span-1 mt-1 text-slate-600 dark:text-white text-base text-right font-semibold">
                Traveling by
            </p>
            <ThinSeparator />
            <ul className="col-span-3">{pool.map((p) => p.poolElement)}</ul>
            <Separator />
            <button className="col-span-3 font-semibold dark:bg-blue-500 dark:hover:bg-blue-600 bg-slate-800 hover:bg-slate-900 text-white h-10 rounded-lg mt-1">
                Get meeting point
            </button>
        </form>
    );
};
