import { Container, Grid } from "@mui/material";
import { memo, useMemo } from "react";

import { CardList, Legend } from "../features/game";
import ActionBar from "../features/game/components/ActionBar";
import { useGame } from "../features/game/hooks/useGame";
import RemainingTries from "../features/game/components/RemainingTries";
import { useHistory } from "react-router-dom";
import ActivityIndicator from "../features/common/ActivityIndicator";
import ErrorView from "../features/common/ErrorView";
import { usePlayer } from "../features/game/hooks/usePlayer";

const GamePage = () => {
    const history = useHistory();
    const { 
        handleCardFlipClick,
        game, 
        isLoading, 
        isError, 
        resetGame, 
        replayGame,
        pauseGame,
        requestNewGame ,
        remainingTries,
        playAttemps,
        gameStatus
    } = useGame();
    const { playerId } = usePlayer();

    useMemo(() => {
        if (!playerId) {
            return;
        }
        
        requestNewGame(playerId);
    }, [playerId]);

    const handleInterruptSessionClick = async () => {
        if (gameStatus === 'IN_PROGRESS') {
            pauseGame();
        }

        resetGame();
        history.replace('/');
    };

    const handleResetClick = () => {
        if (!playerId) {
            return;
        }

        replayGame(playerId);
    };

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (isError) {
        return <ErrorView message="Something went wrong" />
    }

    if (!game) {
        return <ErrorView message="No games were found" />
    }

    return (
        <Container>

            <Grid 
                direction='column'
                container 
                justifyContent='center' 
                alignItems='center'>
                    
                    <RemainingTries countdown={remainingTries} />

                    <CardList 
                        attempts={playAttemps}
                        cardRows={game?.cardRows} 
                        disabled={gameStatus !== 'IN_PROGRESS' || !remainingTries}
                        gameStatus={gameStatus}
                        onCardFlipped={handleCardFlipClick} />
                    
                    <Grid item container direction='row'>
                        
                        <Grid item xs={12} md={6}>
                            <Legend />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <ActionBar 
                                gameStatus={gameStatus}
                                onSessionInterrupted={handleInterruptSessionClick} 
                                onReset={handleResetClick} />
                        </Grid>

                    </Grid>
            
            </Grid>

        </Container>
    )
};

export default memo(GamePage);