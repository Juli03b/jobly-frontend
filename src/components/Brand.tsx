import { makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';

const useStyles = makeStyles(({
    brand: {
        textDecorationThickness: "from-font",
        fontWeight: 300
    }
}));
// Dumb component to render brand 
export const Brand: FC<{size: "small" | "large"}> = ({size}) => {
    const classes = useStyles();

    return (
        <Typography 
            variant="h1"
            className={classes.brand} 
            style={{
                fontSize: size === "small" ? "2rem" : "6rem",
                marginLeft: size === "small" ? "1rem" : ""
            }} 
        >
            Jobly
        </Typography>
    );
}