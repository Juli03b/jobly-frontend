import Nav from "./Nav";
import Routes from '../Routes';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserPatchedProps, UserPatchProps, UserProps, UserTokenProps } from '../interfaces';
import JoblyApi from "../api";
import jwt_decode from "jwt-decode";
import AppContext from "./AppContext";
import { Container, ThemeProvider, createTheme, colors, makeStyles } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Source Sans Pro',
      'Montserrat',
    ].join(','),
    caption: {
      color: colors.grey[600],
      fontSize: "1rem"
    }
  }
});

const useStyles = makeStyles({
  warning: {
    backgroundColor: colors.yellow[500],
  },
  info: {
    background: colors.blue[900]
  }
});

const App: FC = () => {
  const history = useHistory();
  const [token, setTokenState] = useState<string | undefined>(JoblyApi.token || undefined);
  const [userToken, setUserToken] = useState<UserTokenProps | undefined>(token ? jwt_decode<UserTokenProps>(token) : undefined);
  const [user, setUser] = useState<UserProps | undefined>();
  const classes = useStyles(); 

  // Function to set token both in React state, and jobly API
  const setToken = (token: string | undefined) => {
    setTokenState(token);
    JoblyApi.token = token;
  }

  // Get user info if token is available
  useEffect(() => {
    setUserToken(token ? jwt_decode<UserTokenProps>(token) : undefined);
    const getAndSetUser = async (tokenUser: UserTokenProps) => {
      const { user }: { user: UserProps} = await JoblyApi.getUser(tokenUser.username);
      setUser(user);
    };

    if (token) getAndSetUser(jwt_decode(token));
  }, [token]);

  // Sign out - set user state and token state to undefined,
  // remove token from local storage, then direct to home page
  const signOut = (): void => {
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem("token");
    history.push("/");
  }

  // Sign up - use api to create user with form data,
  // api retrieves token, which is stored in react state and local storage

  const signUp = async (formData: UserProps, setError: (msg: string, property?: any) => void): Promise<void> => {
    try {
      const { token }: {token: string} = await JoblyApi.signUp(formData);
      setLocalStorageToken(token);
      setToken(token);
      history.push("/");
    } catch ([msg]) {
      if(!msg.includes("instance.")) return setError(msg);

      const fullErrorSplit: [string] = msg.split(" ");
      const [errorInstance]: [errorInstance: string] = fullErrorSplit;

      const errorPropery = errorInstance.substr(errorInstance.indexOf(".") + 1);
      const errorMsg = fullErrorSplit.slice(1).join(" ")

      setError(`${errorPropery} ${errorMsg}`, errorPropery)
    }
  }

  // Sign in - use api to retrieve user token,
  // set token state, and set token in LocalStorage

  const signIn = async (formData: UserProps, setError: (msg: string) => void): Promise<void> => {
    try {
      const {token}: {token: string} = await JoblyApi.signIn(formData);
      
      setLocalStorageToken(token);
      setToken(token);
      history.push("/");
    } catch ([msg]) {
      setError(msg);
    }
  }

  // Patch user - change user's information,
  // api retrieves new user's info
  const patchUser = async (formData: UserPatchProps, setError: (msg: string) => void, setSuccess: () => void): Promise<void> => {
    if(!user) return;
    try{
      const { user: patchedUser }: { user: UserPatchedProps } = await JoblyApi.patchUser(user.username, formData);
      const fullUser: UserProps = {
        username: patchedUser.username,
        firstName: patchedUser.firstName,
        lastName: patchedUser.lastName,
        email: patchedUser.email,
        isAdmin: patchedUser.isAdmin,
        jobs: user.jobs,
        applications: user.applications
      }
      setUser(fullUser);
      setSuccess()
    }catch([msg]){
      setError(msg);
    }
  }

  // Apply to job - user applies to job using API
  const applyToJob = async (id: number, setState: Function): Promise<void> => {
    if(!user) return;
    const job = await JoblyApi.applyToJob(user.username, id);
    if(job?.applied) setState(true);
  }

  // Is applied? - check if user has applied to job
  const isApplied = (id: number): boolean => {
    if(user?.applications && user.applications.includes(id)){
        return true;
    }else{
        return false;
    }
  }

  return (
    <AppContext.Provider value={{user, signIn, signUp, patchUser, applyToJob, isApplied, userToken}}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider 
          classes={{
            variantWarning: classes.warning,
            variantInfo: classes.info,
          }}
          maxSnack={1}
        >
          <Nav signOut={signOut} username={userToken?.username}/>
          <Container maxWidth="xl">
            <Routes />
          </Container>
        </SnackbarProvider>
      </ThemeProvider>
    </AppContext.Provider>
    );
}

const setLocalStorageToken = (token: string): void => localStorage.setItem("token", JSON.stringify(token));

export default App;