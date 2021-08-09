import JoblyApi from '../api';
import { useHistory, useParams } from "react-router-dom";
import { FC, useEffect, useState } from 'react';
import { CompanyProps } from '../interfaces';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import Jobs from './Jobs';
import { Loading } from './Loading';
import { useAlert } from '../hooks';

const useStyles = makeStyles({
    title: {
        fontSize: "4.5rem",
        marginBottom: "1rem"
    },
    label: {
        fontSize: "1.5rem"
    },
    caption: {
        fontSize: "2rem"
    },
    jobsContainer: {
        float: "left",
        marginTop: "1rem"
    },
    body: {
        fontSize: "1.2rem",
    },
    container: {
        margin: "1rem",
        marginTop: "2.5%"
    }
});
// Component to render company with details like:
// name, number of employees, description, and jobs
const CompanyDetail: FC = () => {
    const [company, setCompany] = useState<CompanyProps>();
    const { handle } = useParams<{ handle: string }>();
    const alert = useAlert(undefined, "error");
    const history = useHistory();
    const classes = useStyles();

    useEffect((): void => {
        try {
            const getCompany = async () => {
                const company = await JoblyApi.getCompany(handle);
                setCompany(company);
            }

            getCompany();
        } catch ([msg]) {
            alert(msg);
            history.push("/companies");
        }
    }, []);

    if (!company) return <Loading />
    return (
        <>
            <Container className={classes.container}>
                <div>
                    <Typography variant="h1" className={classes.title}>{company.name}</Typography>
                    <Typography variant="caption" className={classes.caption}>{company.numEmployees || "N/A"} Employees</Typography>
                    <Typography variant="body1" className={classes.body}>{company.description}</Typography>
                </div>
                <Typography variant="caption" className={classes.caption} style={{ marginTop: "1rem" }} component="p">Jobs</Typography>
            </Container>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
            >
                <Grid item xs={12}>
                    <Jobs jobs={company.jobs} />
                </Grid>
            </Grid>
        </>
    );
}

export default CompanyDetail;