import { Container, Grid, InputLabel, makeStyles, TextField, Typography } from "@material-ui/core";
import { FC, useContext, useEffect, useState } from "react";
import { JobProps, UserPatchProps } from "../interfaces";
import AppContext from "./AppContext";
import Jobs from "./Jobs";
import { Loading } from "./Loading";
import { useFormik } from 'formik'
import * as yup from 'yup';
import Form from "./Form";

const useStyles = makeStyles({
    formLabel: {
        marginBottom: "1rem",
        fontSize: "1.5rem"
    },
    name: {
        fontSize: "1.5rem",
        textAlign: "center",
        fontFamily: "Montserrat"
    },
    container: {
        marginTop: "5rem"
    },
    caption: {
        fontSize: "2rem",
        marginInline: "11%"
    },
    form: {
        margin: "auto",
        marginTop: "2rem",
    }
});
const validationSchema = yup.object({
    email: yup
        .string()
        .label("Enter email")
        .email('Enter a valid email')
        .required()
    ,
    password: yup
        .string()
        .label("Enter password")
        .min(5, "Password should be at least 5 characters")
        .required('Password required')
    ,
    firstName: yup
        .string()
        .label("Enter first name")
        .min(1, "First name should be at least 1 character")
    ,
    lastName: yup
        .string()
        .label("Enter last name")
        .min(1, "Last name should be at least 1 character")
});
const Profile: FC = () => {
    const FORM_INITIAL_STATE: UserPatchProps = { password: "", firstName: "", lastName: "", email: "" }
    const { patchUser, user } = useContext(AppContext);
    const [jobs, setJobs] = useState<JobProps[]>([])
    const classes = useStyles();
    const formik = useFormik({
        initialValues: FORM_INITIAL_STATE,
        validationSchema: validationSchema,
        onSubmit: (values) => patchUser(values)
    });

    useEffect(() => { if (user) setJobs(user.jobs) }, [user]);

    if(!user) return <Loading />
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={3}
            >
                <Grid item xs={12} className={classes.name}>
                    <Typography variant="caption" className={classes.caption}>Username</Typography>
                        <Typography className={classes.name} variant="h5">{user.username}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.name}>
                    <Typography variant="caption" className={classes.caption}>Name</Typography>
                        <Typography className={classes.name} variant="h5">{`${user.firstName} ${user.lastName}`}</Typography>
                </Grid>
                <Grid item xs={3} className={classes.form}>
                    <Form password firstName lastName email buttonText="Edit User" mode="patch" onSubmit={patchUser} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" className={classes.caption}>Jobs you've applied to </Typography>
                    {jobs && <Jobs jobs={jobs} />}
                </Grid>
            </Grid>
        </Container>
    );
}

export default Profile;