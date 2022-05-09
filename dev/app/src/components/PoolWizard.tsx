import { useState } from "react";
import { PoolCreator } from "./PoolCreator";
import { PoolFiller } from "./PoolFiller";
import { PoolOverview } from "./PoolOverview";

enum Step {
    Create,
    Populate,
    Overview,
}

export enum Travel {
    Car,
    Foot,
    Bike,
    Bus,
}

export type Coordinate = {
    lat: number;
    lng: number;
};

export type Traveler = {
    name: string;
    coords: Coordinate;
    street: string;
    travelType: Travel;
};

export const PoolWizard = () => {
    const [step, setStep] = useState<Step>(Step.Create);
    const [owner, setOwner] = useState<Traveler>({
        name: "",
        coords: { lat: 0, lng: 0 } as Coordinate,
        street: "",
        travelType: Travel.Car,
    } as Traveler);
    const [dest, setDest] = useState("");
    const [renderedPool, setRenderedPool] = useState<Array<JSX.Element>>([]);

    const handlePoolCreation = (owner: Traveler, dest: string): void => {
        setOwner(owner);
        setDest(dest);
        nextStep();
    };

    const handlePoolFill = (poolers: Array<JSX.Element>): void => {
        setRenderedPool(poolers);
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
                    pool={renderedPool}
                />
            );
        case Step.Create:
        default:
            return <PoolCreator callback={handlePoolCreation} />;
    }
};
