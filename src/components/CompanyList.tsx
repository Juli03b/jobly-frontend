import JoblyApi from '../api';
import Company from './Company';
import SearchBar from './SearchBar';
import { CompanyProps } from '../interfaces';
import { FC, useEffect, useState } from 'react';

// component to show companies
const CompanyList: FC = () => {
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [jsxCompanies, setJsxCompaniesState] = useState<typeof Company[]>([])

  const setJsxCompanies =  (companies: CompanyProps[]) => {
    setJsxCompaniesState((): any => companies.map(({name, description, handle, logoUrl, numEmployees, jobs }) => (
      <Company 
        name={name} 
        numEmployees={numEmployees} 
        description={description} 
        logoUrl={logoUrl} 
        handle={handle}
        jobs={jobs}
        key={handle}
      />
    )));
  } 

  useEffect((): void => {
    const getCompanies = async () => {
      try{
        const { companies } : {companies: CompanyProps[]} = await JoblyApi.getCompanies();

        setJsxCompanies(companies);
        setCompanies(companies);
      }catch{
        console.log("oopsie")
      }
    }
    
    getCompanies();

  }, []);

  const onSearch = async (query: string) => {
    if(query){
      const { companies }: {companies: CompanyProps[]} = await JoblyApi.searchCompanies(query);
      
      setJsxCompanies(companies);
    }else{
      setJsxCompanies(companies);
    }
} 

  return (
    <div className="">
      <SearchBar onSearch={onSearch} />
      {jsxCompanies}
    </div>
  );
}

export default CompanyList;
