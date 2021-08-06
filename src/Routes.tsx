import { FC, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Welcome from "./components/Welcome";
import JobsList from "./components/JobList";
import CompanyList from "./components/CompanyList";
import CompanyDetail from "./components/CompanyDetail";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import AppContext from "./components/AppContext";
import JobDetail from "./components/JobDetail";

const Routes: FC = () => {
    const {userToken, user} = useContext(AppContext);
    return(
    <Switch>
        <Route exact path="/">
            <Welcome />
        </Route>
        <Route exact path="/profile">
        {
                user ? 
                <Profile />
                :
                <Redirect to="/" />
            }
        </Route>
        <Route exact path="/companies">
            {
                userToken ? 
                <CompanyList searchBar={true} />
                :
                <Redirect to="/" />
            }
        </Route>
        <Route exact path="/jobs">
            {
                userToken ? 
                <JobsList searchBar={true} />
                :
                <Redirect to="/" />
            }
        </Route>
        <Route exact path="/sign-in">
            <SignIn />
        </Route>
        <Route exact path="/sign-up">
            <SignUp />
        </Route>
        <Route exact path="/jobs/:handle">
            {
                userToken ? 
                <JobDetail />
                :
                <Redirect to="/" />
            }
        </Route>
        <Route exact path="/companies/:handle">
            {
                userToken ? 
                <CompanyDetail />
                :
                <Redirect to="/" />
            }
        </Route>
        <Route>
            <div>
                <p>404!!</p>
            </div>
        </Route>
    </Switch>
)};

export default Routes;