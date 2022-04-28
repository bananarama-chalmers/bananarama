import { useState } from "react";
import { PoolCreator } from "./PoolCreator";
import { PoolFiller } from "./PoolFiller";
import { PoolOverview } from "./PoolOverview";

enum Step {
    Create,
    Populate,
    Overview,
}

export const PoolWizard = () => {
    const [step, setStep] = useState<Step>(Step.Create);
    const handlePoolCreation = (e: React.FormEvent) => {
        nextStep();
    };

    const handlePoolFill = (e: React.FormEvent) => {
        nextStep();
    };

    const handlePoolOverview = (e: React.FormEvent) => {
        nextStep();
    };

    const nextStep = () => {
        if (step < Step.Overview) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > Step.Create) {
            setStep(step - 1);
        }
    };

    switch (step) {
        case Step.Populate:
            return (
                <PoolFiller
                    destinationName="Andra Avenygatan 12"
                    destinationURL="#"
                    callback={handlePoolFill}
                />
            );
        case Step.Overview:
            return (
                <PoolOverview
                    destinationName="Andra Avenygatan 12"
                    destinationURL="#"
                    meetingPointURL="#"
                    meetingPointName="Liseberg idk 31"
                    callback={handlePoolOverview}
                />
            );
        case Step.Create:
        default:
            return <PoolCreator callback={handlePoolCreation} />;
    }
};
