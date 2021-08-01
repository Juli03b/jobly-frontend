import React, { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserCreateProps } from "../interfaces";
import AppContext from "./AppContext";

const SignUp: FC = () => {
    const { signUp } = useContext(AppContext);
    const INITIAL_STATE: UserCreateProps = {username: "", password: "", firstName: "", lastName: "", email: ""}
    const [formData, setFormData] = useState(INITIAL_STATE);
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]: value}));
    }
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signUp(formData);
    }
    
    return (
        <form onSubmit={onSubmit} className="row m-5">
            <div className="col-6 mx-auto">
                <input type="text" name="username" value={formData.username} onChange={inputChange} placeholder="Enter username" className="form-control input-group mb-3 mx-auto"/>
                <input type="password" name="password" value={formData.password} onChange={inputChange} placeholder="Enter password" className="form-control input-group mb-3 mx-auto"/>
                <input type="text" name="firstName" value={formData.firstName} onChange={inputChange} placeholder="Enter first name" className="form-control input-group mb-3 mx-auto"/>
                <input type="text" name="lastName" value={formData.lastName} onChange={inputChange} placeholder="Enter last name" className="form-control input-group mb-3 mx-auto"/>
                <input type="text" name="email" value={formData.email} onChange={inputChange} placeholder="Enter email" className="form-control input-group mb-3 mx-auto"/>
                <p className="text-muted">Or sign in <Link to="/sign-in">here</Link></p>
            </div>
            <div className="">
                <button type="submit" className="btn btn-md btn-outline-dark mb-3 mx-auto d-block">Sign Up</button>
            </div>
        </form> )
}

export default SignUp;