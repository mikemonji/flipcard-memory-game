import { ICardRow } from "./card";

export type IGameSessionStatus =
    'NOT_STARTED' |
    'IN_PROGRESS' |
    'SESSION_ENDED_NOT_ALL_MATCHED' |
    'SESSION_ENDED_ALL_MATCHED'
;

export type IGameSession = {
    status: IGameSessionStatus;
    id: string;
    cardRows: Array<ICardRow>;
    maximumTriesAllowed: number;
};

// export 