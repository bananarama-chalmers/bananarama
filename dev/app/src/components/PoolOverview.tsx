import { Separator, ThinSeparator } from "./Separator";

type PoolOverviewProps = {
    destinationURL: string;
    destinationName: string;
    meetingPointURL: string;
    meetiingPointName: string;
};

export const PoolOverview = (props: PoolOverviewProps) => {
    return (
        <div className="grid grid-cols-3 drop-shadow-lg gap-2 p-2 rounded-lg fixed m-4 left-0 top-0 z-10 w-box-width bg-white">
            <div className="col-span-3 text-slate-600 text-base font-semibold">
                Meeting point
                <br />
                <a
                    href={props.meetingPointURL}
                    className="text-blue-400 text-lg underline hover:text-blue-500"
                >
                    {props.meetiingPointName}
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
            <Separator />
            <div className="col-span-3 text-slate-600 text-base font-semibold">
                Destination
                <br />
                <a
                    href={props.destinationURL}
                    className="text-blue-400 text-lg underline hover:text-blue-500"
                >
                    {props.destinationName}
                </a>
            </div>
            <Separator />
            <button className="col-span-3 font-semibold bg-green-500 hover:bg-green-600 text-white h-10 rounded-lg mt-1">
                Share link
            </button>
        </div>
    );
};
