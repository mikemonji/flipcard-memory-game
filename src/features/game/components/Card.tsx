import { memo, useMemo } from "react";
import { ICard, ICardGameStatus } from "../../../@types/card";
import { Grid } from "@mui/material";
import { useCard } from "../hooks/useCard";
import { useAtom } from "jotai";
import { playAttempAtom } from "../atoms/attempt.atom";
import CardLottie from "./CardLottie";

import card1 from '../../../assets/lotties/cards/card-1.json';
import card2 from '../../../assets/lotties/cards/card-2.json';
import card3 from '../../../assets/lotties/cards/card-3.json';
import card4 from '../../../assets/lotties/cards/card-4.json';
import card5 from '../../../assets/lotties/cards/card-5.json';
import CardMatched from "./CardMatched";
import CardSurprise from "./CardSurprise";

type Props = {
    card: ICard,
    disabled?: boolean,
    gameStatus?: ICardGameStatus,
    onCardFlipped: (card: ICard) => void,
};

const WIDTH = 157;
const HEIGHT = 240;
const XS = 2.3;
const SM = 1.5;
const MD = 1.1;

const DIMENSIONS = {
    xs: {
        width: WIDTH / XS,
        height: HEIGHT / XS,
    },
    sm: {
        width: WIDTH / SM,
        height: HEIGHT / SM,
    },
    md: {
        width: WIDTH / MD,
        height: HEIGHT / MD,
    },
    lg: {
        width: WIDTH,
        height: HEIGHT,
    }
} as const;

const animationToCardMapping = {
    'SKIRT': card1,
    'SHOES': card2,
    'CAP': card3,
    'OVERALLS': card4,
    'T-SHIRT': card5,
};

const Card = ({ 
    card, 
    disabled, 
    gameStatus,
    onCardFlipped: notifyCardFlipped 
}: Props) => {
    
    const [playAttemps] = useAtom(playAttempAtom);

    const {
        status,
        flipCard,
        resetCard
    } = useCard();

    useMemo(() => {
        if (gameStatus !== 'CARD_MATCHED') {
            resetCard();
        }
    }, [gameStatus]);

    // Just to for flipping the card back
    // Would externalise this logic normally to parent components etc...
    useMemo(() => {
        
        if (
            status !== 'COVERED' && 
            !playAttemps
                .filter(x => x.isMatch)
                .map(x => [x.firstCard!.id, x.secondCard!.id])
                .reduce((x, y) => x.concat(...y), [])
                .includes(card.id)
        ) {
            resetCard();
        }
        
    }, [playAttemps]);

    const handleCardClick = async () => {
        if (
            disabled || 
            gameStatus === 'CARD_MATCHED' || 
            gameStatus === 'CARD_SURPRISE_REVEALED'
        ) {
            return;
        }

        const cardFlipResult = await flipCard();

        if (cardFlipResult === 'SUCCESS') {
            notifyCardFlipped(card);
        }
    };

    return (
        <Grid container 
            sx={{ 
                width: { 
                    xs: DIMENSIONS.xs.width,
                    sm: DIMENSIONS.sm.width,
                    md: DIMENSIONS.md.width,
                    lg: DIMENSIONS.lg.width
                }, 
                height: { 
                    xs: DIMENSIONS.xs.height,
                    sm: DIMENSIONS.sm.height,
                    md: DIMENSIONS.md.height,
                    lg: DIMENSIONS.lg.height
                }, 
                // border: gameStatus === 'CARD_MATCHED' ? '1pt solid #666' : 'none', 
                borderRadius: 5 
            }} 
            onClick={handleCardClick} key={card.id}>
                
                { 
                    status !== 'BUSY_RESETTING' && 
                    !gameStatus && 
                    <CardLottie animationData={animationToCardMapping[card.reveal]} /> 
                }

                {
                    status === 'FLIPPED' &&
                    gameStatus === 'CARD_MATCHED' && 
                    <CardMatched reveal={card.reveal} />
                }

                {
                    gameStatus === 'CARD_SURPRISE_REVEALED' &&
                    <CardSurprise suprise={card.match} />
                }
                
        </Grid>
    );
};

export default memo(Card);