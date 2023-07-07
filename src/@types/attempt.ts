import { ICard } from "./card";

export type IPlayAttempt = {
    firstCard?: ICard;
    secondCard?: ICard;
    isMatch?: boolean;
};