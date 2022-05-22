import { Travel } from "../types/types";

type PoolItemProps = {
    poolerName: string;
    travelType: Travel;
    color: string;
};

export const PoolItem = ({ poolerName, travelType, color }: PoolItemProps) => {
    const travelTypes = ["Car", "Walk", "Bike", "Bus"];
    const travelColors: Array<string> = [
        "border-[#22C55E]",
        "border-[#06B6D4]",
        "border-[#8B5CF6]",
        "border-[#F97316]",
    ];

    const borders: any = {
        "#0048FF": "border-[#0048FF]",
        "#009200": "border-[#009200]",
        "#D900FF": "border-[#D900FF]",
        "#00946B": "border-[#00946B]",
        "#FF00FF": "border-[#FF00FF]",
        "#FF0000": "border-[#FF0000]",
    };

    return (
        <li className="text-slate-900 dark:text-white">
            <div
                className={
                    borders[color.toUpperCase()] +
                    " block w-3 border-8 rounded-full mt-1 mr-2 float-left"
                }
            ></div>
            <p className="float-left">{poolerName}</p>
            <div
                className={
                    travelColors[travelType] +
                    " block w-3 border-8 rounded-full mt-1 ml-2 float-right"
                }
            ></div>
            <p className="float-right">{travelTypes[travelType]}</p>
            <br />
        </li>
    );
};
