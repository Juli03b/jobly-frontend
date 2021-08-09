import { TextField, InputLabel, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FC } from "react";
import { useAlert } from "../hooks";
import { useFormik } from "formik";
import * as yup from 'yup';
import { SIGN_IN_INITIAL_STATE, PATCH_INITIAL_STATE, SIGN_UP_INITIAL_STATE } from "../constants";

interface FormProps {
    [index: string]: boolean | undefined | string | Function,
    mode: "signUp" | "signIn" | "patch",
    username?: boolean,
    password?: boolean,
    firstName?: boolean,
    lastName?: boolean,
    email?: boolean,
    buttonText: string,
    onSubmit: Function
}
const email = yup.string().max(60, "Email should be 60 characters or less").email("Invalid email").required("Email is required");
const username = yup.string().max(25, "Username should be 25 characters or less").required("Username is required");
const password = yup.string().min(5, "Password should be at least 5 characters").max(20, "Pasword should be 20 characters or less").required("Password is required");
const firstName = yup.string().max(30, "First name should be 20 characters or less").required("First name is required");
const lastName = yup.string().max(30, "Last name should be 20 characters or less").required("Last name is required");
const firstNamePatch = yup.string().max(30, "First name should be 20 characters or less");
const lastNamePatch = yup.string().max(30, "Last name should be 20 characters or less");
const signInValidationSchema = yup.object({ username, password });
const signUpValidationSchema = yup.object({ username, password, firstName, lastName });
const patchValidationSchema = yup.object({ firstNamePatch, lastNamePatch, password, email });
const useStyles = makeStyles({
    formLabel: {
        marginBottom: "1rem",
        fontSize: "1.5rem"
    },
    container: {
        marginTop: "20%"
    },
    formTitle: {
        marginBottom: "1rem",
        fontSize: "1.5rem"
    }
});
// Component to centralize forms
const Form: FC<FormProps> = (props: FormProps) => {
    let INITIAL_STATE: any = {}
    let validationSchema = {}
    const { username = true, password, firstName, lastName, email, mode, buttonText, onSubmit }: FormProps = props;
    const alert = useAlert();
    const classes = useStyles();
    if (mode === "signIn") {
        INITIAL_STATE = SIGN_IN_INITIAL_STATE;
        validationSchema = signInValidationSchema;
    } else if (mode === "signUp") {
        INITIAL_STATE = SIGN_UP_INITIAL_STATE;
        validationSchema = signUpValidationSchema;
    } else {
        INITIAL_STATE = PATCH_INITIAL_STATE;
        validationSchema = patchValidationSchema;
    }
    const formik = useFormik({
        initialValues: INITIAL_STATE,
        validationSchema: validationSchema,
        onSubmit: (values) => onSubmit(values, (msg: string) => alert(msg, "error"), () => alert("Profile edited", "success"))
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mx-auto">
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    {(mode !== "patch" && username) &&
                        <Grid item xs={12}>
                            <InputLabel htmlFor="username-input" className={classes.formLabel}>Enter Username</InputLabel>
                            <TextField
                                error={formik.touched.username && !!formik.errors.username}
                                value={formik.values.username}
                                helperText={formik.touched.username && formik.errors.username}
                                onChange={formik.handleChange}
                                id="username-input"
                                label="Username"
                                name="username"
                                type="username"
                                variant="outlined"
                                autoFocus
                                fullWidth
                                required
                            />
                        </Grid>
                    }
                    {password &&
                        <Grid item xs={12}>
                            <InputLabel htmlFor="password-input" className={classes.formLabel}>Enter {mode === "patch" && "new"} password</InputLabel>
                            <TextField
                                error={formik.touched.password && !!formik.errors.password}
                                value={formik.values.password}
                                helperText={formik.touched.password && formik.errors.password}
                                onChange={formik.handleChange}
                                id="password-input"
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                            />
                            {mode === "signIn" &&
                                <Typography variant="caption" className="fs-5">Or sign up <Link to="/sign-up">here</Link></Typography>}
                        </Grid>

                    }
                    {email &&
                        <Grid item xs={12}>
                            <InputLabel htmlFor="email-input" className={classes.formLabel}>Enter email</InputLabel>
                            <TextField
                                error={formik.touched.email && !!formik.errors.email}
                                value={formik.values.email}
                                helperText={formik.touched.email && formik.errors.email}
                                onChange={formik.handleChange}
                                id="email-input"
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Grid>
                    }
                    {firstName &&
                        <Grid item xs={12}>
                            <InputLabel htmlFor="first-name-input" className={classes.formLabel}>Enter first name</InputLabel>
                            <TextField
                                error={formik.touched.firstName && !!formik.errors.firstName}
                                value={formik.values.firstName}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                onChange={formik.handleChange}
                                id="first-name-input"
                                label="First Name"
                                name="firstName"
                                type="first-name"
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Grid>
                    }
                    {lastName &&
                        <Grid item xs={12}>
                            <InputLabel htmlFor="last-name-input" className={classes.formLabel}>Enter last name</InputLabel>
                            <TextField
                                error={formik.touched.lastName && !!formik.errors.lastName}
                                value={formik.values.lastName}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                onChange={formik.handleChange}
                                id="last-name-input"
                                label="Last Name"
                                name="lastName"
                                type="last-name"
                                variant="outlined"
                                fullWidth
                                required
                            />
                            {mode !== "patch" &&
                                <Typography variant="caption" className="fs-5">
                                    Or sign {mode === "signUp" ? "in" : "up"} <Link to={mode === "signUp" ? "/sign-in" : "/sign-up"}>here</Link>
                                </Typography>}
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <button type="submit" className="btn btn-md btn-outline-dark mb-3 mx-auto d-block">{buttonText}</button>
                    </Grid>
                </Grid>
            </div>
        </form>
    );
}

export default Form;