import { CircularProgress, Typography } from "@material-ui/core"

// Dumb component to show loading gif
export const Loading = () => (
        <>
            <CircularProgress style={{width:"25%", height: "-1px", marginTop: "15%", marginLeft: "40%"}} />
            <Typography variant="h1" style={{width:"25%", height: "-1px", marginTop: "15%", marginLeft: "40%"}}>Loading...</Typography>
        </>
);