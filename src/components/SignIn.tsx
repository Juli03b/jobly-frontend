import React, { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserSignInProps } from "../interfaces";
import AppContext from "./AppContext";

const SignIn: FC = () => {
    const { signIn } = useContext(AppContext);
    const INITIAL_STATE: UserSignInProps = {username: "", password: ""}
    const [formData, setFormData] = useState(INITIAL_STATE);
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]: value}));
    }
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signIn(formData);
    }

    return (
        <form onSubmit={onSubmit} className="row m-5">
            <div className="col-6 mx-auto">
                <input type="text" name="username" value={formData.username} onChange={inputChange} placeholder="Enter username" className="form-control input-group mb-3 mx-auto"/>
                <input type="password" name="password" value={formData.password} onChange={inputChange} placeholder="Enter password" className="form-control input-group mb-3 mx-auto"/>
                <p className="text-muted">Or sign up <Link to="/sign-up">here</Link></p>
            </div>
            <div className="">
                <button type="submit" className="btn btn-md btn-outline-dark mb-3 mx-auto d-block">Sign In</button>
            </div>
        </form> );
}

export default SignIn;