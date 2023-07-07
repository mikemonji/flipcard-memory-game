import { CircularProgress, Grid } from "@mui/material";
import { memo } from "react";

const ActivityIndicator = () => (
    <Grid 
        container 
        justifyContent='center' 
        alignItems='center'>
        <CircularProgress />
    </Grid>
);

export default memo(ActivityIndicator);