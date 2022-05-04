import { Traveler, Coordinate, Travel } from "./PoolWizard";

type PoolItemProps = {
    poolerName: string;
    travelType: Travel;
};

export const PoolItem = ({ poolerName, travelType }: PoolItemProps) => {
    const travelTypes = ["Car", "Foot", "Bike", "Bus"];

    return (
        <li className="text-slate-900">
            <div className="block border-purple-500 w-3 border-8 rounded-full mt-1 mr-2 float-left"></div>
            <p className="float-left">{poolerName}</p>
            <div className="block border-slate-500 w-3 border-8 rounded-full mt-1 ml-2 float-right"></div>
            <p className="float-right">{travelTypes[travelType]}</p>
            <br />
        </li>
    );
};
