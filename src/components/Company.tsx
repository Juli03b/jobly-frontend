import { FC, useContext, useEffect } from 'react';
import { CompanyProps } from '../interfaces';
import { Card, CardActionArea, CardActions, CardMedia, makeStyles, Typography, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Popover from './Popover';
import { useAlert } from '../hooks';
import AppContext from './AppContext';
import { IMG_NOT_FOUND, NO_USER_MSG } from '../constants';

const coolImages = require("cool-images");
const useStyles = makeStyles({
    card: {
        width: 350, 
        height: 400,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    cardContent: {
        padding: "1rem",
        height: "185px"
    }
});

// Dumb component to render a company
const Company: FC<CompanyProps> = ({name, numEmployees, description, handle, img = coolImages.one(150, 300, false)}) => {
    const { user } = useContext(AppContext);
    const classes = useStyles();
    const alert = useAlert(NO_USER_MSG, "info");

    return (
        <Card className={classes.card} onClick={() => !user && alert()}>
            <Link to={`/companies/${handle}`} component={CardActionArea} className={!user ? `btn disabled` : ``}>
                {console.log(img, name)}
                <CardMedia component="img"
                    alt={`${name} photo`} height={150} width={300}
                    image={img}
                    title="Company photo" 
                    onError={(e: any)=>{e.target.onerror = null; e.target.src = IMG_NOT_FOUND}}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>{name}</Typography>
                    <Typography variant="caption">{numEmployees} Employees</Typography>
                    <Typography variant="body1">{description}</Typography>
                </CardContent>
            </Link>
            <CardActions className={!user ? `btn disabled` : ``}>
                <Popover pathName="companies" handle={handle} />
            </CardActions>
        </Card>

    );
}

export default Company;