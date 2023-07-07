import { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const PLAYER_KEY = 'PLAYER_ID';

export const usePlayer = () => {
    const [playerId, setPlayerId] = useState<string | undefined>();

    const generateUID = () => {
        return uuidv4();
    }

    useMemo(() => {
        if (!playerId) {
            const cachedId = localStorage.getItem(PLAYER_KEY);

            if (cachedId) {
                setPlayerId(cachedId);

                return;
            }
            
            const id = generateUID();

            localStorage.setItem(PLAYER_KEY, id);
            setPlayerId(id);
        }
    }, []);

    return {
        playerId
    }
};