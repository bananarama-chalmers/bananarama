import React from "react";

export const PoolCreator = () => {
    const handleSubmit = (e: React.SyntheticEvent) => {
        // FIXME: SyntheticType is pretty abstract, try to more spcificly type this
        e.preventDefault();
        console.log("submit button clicked :^)");
    };

    return (
        <form
            className="grid grid-cols-3 drop-shadow-lg gap-2 p-2 rounded-lg fixed m-4 left-0 top-0 z-10 w-box-width bg-white"
            onSubmit={handleSubmit}
        >
            <label className="col-span-3 text-slate-600 text-base font-semibold">
                My position
                <input
                    className="w-full bg-search-icon bg-sm bg-no-repeat p-1 pl-9  bg-left-sm bg-white rounded-md border h-10 outline-slate-200"
                    type="text"
                    placeholder={"Enter position"}
                />
            </label>
            <label className="col-span-2 text-slate-600 text-base font-semibold">
                Name
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
                    <option className="selection:bg-white" value="car">
                        Car
                    </option>
                    <option className="selection:bg-white" value="bike">
                        Bike
                    </option>
                    <option className="selection:bg-white" value="walk">
                        Walk
                    </option>
                    <option className="selection:bg-white" value="bus">
                        Bus
                    </option>
                </select>
            </label>
            <label className="col-span-3 text-slate-600 text-base font-semibold">
                <input
                    className="w-full bg-search-icon bg-sm bg-no-repeat p-1 pl-9  bg-left-sm bg-white rounded-md border h-10 outline-slate-200"
                    type="text"
                    placeholder={"Enter destination"}
                />
            </label>
            <input
                className="outline-0 mt-1 hover:cursor-pointer hover:bg-slate-700 bg-slate-800 col-span-3 text-white rounded-lg p-2 font-semibold text-base"
                type="submit"
                value="Next: add poolers"
                onClick={handleSubmit}
            />
        </form>
    );
};
