import { Container, makeStyles } from "@material-ui/core";
import { FC, useContext,  } from "react";
import AppContext from "./AppContext";
import Form from "./Form";

const useStyles = makeStyles({
    formLabel: {
        marginBottom: "1rem",
        fontSize: "1.5rem"
    },
    container: {
        marginTop: "12.5rem"
    },
    formTitle: {
        marginBottom: "1rem",
        fontSize: "1.5rem"
    }
});
const SignUp: FC = () => {
    const { signUp } = useContext(AppContext);
    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.container}>
            <Form username password firstName lastName email signUp buttonText="Sign up" mode="signUp" onSubmit={signUp} />
        </Container>);
}

export default SignUp;