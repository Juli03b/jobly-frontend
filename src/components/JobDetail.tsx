import JoblyApi from '../api';
import { useHistory, useParams } from "react-router-dom";
import { FC, useEffect, useState } from 'react';
import { JobProps } from '../interfaces';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { Loading } from './Loading';
import Company from './Company';
import { useAlert } from '../hooks';

const useStyles = makeStyles({
    title: {
        fontSize: "4.5rem",
        marginBottom: "1rem"
    },
    label: {
        fontSize: "1.5rem",
    },
    caption: {
        fontSize: "2rem"
    },
    jobsContainer: {
        float: "left",
        margin: "1.5rem"
    },
    container: {
        margin: "1rem",
        marginTop: "2.5%"
    }
});
// Component to render job with details like:
// title, salary, equity, and company
const JobDetail: FC = () => {
    const [job, setJob] = useState<JobProps>();
    const { handle } = useParams<{ handle: string }>();
    const alert = useAlert(undefined, "error");
    const history = useHistory();
    const classes = useStyles();

    useEffect((): void => {
        try {
            const getJob = async () => {
                const job = await JoblyApi.getJob(handle);
                setJob(job)
            }

            getJob();
        } catch ([msg]) {
            alert(msg);
            history.push("/jobs");
        }

    }, [handle]);

    if (!job) return <Loading />
    return (
        <Container className={classes.container}>
            <div>
                <Typography variant="h1" className={classes.title} >{job.title}</Typography>
                <Typography variant="caption" className={classes.label}>Salary</Typography>
                    <Typography variant="subtitle1" className={classes.caption}>{job.salary || "N/A"}</Typography>
                <Typography variant="caption" className={classes.label}>Equity</Typography>
                    <Typography variant="subtitle1" className={classes.caption}>{job.equity || "N/A"}</Typography>
            </div>
            <div style={{ marginTop: "1rem" }}>
                <Typography
                    variant="caption"
                    className={classes.caption}
                    style={{ marginTop: "1rem" }}
                    component="p"
                >Company</Typography>
                <div className={classes.jobsContainer}>
                    {job.company &&
                        <Company
                            handle={job.company.handle}
                            name={job.company?.name}
                            numEmployees={job.company?.numEmployees}
                            description={job.company?.description}
                            img={job.company?.img}
                            jobs={job.company?.jobs}
                        />
                    }
                </div>
            </div>
        </Container>
    );
}

export default JobDetail;