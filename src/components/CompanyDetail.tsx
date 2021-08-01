import JoblyApi from '../api';
import { useParams } from "react-router-dom";
import { FC, useEffect, useState } from 'react';
import { CompanyProps } from '../interfaces';
import Jobs from './Jobs';

// Component to render company
const CompanyDetail: FC = () => {
    const [company, setCompany] = useState<CompanyProps>()
    const { handle } = useParams<{ handle: string }>();

    useEffect((): void => {
        const getCompany = async () => {
            const company = await JoblyApi.getCompany(handle);
            setCompany(company);
        }
        getCompany();
    }, []);
    
    return (
            company ? 
            <div className="m-3">
                <h1 className="display-3">{company.name}</h1>
                <small className="text-muted">{company.numEmployees} Employees</small>
                <p>{company.description}</p>
                <Jobs jobs={company.jobs} />
            </div>
            :
            <img src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif"/> 
    );
}

export default CompanyDetail;