import { Container, Typography } from "@material-ui/core";
import { FC, useContext } from "react";
import AppContext from "./AppContext";
import Form from "./Form";

// Component to show form for signing in
const SignIn: FC = () => {
    const { signIn } = useContext(AppContext);

    return (
        <Container maxWidth="md" style={{marginTop: "20%"}}>
            <Form username password buttonText="Sign in" mode="signIn" onSubmit={signIn} />            
        </Container>);
}

export default SignIn;