import { Travel } from "../types/types";

type PoolItemProps = {
    poolerName: string;
    travelType: Travel;
    color: string;
};

export const PoolItem = ({ poolerName, travelType, color }: PoolItemProps) => {
    const travelTypes = ["Car", "Walk", "Bike", "Bus"];
    const border = "border-" + color;
    return (
        <li className="text-slate-900">
            <div
                className={
                    "block w-3 border-8 rounded-full mt-1 mr-2 float-left " +
                    border
                }
            ></div>
            <p className="float-left">{poolerName}</p>
            <div className="block border-slate-500 w-3 border-8 rounded-full mt-1 ml-2 float-right"></div>
            <p className="float-right">{travelTypes[travelType]}</p>
            <br />
        </li>
    );
};
