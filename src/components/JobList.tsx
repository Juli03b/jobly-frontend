import Jobs from './Jobs';
import JoblyApi from '../api';
import SearchBar from './SearchBar';
import { JobProps } from '../interfaces';
import { FC, useEffect, useState } from 'react';

// Component to show jobs
const JobList: FC = () => {
  const [jobs, setJobs] = useState<JobProps[]>([]);

  useEffect((): void => {
    const getJobs = async () => {
      const { jobs } = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    getJobs();
  }, []);
  
  const onSearch = async (query: string) => {
    if(query){
      const { jobs } = await JoblyApi.searchJobs(query);
      setJobs(jobs)
    }else{
      setJobs(jobs);
    }
  } 

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <Jobs jobs={jobs}/>
    </div>
  );
}

export default JobList;
