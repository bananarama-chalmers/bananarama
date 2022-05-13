import React from "react";
import { Pooler } from "../types/types";
import { Separator, ThinSeparator } from "./Separator";

type PoolOverviewProps = {
    destinationURL: string;
    destinationName: string;
    meetingPointURL: string;
    meetingPointName: string;
    callback: React.FormEventHandler;
    pool: Array<Pooler>;
};

export const PoolOverview = ({
    callback,
    destinationName,
    destinationURL,
    meetingPointURL,
    meetingPointName,
    pool,
}: PoolOverviewProps) => {
    return (
        <div className="grid grid-cols-3 drop-shadow-lg gap-2 p-2 rounded-lg fixed m-4 left-0 top-66px z-10 w-box-width bg-white">
            <div className="col-span-3 text-slate-600 text-base font-semibold">
                Meeting point
                <br />
                <a
                    href={meetingPointURL}
                    className="text-blue-400 text-lg underline hover:text-blue-500"
                >
                    {meetingPointName}
                </a>
            </div>
            <div className="block h-2px col-span-3 bg-slate-200" />
            <p className="col-span-2 mt-1 text-slate-600 text-base font-semibold">
                Poolers
            </p>
            <p className="col-span-1 mt-1 text-slate-600 text-base font-semibold">
                Traveling by
            </p>
            <ThinSeparator />
            <ul className="col-span-3">{pool.map((p) => p.poolElement)}</ul>
            <Separator />
            <div className="col-span-3 text-slate-600 text-base font-semibold">
                Destination
                <br />
                <a
                    href={destinationURL}
                    className="text-blue-400 text-lg underline hover:text-blue-500"
                >
                    {destinationName}
                </a>
            </div>
            <Separator />
            <button
                onClick={(e) => callback(e)}
                className="col-span-3 font-semibold bg-green-500 hover:bg-green-600 text-white h-10 rounded-lg mt-1"
            >
                Share link
            </button>
        </div>
    );
};
