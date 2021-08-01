import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import AppContext from './AppContext';

const Welcome: FC = () => {
    const { userToken } = useContext(AppContext);
    const notLoggedInP = (
            <p  className="lead mb-5"><Link to="/sign-in">Sign in</Link> or <Link to="/sign-up">Sign Up</Link> to apply to jobs</p>
    );
    const loggedInP = (
        <>
            <p className="lead mb-5">Welcome back <Link to="/profile">{userToken?.username}</Link></p>
        </>
    )
    return (
        <Container fluid style={{padding: "20rem"}}>
            <h1 className="display-1 text-center mb-3">Jobly</h1>
            <p className="lead text-center mb-3">Find a job you love!</p>
            <div className="lead text-center">
                {userToken ? loggedInP : notLoggedInP}
                <Link to="/jobs"><button className="btn btn-md btn-outline-dark mx-1 mb-1">Jobs</button></Link>
                <Link to="/companies"><button className="btn btn-md btn-outline-dark mx-1 mb-1">Companies</button></Link>
            </div>
        </Container>
    )
}

export default Welcome;