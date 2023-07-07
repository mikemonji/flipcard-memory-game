import { Stack } from "@mui/material";
import { memo } from "react";
import Card from "./Card";
import { ICard, ICardGameStatus } from "../../../@types/card";
import { IGameSessionStatus } from "../../../@types/game";

type Props = {
    cards: Array<ICard>,
    disabled?: boolean,
    gameStatus: IGameSessionStatus,
    matchedCardIds: Array<string>,
    onCardFlipped: (card: ICard) => void,
};

const CardRow = ({ matchedCardIds, cards, disabled, gameStatus, onCardFlipped }: Props) => {
    if (!cards.length) {
        return null;
    }

    const getCardGameStatus = (cardId: string): ICardGameStatus | undefined => {

        if (gameStatus === 'IN_PROGRESS' && matchedCardIds.includes(cardId)) {
            return 'CARD_MATCHED';
        }

        if (gameStatus === 'SESSION_ENDED_ALL_MATCHED') {
            return 'CARD_SURPRISE_REVEALED';
        }

        if (gameStatus === 'SESSION_ENDED_NOT_ALL_MATCHED') {
            return 'CARD_NOT_MATCHED'
        }

        return undefined;

    };

    return (
        <Stack direction='row' spacing={1}>
            {
                cards.map(card => (
                    <Stack key={card.id}>

                        <Card 
                            card={card} 
                            disabled={disabled}
                            gameStatus={getCardGameStatus(card.id)}
                            onCardFlipped={onCardFlipped} />

                    </Stack>
                ))
            }
        </Stack>
    );
};

export default memo(CardRow);