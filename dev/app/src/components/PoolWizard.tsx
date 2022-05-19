import { useEffect, useState } from "react";
import { PoolCreator } from "./PoolCreator";
import { PoolFiller } from "./PoolFiller";
import { PoolOverview } from "./PoolOverview";
import { Coordinate, Pooler } from "../types/types";

enum Step {
    Create,
    Populate,
    Overview,
}

type PoolWizardProps = {
    pool: Array<Pooler>;
    setPool: Function;
    setDest: Function;
};

export const PoolWizard = ({ pool, setPool, setDest }: PoolWizardProps) => {
    const [step, setStep] = useState<Step>(Step.Create);
    const [dest, setDestination] = useState<Coordinate>();
    const [destText, setDestText] = useState("");

    const handlePoolOverview = (e: React.FormEvent) => {
        // This function will open a share link when done!
        e.preventDefault();
    };

    const nextStep = () => {
        if (step < Step.Overview) {
            setStep(step + 1);
        }
    };
    /* 
    const prevStep = () => {
        if (step > Step.Create) {
            setStep(step - 1);
        }
    };
    */

    const updatePool = async (p: Pooler) => {
        await setPool(p);
    };

    const setDestinationHeader = (destination: string) => {
        setDestText(destination);
    };

    switch (step) {
        case Step.Populate:
            return (
                <PoolFiller
                    destinationName={destText}
                    destinationURL="#"
                    addPooler={updatePool}
                    pool={pool}
                    nextStep={nextStep}
                    setDest={setDest}
                />
            );
        case Step.Overview:
            return (
                <PoolOverview
                    destinationName={destText}
                    destinationURL="#"
                    meetingPointURL="#"
                    meetingPointName="IMPLEMENT ME"
                    callback={handlePoolOverview}
                    pool={pool}
                    setDest={setDest}
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
                    setDest={setDest}
                />
            );
    }
};
