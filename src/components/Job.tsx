import React, { FC, useContext, useState } from 'react';
import { JobProps } from '../interfaces';
import AppContext from './AppContext';
import { Avatar, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, makeStyles, Typography } from "@material-ui/core"
import { Link } from 'react-router-dom';
import { IMG_NOT_FOUND, NO_USER_MSG } from '../constants';
import { useAlert } from '../hooks';
import Popover from './Popover';
import { CardSubtitle } from 'reactstrap';

const coolImages = require("cool-images");
const useStyles = makeStyles({
    card: {
        width: 250, 
        height: 450,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    cardContent: {
        padding: "1rem"
    },
    cardAcionArea: {
        height: "82%"
    },
    companyChipContainer: {
        marginTop: "1rem",
        marginBottom: "1rem",
    },
    border: {
        borderRight: "solid 0.01rem",
        height: "1rem"
    }
});
const Job: FC<JobProps> = ({title, salary, equity, id, companyName, companyHandle,img = coolImages.one(150, 250, false)}) => {
    const [applied, setIsApplied] = useState(false);
    const { applyToJob, isApplied, user } = useContext(AppContext);
    const classes = useStyles();
    const alert = useAlert(NO_USER_MSG, "info");

    const applyButton = <button className="btn btn-md btn-outline-dark" onClick={() => applyToJob(id, setIsApplied)}>Apply</button>;
    const appliedP = <Typography variant="caption" display="inline">Applied</Typography>;

    return (
        <Card className={classes.card} onClick={() => !user && alert()}>
            <Link to={`/jobs/${id}`} component={CardActionArea} className={`${classes.cardAcionArea} ${!user ? 'btn disabled' : ''}`}>
                <CardMedia 
                    component="img"
                    alt={`${title} photo`}
                    height={150}
                    width={250}
                    image={img}
                    title="Company photo" 
                    onError={(e: any)=>{
                        e.target.onerror = null; 
                        e.target.src = IMG_NOT_FOUND;
                    }}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>{title}</Typography>
                    {   (companyHandle && companyName) &&
                <CardSubtitle>
                    <div className={classes.companyChipContainer}>
                        <Link to={`/companies/${companyHandle}`} style={{textDecoration: "none"}}>
                            <Chip variant="outlined" size="small" avatar={<Avatar src={img} />} label={companyName} clickable/>
                        </Link>
                    </div>
                </CardSubtitle>
            }
                    <Typography variant="subtitle1" >Salary</Typography>
                        <Typography variant="caption">{salary || "N/A"}</Typography>
                    <Typography variant="subtitle1" >Equity</Typography>
                        <Typography variant="caption">{equity || "N/A"}</Typography>
                </CardContent>
            </Link>
            <CardActions className={!user ? `btn disabled` : ``} style={{justifyContent: "center"}}>
                <div style={{display: "contents"}} >
                        <Popover pathName="jobs" handle={`${id}`} />
                    <div className={user ? classes.border : ""}>
                    </div>
                    {
                        user &&
                        <div className="mx-3">
                            {isApplied(id, setIsApplied) || applied ? appliedP : applyButton}
                        </div>
                    }
                </div>
            </CardActions>
        </Card>
    );
}

export default Job;