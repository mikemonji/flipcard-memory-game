import { useMemo, useState } from "react";
import { useAtom } from "jotai";

import { ATTEMPTS_KEY, MAX_CARD_PER_ROW } from "../../utils/constants";
import { IGameSession, IGameSessionStatus } from "../../../@types/game";
import { useGetNextGameData } from "./useGetNextGameData";
import { IPlayAttempt } from "../../../@types/attempt";
import { ICard } from "../../../@types/card";
import { bulkLogAttemptAtom, clearAttemptLogsAtom, logAttemptAtom, playAttempAtom } from "../atoms/attempt.atom";
import { useSubmitGameData } from "./useSubmitGameData";
import { usePlayer } from "./usePlayer";
import { useGetRoundCount } from "./useGetRoundCount";
import { useHasPausedGameData } from "./useHasPausedGameData";

export const useGame = () => {

    const [game, setGame] = useState<IGameSession | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const { isError, mutate: newGame } = useGetNextGameData(onNewGameSuccess, onNewGameFailure, onSettled);
    const [currentAttempt, setCurrentAttempt] = useState<IPlayAttempt | null>(null);
    const [, logAttempt] = useAtom(logAttemptAtom);
    const [, bulkLogAttempt] = useAtom(bulkLogAttemptAtom);
    const [remainingTries, setRemainingTries] = useState<number>(0);
    const [gameStatus, setGameStatus] = useState<IGameSessionStatus>('NOT_STARTED');
    const [playAttempts] = useAtom(playAttempAtom);
    const [, clearAttemptLogs] = useAtom(clearAttemptLogsAtom);
    const { mutate: submitGame} = useSubmitGameData(onSubmitGameSuccess, onSubmitGameFailure);
    const { playerId } = usePlayer();
    const roundCount = useGetRoundCount(playerId);
    const pauseGameStatus = useHasPausedGameData(playerId);
    
    const hasMatchedAllCards = playAttempts.filter(x => x.isMatch).length === MAX_CARD_PER_ROW;

    useMemo(() => {
        if (!remainingTries || hasMatchedAllCards) {
            assessGameStatus();
        }
    }, [remainingTries, playAttempts.length]);

    useMemo(() => {
        if (!game) {
            return;
        }

        const remainingTries = calculateRemainingTries(game.maximumTriesAllowed, playAttempts.length);

        setRemainingTries(remainingTries);
    }, [game, playAttempts.length]);

    useMemo(() => {
        if (!game) {
            return;
        }

        if (!playerId) {
            return;
        }

        if (game.maximumTriesAllowed !== playAttempts.length) {
            return;
        }

        submitGame({
            playerId,
            gameId: game.id,
            playAttempts,
            roundStatus: 'COMPLETED'
        });
    }, [playAttempts.length]);

    const requestNewGame = (playerId: string, ignoreCache: boolean = false) => {
        if (game && !ignoreCache) {
            return game;
        }

        setIsLoading(true);
        newGame(playerId);
    };

    const resetGame = () => {
        setGameStatus('NOT_STARTED');
        localStorage.removeItem(ATTEMPTS_KEY);
        clearAttemptLogs();
        setGame(undefined);
    };

    const replayGame = (playerId: string) => {
        setGameStatus('NOT_STARTED');
        clearAttemptLogs();
        setGame(undefined);
        requestNewGame(playerId, true);
    };

    const isMatch = (attempt: IPlayAttempt) =>
        attempt.firstCard && attempt.secondCard && (attempt.firstCard.reveal === attempt.secondCard.reveal) || false;

    const handleCardFlipClick = (card: ICard) => {
        if (currentAttempt?.firstCard && currentAttempt.secondCard) {
            setCurrentAttempt(null);
            return;
        }

        if (!currentAttempt?.firstCard) {
            const attempt = { firstCard: card };
            setCurrentAttempt({ ...attempt });

            return;
        }
        
        const attempt = { ...currentAttempt, secondCard: card };
        
        setCurrentAttempt({ ...attempt });            
        logAttempt({ ...attempt, isMatch: isMatch(attempt)});

        setCurrentAttempt(null);
    };

    const pauseGame = () => {
        if (!playerId) {
            return;
        }

        if (!game) {
            return;
        }

        submitGame({
            playerId,
            gameId: game.id,
            playAttempts,
            roundStatus: 'PAUSED'
        });
    };

    function assessGameStatus() {
        if (hasMatchedAllCards) {
            setGameStatus('SESSION_ENDED_ALL_MATCHED');
            return;
        }

        setGameStatus('SESSION_ENDED_NOT_ALL_MATCHED');
    }

    function onNewGameSuccess(response: any) {
        const game = response.data.data.getNextGame as IGameSession & { playAttempts?: Array<IPlayAttempt> };

        setGame({
            cardRows: game.cardRows,
            id: game.id,
            maximumTriesAllowed: game.maximumTriesAllowed,
            status: game.status
        });

        game.playAttempts && bulkLogAttempt(game.playAttempts)
        
        setGameStatus('IN_PROGRESS');
    }

    function onNewGameFailure() {
    }

    function onSubmitGameSuccess() {
        roundCount.refetch();
        pauseGameStatus.refetch();

    }

    function onSubmitGameFailure() {}

    function onSettled() {
        setIsLoading(false);
    }

    function calculateRemainingTries(maximumTriesAllowed: number, playAttemps: number) {
        const remainingTries = maximumTriesAllowed - playAttemps;

        return remainingTries < 0 ? 0 : remainingTries;
    }

    return {
        gameStatus,
        handleCardFlipClick,
        game,
        isLoading,
        isError,
        pauseGame,
        resetGame,
        replayGame,
        requestNewGame,
        remainingTries,
        playAttemps: playAttempts
    };
    
};