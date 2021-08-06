import JoblyApi from '../api';
import { Link, useParams } from "react-router-dom";
import { FC, useEffect, useState } from 'react';
import { CompanyProps, JobProps } from '../interfaces';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { Loading } from './Loading';
import Company from './Company';

const useStyles = makeStyles({
    title: {
        fontSize: "5rem",
        marginBottom: "1rem"
    },
    label: {
        fontSize: "1.5rem",
        textDecoration: "underline"
    },
    caption: {
        fontSize: "2rem"
    },
    jobsContainer: {
        float: "left",
        marginTop: "1rem"
    }
});
const coolImages = require("cool-images");
// Component to render company
const JobDetail: FC = () => {
    const [job, setJob] = useState<JobProps>()
    const { handle } = useParams<{ handle: string }>();
    const classes = useStyles();

    useEffect((): void => {
        const getJob = async () => {
            const job = await JoblyApi.getJob(handle);
            console.log(job)
            setJob(job)
        }
        getJob();
    }, [handle]);

    return (
            job ? 
                <Container className="m-3">
                    <div>
                        <Typography variant="h1" className={classes.title}>{job.title}</Typography>
                        <Typography className={classes.label}>Salary</Typography>
                            <Typography variant="caption" className={classes.caption}>{job.salary || "N/A"}</Typography>
                        <Typography className={classes.label}>Equity</Typography>
                            <Typography variant="caption" className={classes.caption}>{job.equity || "N/A"}</Typography>
                    </div>
                    <div style={{marginTop: "1rem"}}>
                        <Typography variant="caption" className={classes.caption} style={{marginTop: "1rem"}} component="p">Company:</Typography>
                        <div className={classes.jobsContainer}>
                            {
                                job.company && (({handle, name, numEmployees, description, img, jobs}: CompanyProps) => (
                                    <Company handle={handle} name={name} numEmployees={numEmployees} description={description} img={img} jobs={jobs} />
                                ))(job.company)
                            }
                        </div>
                    </div>
                </Container>
            :
                <Loading /> 
    );
}

export default JobDetail;