import React, { FC, useContext, useEffect, useState } from "react";
import { Card, CardBody} from "reactstrap";
import { JobProps, UserPatchProps } from "../interfaces";
import AppContext from "./AppContext";
import Jobs from "./Jobs";

const Profile: FC = () => {
    const INITIAL_STATE: UserPatchProps = {password: "", firstName: "", lastName: "", email: ""}
    const { patchUser, user } = useContext(AppContext);
    const [jobs, setJobs] = useState<JobProps[]>([])
    const [formData, setFormData] = useState(INITIAL_STATE);    
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]: value}));
    }
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patchUser(formData);
    }

    // console.log(user, "user ")
    useEffect(() => {if(user) setJobs(user.jobs)}, [user]);

    return (
        <div className="m-3">
            {
                user?.jobs ?
                <>
                    <Card className="w-25 mx-auto mt-5">
                        <CardBody>
                            <p className="fs-3 text-muted">{user.username}</p>
                            <p className="fs-3">{`${user.firstName} ${user.lastName}`}</p>   
                        </CardBody>
                    </Card>
                    <form onSubmit={onSubmit} className="mt-5">
                    <div className="w-25 mx-auto">
                        <input type="password" name="password" value={formData.password} onChange={inputChange} placeholder="Enter password" className="form-control input-group mb-3 mx-auto"/>
                        <input type="text" name="firstName" value={formData.firstName} onChange={inputChange} placeholder="Enter first name" className="form-control input-group mb-3 mx-auto"/>
                        <input type="text" name="lastName" value={formData.lastName} onChange={inputChange} placeholder="Enter last name" className="form-control input-group mb-3 mx-auto"/>
                        <input type="email" name="email" value={formData.email} onChange={inputChange} placeholder="Enter email" className="form-control input-group mb-3 mx-auto"/>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-md btn-outline-dark mb-3 mx-auto d-block">Update Profile</button>
                    </div>
                    </form>
                    <div className="mt-5">
                        <p className="display-5 mx-3">Jobs you've applied to </p>
                        <Jobs jobs={jobs} />
                    </div>
                </>
                :
                <p>Loading...</p>
            }
        </div>);
}

export default Profile;