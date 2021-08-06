import JoblyApi from '../api';
import SearchBar from './SearchBar';
import { CompanyProps } from '../interfaces';
import { FC, useEffect, useState } from 'react';
import Companies from './Companies';
import { GridSize } from '@material-ui/core';
import { useQuery } from '../hooks';
import { Loading } from './Loading';

/** Component to show companies
 * 
 * Props that CompanyList accepts (optional):
 * 
 * companyAmt - ammount of companies
 * to be displayed.
 * 
 * xsVal - ammount of xs units per companies (out of 12 per row);
 * this is passed to Companies component.
 * 
 * searchBar - choose whether seach bar should
 * be showing, boolean.
 */

const CompanyList: FC<{companyAmt?: number, xsVal?: GridSize, searchBar?: boolean}> = ({companyAmt, xsVal = 3, searchBar = false}) => {
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

  return (
    <div>
      { isLoading ? <Loading />
        :
        (
          <>
            {searchBar && <SearchBar onSearch={onSearch} placeholder="Search companies" />}
            <Companies companies={companies} xsVal={xsVal} />
          </>
        )
      }
    </div>
  );
}

export default CompanyList;
