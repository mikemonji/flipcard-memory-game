export type ICardReveal =
    'CAP' |
    'SHOES' |
    'SKIRT' |
    'OVERALLS' |
    'T-SHIRT'
;

export type ICardMatch =
    'H' |
    'A' |
    'P' |
    'Y' |
    'U' |
    'N'
;

export type ICard = {
    id: string;
    reveal: ICardReveal;
    match: ICardMatch;
};

export type ICardRow = {
    rowIndex: number;
    cards: Array<ICard>
};

export type CardStatus =
    'BUSY_FLIPPING' |
    'BUSY_RESETTING' |
    'COVERED' |
    'FLIPPED'
;

export type ICardGameStatus =
    'CARD_NOT_MATCHED' |
    'CARD_MATCHED' |
    'CARD_SURPRISE_REVEALED'
;
