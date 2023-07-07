import { useState } from "react";
import { CardStatus } from "../../../@types/card";

type CardClickedOutcome = 'SUCCESS' | 'IGNORED';

const TIME_FLIPPING = 100;

export const useCard = () => {
    const [status, setStatus] = useState<CardStatus>('COVERED');

    const flipCard = async (): Promise<CardClickedOutcome> => {
        if (status !== 'COVERED') {
            return 'IGNORED';
        }

        setStatus('BUSY_FLIPPING');

        await new Promise((res) => {
            setTimeout(() => {
                setStatus('FLIPPED');
                res('FLIPPED')
            }, TIME_FLIPPING);
        });

        return 'SUCCESS';
    }

    const resetCard = () => {
        setTimeout(async () => {
            setStatus('BUSY_RESETTING');

            await new Promise((res) => {
                setTimeout(() => {
                    setStatus('COVERED');
                    res('COVERED')
                }, TIME_FLIPPING);
            });
        }, 500);
    };

    return {
        flipCard,
        status,
        resetCard,
    };
};