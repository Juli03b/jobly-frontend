import JoblyApi from '../api';
import { useParams } from "react-router-dom";
import { FC, useEffect, useState } from 'react';
import { CompanyProps, JobProps } from '../interfaces';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import Company from './Company';
import Job from './Job';
import Jobs from './Jobs';
import { Loading } from './Loading';

const useStyles = makeStyles({
    title: {
        fontSize: "5rem",
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
    }
});
// Component to render company
const CompanyDetail: FC = () => {
    const [company, setCompany] = useState<CompanyProps>()
    const { handle } = useParams<{ handle: string }>();
    const classes = useStyles();

    useEffect((): void => {
        const getCompany = async () => {
            const company = await JoblyApi.getCompany(handle);
            setCompany(company);
        }
        getCompany();
    }, []);

    return (
        company ? 
        <>
            <Container className="m-3">
                <div>
                    <Typography variant="h1" className={classes.title}>{company.name}</Typography>
                    <Typography variant="caption" className={classes.caption}>{company.numEmployees || "N/A"} Employees</Typography>
                    <Typography variant="body1" className={classes.body}>{company.description}</Typography>
                </div>
                    <Typography variant="caption" className={classes.caption} style={{marginTop: "1rem"}} component="p">Jobs:</Typography>
            </Container>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
            >
                <Grid item xs={12}>
                   <Jobs jobs={company.jobs} xsVal={2} />
                </Grid>
            </Grid>
        </>
        
    :
        <Loading /> 
    );
}

export default CompanyDetail;