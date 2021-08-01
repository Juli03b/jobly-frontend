import { FC } from 'react';
import { CompanyProps } from '../interfaces';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';

// Dumb component to render a company
const Company: FC<CompanyProps> = ({name, numEmployees, description, logoUrl, handle}: CompanyProps) => {
    return (
        <Card className="m-3">
            <CardBody>
                <a href={`/companies/${handle}`} className="stretched-link"></a>
                <CardTitle>{name}</CardTitle>
                <CardSubtitle className="text-muted small">{numEmployees} Employees</CardSubtitle>
                <CardText>{description}</CardText>
                <CardImg bottom src={logoUrl} width="5"/>
            </CardBody>
        </Card>

    );
}

export default Company;