export interface JobProps {
    title: string;
    salary: number | null;
    equity: number | null;
    id: number;
    companyName: string;
    companyHandle: string;
    company?: CompanyProps;
    img?: string;
}
export interface CompanyProps {
    handle: string;
    name: string;
    numEmployees: number;
    description: string;
    img?: string;
    jobs: JobProps[];
}
export interface UserProps {
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    email: string;
    applications: number[];
    jobs: JobProps[];
}
export interface UserTokenProps {
    username: string;
    iat: number;
    isAdmin: boolean;
}
export interface UserPatchProps {
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}
export interface UserCreateProps {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}
export interface UserSignInProps {
    username: string;
    password: string;
}
export interface UserPatchedProps {
    username: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    email: string;
}