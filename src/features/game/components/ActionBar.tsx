import { Button, Stack } from "@mui/material";
import { memo } from "react";
import PauseIcon from '@mui/icons-material/Pause';
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';

import { IGameSessionStatus } from "../../../@types/game";

type Props = {
    gameStatus: IGameSessionStatus,
    onReset?: () => void,
    onSessionInterrupted?: () => void,
}

const ActionBar = ({ gameStatus, onSessionInterrupted, onReset }: Props) => (
    <Stack spacing={1} sx={{ m: 2 }}>

        <Stack>
            <Button variant="contained" onClick={onReset} disabled={!['SESSION_ENDED_NOT_ALL_MATCHED', 'SESSION_ENDED_ALL_MATCHED'].includes(gameStatus)}>
                <ReplayIcon />
                Replay
            </Button>
        </Stack>
        
        <Stack>
            <Button variant="contained" color="error" onClick={onSessionInterrupted} disabled={['NOT_STARTED'].includes(gameStatus)}>
                { gameStatus === 'IN_PROGRESS' && <PauseIcon /> }
                { gameStatus !== 'IN_PROGRESS' && <HomeIcon /> }
                { gameStatus === 'IN_PROGRESS' && 'Pause Game' }
                { gameStatus !== 'IN_PROGRESS' && 'Return to Landing Page' }
            </Button>
        </Stack>

    </Stack>
);

export default memo(ActionBar);