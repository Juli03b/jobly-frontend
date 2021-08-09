import JoblyApi from '../api';
import SearchBar from './SearchBar';
import { CompanyProps } from '../interfaces';
import { FC, useEffect, useState } from 'react';
import Companies from './Companies';
import { useQuery } from '../hooks';
import { Loading } from './Loading';

/** Component to show companies
 * 
 * Props:
 * 
 * companyAmt - ammount of companies
 * to be displayed, optional (will show all if not provided). 
 * 
 * searchBar: boolean to decide to show the 
 * search bar, optional (will not show if not true).
 * 
 */

const CompanyList: FC<{companyAmt?: number, searchBar?: boolean}> = ({companyAmt, searchBar = false}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const companyFilter = (companies: CompanyProps[]) => companies.slice(0, companyAmt || companies.length);
  const query = useQuery();

  useEffect((): void => {
    const queryStr = query.get("query");
    const getCompanies = async () => {
      const { companies } : {companies: CompanyProps[]} = await JoblyApi.getCompanies();
      setCompanies(companyFilter(companies));
      setIsLoading(false);
    }
    const searchGetCompanies = async (queryStr: string) => {
      const { companies }: {companies: CompanyProps[]} = await JoblyApi.searchCompanies(queryStr);
      setCompanies(companyFilter(companies));
      setIsLoading(false);
    }

    queryStr ? searchGetCompanies(queryStr) : getCompanies();
    
  }, []);

  const onSearch = async (query: string) => {
    if(query){
      const { companies }: {companies: CompanyProps[]} = await JoblyApi.searchCompanies(query);
      setCompanies(companyFilter(companies));
    }else{
      setCompanies(companyFilter(companies));
    }
  }
  
  if(isLoading) return <Loading />
  return (
    <div>
      {searchBar && <SearchBar onSearch={onSearch} placeholder="Search companies" />}
      <Companies companies={companies} />
    </div>);
}

export default CompanyList;
