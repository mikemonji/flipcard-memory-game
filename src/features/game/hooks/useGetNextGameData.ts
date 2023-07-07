import { useMutation } from 'react-query';
import axios from '../../utils/axios';

export const useGetNextGameData = (
    onSuccess: (data: any) => void, 
    onError: (error: any) => void,
    onSettled: () => void,
) => {

    const getNextGame = (playerId: string) => axios.post('/', {
        query: `
            mutation GetNextGame($input: PlayerIdInput!) {
                getNextGame(input: $input) {
                id
                playerId
                maximumTriesAllowed
                isCompleted
                cardRows {
                    rowIndex
                    cards {
                    id
                    reveal
                    match
                    }
                }
                playAttempts {
                    firstCard {
                    id
                    reveal
                    match
                    }
                    secondCard {
                    id
                    reveal
                    match
                    }
                    isMatch
                }
                }
            }
        `,
        variables: {
            input: {
                playerId
            }
        }
    });

    return useMutation(getNextGame, {
        onSuccess,
        onError,
        onSettled,
    });
    
};
