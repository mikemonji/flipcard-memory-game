import { useMutation } from 'react-query';
import axios from '../../utils/axios';
import { IPlayAttempt } from '../../../@types/attempt';

type SubmitGameInputType = {
    playerId: string,
    roundStatus: string,
    playAttempts: Array<IPlayAttempt>,
    gameId: string
}

export const useSubmitGameData = (
    onSuccess?: (data: any) => void, 
    onError?: (error: any) => void,
    onSettled?: () => void,
) => {

    const submitGame = (input: SubmitGameInputType) => axios.post('/', {
        query: `
            mutation SubmitGame($input: SubmitGameInput!) {
                submitGame(input: $input)
            }
        `,
        variables: {
            input
        }
    });

    return useMutation(submitGame, {
        onSuccess,
        onError,
        onSettled,
    });
    
};
