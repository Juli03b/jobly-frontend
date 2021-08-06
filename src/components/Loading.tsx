import { CircularProgress, Typography } from "@material-ui/core"

export const Loading = () => {
    return (
        <>
            <CircularProgress style={{width:"25%", height: "-1px", marginTop: "15%", marginLeft: "40%"}} />
            <Typography variant="h1" style={{width:"25%", height: "-1px", marginTop: "15%", marginLeft: "40%"}}>Loading...</Typography>
        </>
    );
}