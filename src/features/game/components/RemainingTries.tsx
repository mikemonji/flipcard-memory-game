import { Stack, Typography } from "@mui/material";
import { memo } from "react";

type Props = {
    countdown: number;
};

const RemainingTries = ({ countdown }: Props) => (
    <Stack>
        <Typography variant="subtitle1">
            Remaining tr{ countdown > 1 ? 'ies' : 'y'} {countdown}
        </Typography>
    </Stack>
);

export default memo(RemainingTries);