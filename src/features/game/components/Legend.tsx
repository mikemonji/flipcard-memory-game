import { Card, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { memo } from "react";
import { movesCountAtom, allowedMovesCountAtom, accuracyAtom } from "../atoms/attempt.atom";
import { useGetRoundCount } from "../hooks/useGetRoundCount";
import { usePlayer } from "../hooks/usePlayer";

const Legend = () => {
    const [moves] = useAtom(movesCountAtom);
    const [allowedMoves] = useAtom(allowedMovesCountAtom);
    const [accuracy] = useAtom(accuracyAtom);
    const { playerId } = usePlayer();
    const roundCount = useGetRoundCount(playerId);

    return (
        <Card sx={{ p: 3, mt: 2 }}>

            <Stack>
                
                <StatItem label="Moves" value={moves} />
                <StatItem label="Allowed moves" value={allowedMoves} />
                <StatItem label="Accuracy" value={`${accuracy.toFixed(2)}%`} />
                <StatItem label="Rounds played" value={roundCount.data || 0} />

            </Stack>

        </Card>
    );
};

type StatProps = {
    label: string;
    value: number | string;
}

const StatItem = ({ label, value }: StatProps) => (
    <Stack>
        <Typography variant="subtitle2">
            {label}: <strong>{value}</strong>
        </Typography>
    </Stack>
);

export default memo(Legend);