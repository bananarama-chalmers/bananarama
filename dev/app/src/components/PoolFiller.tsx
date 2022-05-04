import React, { useEffect, useState } from "react";
import { ThinSeparator, Separator } from "./Separator";
import { Traveler, Coordinate, Travel } from "./PoolWizard";
import { PoolItem } from "./PoolItem";

type PoolFillerProps = {
    destinationURL: string;
    destinationName: string;
    callback: Function;
    owner: Traveler;
};

export const PoolFiller = ({
    callback,
    destinationName,
    destinationURL,
    owner,
}: PoolFillerProps) => {
    const [pos, setPos] = useState("");
    const [name, setName] = useState("");
    const [travelType, setTravelType] = useState(Travel.Car);
    const [poolers, setPoolers] = useState<Array<Traveler>>([]);
    const [renderedPool, setRenderedPool] = useState<Array<JSX.Element>>([]);

    const handleSubmit = (e: React.FormEvent) => {
        // Sends the event to the parent component and prevents the page from refreshing
        e.preventDefault();
        callback(renderedPool);
    };

    const addPooler = (e: React.FormEvent) => {
        poolers.push({
            name: name,
            coords: {} as Coordinate,
            street: pos,
            travelType: travelType,
        } as Traveler);

        // Update the rendered pool to show all poolers
        setRenderedPool(
            poolers.map((traveler, id = 0) => {
                return (
                    <PoolItem
                        poolerName={traveler.name}
                        travelType={traveler.travelType}
                        key={id++}
                    />
                );
            })
        );
        // Prevent the page from refreshing
        e.preventDefault();
    };

    useEffect(() => {
        // Populate the pooler list with the owners info when mounting the component
        setPoolers([owner]);
        setRenderedPool([
            <PoolItem
                poolerName={owner.name}
                travelType={owner.travelType}
                key={0}
            />,
        ]);
    }, []);

    return (
        <form
            className="grid grid-cols-3 drop-shadow-lg gap-2 p-2 rounded-lg fixed m-4 left-0 top-0 z-10 w-box-width bg-white"
            onSubmit={handleSubmit}
        >
            <label className="col-span-3 text-slate-600 text-base font-semibold">
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
            <label className="col-span-2 text-slate-600 text-base font-semibold">
                Pooler name
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
                >
                    <option
                        onSelect={() => setTravelType(Travel.Car)}
                        value="car"
                    >
                        Car
                    </option>
                    <option
                        onSelect={() => setTravelType(Travel.Bike)}
                        value="bike"
                    >
                        Bike
                    </option>
                    <option
                        onSelect={() => setTravelType(Travel.Foot)}
                        value="walk"
                    >
                        Walk
                    </option>
                    <option
                        onSelect={() => setTravelType(Travel.Bus)}
                        value="bus"
                    >
                        Bus
                    </option>
                </select>
            </label>
            <label className="col-span-2 text-slate-600 text-base font-semibold">
                Pooler position
                <input
                    className="w-full bg-search-icon bg-sm bg-no-repeat p-1 pl-9  bg-left-sm bg-white rounded-md border h-10 outline-slate-200"
                    type="text"
                    placeholder={"Enter position"}
                />
            </label>
            <label className="col-span-1 text-slate-600 text-base font-semibold">
                <br />
                <input
                    className="w-full hover:bg-green-600 hover:cursor-pointer bg-green-500 font-semibold text-white rounded-md h-10"
                    type="submit"
                    value="Add pooler"
                    onClick={(e) => addPooler(e)}
                />
            </label>
            <ThinSeparator />
            <p className="col-span-2 mt-1 text-slate-600 text-base font-semibold">
                Poolers
            </p>
            <p className="col-span-1 mt-1 text-slate-600 text-base text-right font-semibold">
                Traveling by
            </p>
            <div className="block h-1px col-span-3 bg-slate-200" />
            <ul className="col-span-3">{renderedPool}</ul>
            <Separator />
            <button className="col-span-3 font-semibold bg-slate-800 hover:bg-slate-900 text-white h-10 rounded-lg mt-1">
                Get meeting point
            </button>
        </form>
    );
};
