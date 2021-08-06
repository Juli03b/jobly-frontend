import "../Nav.css"
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav as BSNav, Navbar, NavItem, NavbarBrand, NavbarToggler, Collapse } from "reactstrap";
import { colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useAlert } from "../hooks";
import { NO_USER_MSG } from '../constants';
import { Brand } from "./Brand";

const useStyles = makeStyles({
    navLinks: {
        color: colors.grey[500]
    },
    navbarBrand: {
        fontWeight: 400,
        color: colors.blue[600]
    }
});

const Nav: FC<{signOut: Function, username: string | undefined}> = ({signOut, username}) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const alert = useAlert(NO_USER_MSG, "info");

    const toggleNavBar = () => setIsOpen(isOpen => !isOpen);
    const linkClassNames =`nav-link me-4 ${classes.navLinks} ${!username ? "btn disabled" : ""}`

    return (
        <div>
            <Navbar light color="light" expand="lg" className="border border-top-0 border-start-0 border-end-0 border-dark border-bottom-5" style={{fontSize:"1.1rem"}}>
                <NavbarBrand href="/"><Brand size="small" /></NavbarBrand>
                <NavbarToggler onClick={toggleNavBar} />
                    <Collapse isOpen={isOpen} navbar>
                        <BSNav className="justify-content-end" style={{width: "100%"}} navbar>
                            <NavItem onClick={() => !username && alert()}>
                                <NavLink className={linkClassNames} to="/companies">Companies</NavLink>
                            </NavItem>
                            <NavItem onClick={() => !username && alert()}>
                                <NavLink className={linkClassNames} to="/jobs">Jobs</NavLink>
                            </NavItem >
                            {
                                username ?
                                <>
                                    <NavItem>
                                        <NavLink exact className="nav-link me-4" activeClassName="active" to="/profile">{username}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <a className="nav-link me-4" href="/" onClick={() => signOut()}>Sign Out</a>
                                    </NavItem>
                                </>
                                :
                                <>
                                    <NavItem>
                                        <NavLink exact className="nav-link me-4" activeClassName="active" to="/sign-in">Sign In</NavLink>
                                    </NavItem>                         
                                    <NavItem>
                                        <NavLink exact className="nav-link me-4" activeClassName="active" to="/sign-up">Sign Up</NavLink>
                                    </NavItem>
                                </>                     
                            }
                            
                        </BSNav>
                    </Collapse>
            </Navbar>
        </div>
);
    }

export default Nav;