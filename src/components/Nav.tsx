import "../Nav.css"
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav as BSNav, Navbar, NavItem, NavbarBrand, NavbarToggler, Collapse } from "reactstrap";

const Nav: FC<{signOut: Function, username: string | undefined}> = ({signOut, username}: {signOut: Function, username: string | undefined}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggleNavBar = () => setIsOpen(isOpen => !isOpen);

    return (
        <div>
            <Navbar dark color="dark" expand="lg">
                <NavbarBrand href="/" className="mx-3 text-center" style={{textAlignLast: "end"}}>Jobly</NavbarBrand>
                <NavbarToggler onClick={toggleNavBar} className="" />
                    <Collapse isOpen={isOpen} navbar>
                        <BSNav className="justify-content-end" style={{width: "100%"}} navbar>
                            <NavItem>
                                <NavLink exact className="nav-link me-4" activeClassName="active" to="/companies">Companies</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink exact className="nav-link me-4" activeClassName="active" to="/jobs">Jobs</NavLink>
                            </NavItem>
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