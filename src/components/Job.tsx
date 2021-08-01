import { FC, useContext, useState } from 'react';
import { JobProps, UserProps } from '../interfaces';
import { Card, CardBody, CardFooter, CardText, CardTitle } from 'reactstrap';
import AppContext from './AppContext';

const Job: FC<JobProps> = ({title, description, salary, equity, id}: JobProps) => {
    const [applied, setIsApplied] = useState(false);
    const { applyToJob, isApplied, user } = useContext(AppContext);
    const applyButton = <button className="btn btn-md btn-primary" onClick={() => applyToJob(id, setIsApplied)}>Apply</button>;
    const appliedP = <p className="fs-5">Applied</p>;
    // console.log(user, "UISER JOB")
    return (
        <Card className="m-3">
            <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardText>{description}</CardText>
                <CardText><p className="text-muted">Salary</p>{salary || "N/A"}</CardText>
                <CardText><p className="text-muted">Equity</p>{equity || "N/A"}</CardText>
                {
                    user &&
                    <CardFooter>
                        {isApplied(id, setIsApplied) || applied ? appliedP : applyButton}
                    </CardFooter>
                }
            </CardBody>
        </Card>
    );
}

export default Job;