import { useQuery } from 'react-query';
import axios from '../../utils/axios';

export const useHasPausedGameData = (playerId?: string) => {
    const getHasPauseedGame = () => axios.post('/', {
        query: `
            query Query($input: PlayerIdInput!) {
                hasPausedGame(input: $input)
            }
        `,
        variables: {
            input: {
                playerId
            }
        }
    });

    return useQuery<any, any, boolean>(['HAS_PAUSED_GAME', playerId], getHasPauseedGame, {
        select: response => response?.data?.data?.hasPausedGame,
        enabled: !!playerId
    });
}