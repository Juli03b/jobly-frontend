import Jobs from './Jobs';
import JoblyApi from '../api';
import SearchBar from './SearchBar';
import { JobProps } from '../interfaces';
import { FC, useEffect, useState } from 'react';
import { useQuery } from '../hooks';
import { GridSize } from '@material-ui/core';
import { Loading } from './Loading';

// Component to show jobs
const JobList: FC<{jobAmt?: number, xsVal?: GridSize, searchBar?: boolean}> = ({jobAmt, xsVal = 3, searchBar = false}) => {
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const jobFilter = (jobs: JobProps[]) => jobs.slice(0, jobAmt || jobs.length);
  const query = useQuery();

  useEffect((): void => {
    const queryStr = query.get("query");
    const getJobs = async () => {
      const { jobs }: { jobs: JobProps[] } = await JoblyApi.getJobs();
      console.log(jobs)
      setJobs(jobFilter(jobs));
      setIsLoading(false)
    }
    const searchJobs = async (queryStr: string) => {
      const { jobs }: { jobs: JobProps[] } = await JoblyApi.searchJobs(queryStr);
      setJobs(jobFilter(jobs));
      setIsLoading(false);
    }
    queryStr ? searchJobs(queryStr) : getJobs();
  }, []);
  
  const onSearch = async (query: string) => {
    if(query){
      const { jobs } = await JoblyApi.searchJobs(query);
      setJobs(jobFilter(jobs));
    }else{
      setJobs(jobFilter(jobs));
    }
  } 

  return (
    
    <div>
      { isLoading ?
        <Loading />
      :
      <>
          {searchBar && <SearchBar onSearch={onSearch} placeholder="Search jobs" />}
          <Jobs xsVal={xsVal} jobs={jobs}/>
      </>
      }
    </div>
  );
}

export default JobList;
