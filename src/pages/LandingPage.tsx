import { Button, Grid, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { useHistory } from "react-router-dom";
import { useHasPausedGameData } from "../features/game/hooks/useHasPausedGameData";
import { usePlayer } from "../features/game/hooks/usePlayer";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const LandingPage = () => {

    const history = useHistory();
    const {playerId} = usePlayer();
    const { data: hasPausedGame } = useHasPausedGameData(playerId);
    
    const handleStartGameClick = () => {
        history.replace('/play');
    };

    return (
        <Grid container direction='column' alignContent='center' justifyContent='center' spacing={1}>

            <Grid item>
                <Typography variant="h5">
                    Flip card memory game
                </Typography>
            </Grid>
            <Grid item>
                <Button variant="outlined" fullWidth onClick={handleStartGameClick}>
                    <PlayArrowIcon />
                    {
                        hasPausedGame ?
                            'Resume game'
                            :
                            'Start the game'
                    }                    
                </Button>
            </Grid>

        </Grid>
    );
};

export default memo(LandingPage);