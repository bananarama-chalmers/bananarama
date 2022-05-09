import { useState } from "react";
import { PoolCreator } from "./PoolCreator";
import { PoolFiller } from "./PoolFiller";
import { PoolOverview } from "./PoolOverview";
import { Pooler, Coordinate, Travel } from '../types/types';

enum Step {
    Create,
    Populate,
    Overview,
}

export const PoolWizard = () => {
    const [step, setStep] = useState<Step>(Step.Create);
    const [owner, setOwner] = useState<Pooler>({
        name: "",
        coords: { lat: 0, lng: 0 } as Coordinate,
        street: "",
        travelType: Travel.Car,
        color: "purple-500"
    } as Pooler);
    const [dest, setDest] = useState("");
    const [pool, setPool] = useState<Array<JSX.Element>>([]);

    const handlePoolCreation = (owner: Pooler, dest: string): void => {
        setOwner(owner);
        setDest(dest);
        nextStep();
    };

    const handlePoolFill = (poolers: Array<JSX.Element>): void => {
        setPool(poolers);
        nextStep();
    };

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
    switch (step) {
        case Step.Populate:
            return (
                <PoolFiller
                    destinationName={dest}
                    destinationURL="#"
                    callback={handlePoolFill}
                    owner={owner}
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
            return <PoolCreator callback={handlePoolCreation} />;
    }
};
