import { atom } from "jotai";
import { IPlayAttempt } from "../../../@types/attempt";
import { ATTEMPTS_KEY } from "../../utils/constants";

export const playAttempAtom = atom<Array<IPlayAttempt>>([]);

export const movesCountAtom = atom(get => countMoves(get(playAttempAtom)));

export const allowedMovesCountAtom = atom(get => countAllowedMoves(get(playAttempAtom)));

export const accuracyAtom = atom(get => calculateAccuracy(get(playAttempAtom)));

export const logAttemptAtom = atom(
    null,
    (get, set, attempt: IPlayAttempt) => set(playAttempAtom, logAttempt(get(playAttempAtom), attempt))
);

export const bulkLogAttemptAtom = atom(
    null,
    (_, set, attempts: Array<IPlayAttempt>) => set(playAttempAtom, attempts)
);

export const clearAttemptLogsAtom = atom(
    null,
    (_, set) => set(playAttempAtom, clearLogs())
);

export const initAttemptsAtom = atom(
    null,
    (_, set) => set(playAttempAtom, initAttempts())
);

function initAttempts() {
    const storedAttemps = localStorage.getItem(ATTEMPTS_KEY);

    if (!storedAttemps) {
        return [];
    }

    return JSON.parse(storedAttemps) as Array<IPlayAttempt>;
}

function persistToLocalStorage(attempts: Array<IPlayAttempt>) {
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));

}

function logAttempt(attemptLogs: Array<IPlayAttempt>, attempt: IPlayAttempt) {
    const logs = [...attemptLogs, attempt];

    persistToLocalStorage(logs);
    
    return logs;
}

function bulkLogAttempt(attempts: Array<IPlayAttempt>) {
    const logs = [...attempts ];

    persistToLocalStorage(logs);
    
    return logs;
}

function countMoves(attemptLogs: Array<IPlayAttempt>) {
    return attemptLogs.length;
}

function countAllowedMoves(attemptLogs: Array<IPlayAttempt>) {
    return attemptLogs.filter(x => x.isMatch).length;
}

function calculateAccuracy(attemptLogs: Array<IPlayAttempt>) {
    const totalPlayed = attemptLogs.length;
    const totalMatched = attemptLogs.filter(x => x.isMatch).length;

    if (!totalPlayed) {
        return 0;
    }

    return totalMatched / totalPlayed * 100;
}

function clearLogs() {
    return [];
}