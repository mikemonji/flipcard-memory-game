import { useQuery } from 'react-query';
import axios from '../../utils/axios';

export const useGetRoundCount = (playerId?: string) => {
    const getCount = () => axios.post('/', {
        query: `
            query Query($input: PlayerIdInput!) {
                getPlayerRoundCount(input: $input)
            }
        `,
        variables: {
            input: {
                playerId
            }
        }
    });

    return useQuery<any, any, number>(['GET_ROUND_COUNT', playerId], getCount, {
        select: response => response?.data?.data.getPlayerRoundCount,
        enabled: !!playerId
    })
};
