import { useState } from "react";
import { PoolCreator } from "./PoolCreator";
import { PoolFiller } from "./PoolFiller";
import { PoolOverview } from "./PoolOverview";
import { Pooler } from "../types/types";
import { Step } from "../App";

type PoolWizardProps = {
    pool: Array<Pooler>;
    setPool: Function;
    step: Step;
    nextStep: Function;
    setDestination: Function;
};

export const PoolWizard = ({
    pool,
    setPool,
    step,
    nextStep,
    setDestination,
}: PoolWizardProps) => {
    const [dest, setDest] = useState("");

    const handlePoolOverview = (e: React.FormEvent) => {
        // This function will open a share link when done!
        e.preventDefault();
    };

    const updatePool = async (p: Pooler) => {
        await setPool(p);
    };

    const setDestinationHeader = (destination: string) => {
        setDest(destination);
    };

    switch (step) {
        case Step.Populate:
            return (
                <PoolFiller
                    destinationName={dest}
                    destinationURL="#"
                    addPooler={updatePool}
                    pool={pool}
                    nextStep={nextStep}
                />
            );
        case Step.Overview:
            return (
                <PoolOverview
                    destinationName={dest}
                    destinationURL="#"
                    meetingPointURL="#"
                    meetingPointName="IMPLEMENT ME"
                    callback={handlePoolOverview}
                    pool={pool}
                />
            );
        case Step.Create:
        default:
            return (
                <PoolCreator
                    addPooler={updatePool}
                    pool={pool}
                    setDestHeader={setDestinationHeader}
                    nextStep={nextStep}
                    setDestination={setDestination}
                />
            );
    }
};
