import { Grid, Typography } from "@mui/material";
import { memo } from "react";

type Props = {
    message: string
}

const ErrorView = ({ message }: Props) => (
    <Grid 
        container 
        justifyContent='center' 
        alignItems='center'>
        <Typography variant="subtitle2" color='error'>
            {message}
        </Typography>
    </Grid>
);

export default memo(ErrorView);