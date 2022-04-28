import React from "react";

type PoolFillerProps = {
    destinationURL: string;
    destinationName: string;
};

export const PoolFiller = (props: PoolFillerProps) => {
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
    };

    return (
        <form
            className="grid grid-cols-3 drop-shadow-lg gap-2 p-2 rounded-lg fixed m-4 left-0 top-0 z-10 w-box-width bg-white"
            onSubmit={handleSubmit}
        >
            <label className="col-span-3 text-slate-600 text-base font-semibold">
                Destination
                <br />
                <a
                    href={props.destinationURL}
                    className="text-blue-400 text-lg underline hover:text-blue-500"
                >
                    {props.destinationName}
                </a>
            </label>
            <div className="block h-1px col-span-3 bg-slate-200"></div>
            <label className="col-span-2 text-slate-600 text-base font-semibold">
                Pooler name
                <input
                    className="p-2 bg-white rounded-md border h-10 outline-slate-200"
                    type="text"
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
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="walk">Walk</option>
                    <option value="bus">Bus</option>
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
                    onClick={handleSubmit}
                />
            </label>
            <div className="block h-1px col-span-3 bg-slate-200" />
            <p className="col-span-2 mt-1 text-slate-600 text-base font-semibold">
                Poolers
            </p>
            <p className="col-span-1 mt-1 text-slate-600 text-base font-semibold">
                Traveling by
            </p>
            <div className="block h-1px col-span-2 bg-slate-100" />
            <div className="block h-1px col-span-1 bg-slate-100" />
            <ul className="col-span-2">
                <li className="text-slate-900">
                    <div className="block border-purple-500 w-3 border-8 rounded-full mt-1 mr-2 float-left"></div>
                    <p className="w-full">Hugh Mungus</p>
                </li>
            </ul>
            <ul className="col-span-1">
                <li className="text-slate-900">
                    <div className="block border-slate-500 w-3 border-8 rounded-full mt-1 mr-2 float-left"></div>
                    <p className="w-full">Bike</p>
                </li>
            </ul>
            <div className="block h-1px col-span-3 bg-slate-200" />
            <button className="col-span-3 font-semibold bg-slate-800 hover:bg-slate-900 text-white h-10 rounded-lg mt-1">
                Get meeting point
            </button>
        </form>
    );
};
