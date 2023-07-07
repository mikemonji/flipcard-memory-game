import { Stack } from "@mui/material";
import { memo } from "react";
import CardRow from "./CardRow";
import { ICard, ICardRow } from "../../../@types/card";
import { IPlayAttempt } from "../../../@types/attempt";
import { IGameSessionStatus } from "../../../@types/game";

type Props = {
    attempts: Array<IPlayAttempt>,
    cardRows: Array<ICardRow>,
    disabled?: boolean,
    gameStatus: IGameSessionStatus,
    onCardFlipped: (card: ICard) => void,
};

const CardList = ({ attempts, cardRows, disabled, gameStatus, onCardFlipped }: Props) => {
// debugger;
    if (!cardRows.length) {
        return null;
    }

    const matchedCards = attempts
                            .filter(play => play.isMatch)
                            .map(play => [play.firstCard!.id, play.secondCard!.id])
                            .reduce((x, y) => x.concat(y), []);

    return (
        <Stack direction='column' spacing={1}>
            
            {
                cardRows.map(row => (
                    <Stack key={row.rowIndex}>

                        <CardRow 
                            cards={row.cards} 
                            disabled={disabled}
                            gameStatus={gameStatus}
                            matchedCardIds={matchedCards}
                            onCardFlipped={onCardFlipped} />
                            
                    </Stack>
                ))
            }

        </Stack>
    );
};

export default memo(CardList);
