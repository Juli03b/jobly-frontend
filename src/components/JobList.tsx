import Jobs from './Jobs';
import JoblyApi from '../api';
import SearchBar from './SearchBar';
import { JobProps } from '../interfaces';
import { FC, useEffect, useState } from 'react';
import { useQuery } from '../hooks';
import { Loading } from './Loading';

/** Component to show jobs
 * 
 * Fetch all jobs if query not detected from url,
 * if query detected, show results for query.
 * 
 * Props:
 * 
 * jobAmt: ammount of jobs to show, 
 * optional (will show all if not provided).
 * 
 * searchBar: boolean to decide to show the 
 * search bar, optional (will not show if not true).
 * 
 */

const JobList: FC<{jobAmt?: number, searchBar?: boolean }> = ({ jobAmt, searchBar = false }) => {
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const jobFilter = (jobs: JobProps[]) => jobs.slice(0, jobAmt || jobs.length);
  const query = useQuery();

  useEffect((): void => {
    const queryStr = query.get("query");
    const getJobs = async () => {
      const { jobs }: { jobs: JobProps[] } = await JoblyApi.getJobs();

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
    if (query) {
      const { jobs } = await JoblyApi.searchJobs(query);
      setJobs(jobFilter(jobs));
    } else {
      setJobs(jobFilter(jobs));
    }
  }

  if(isLoading) return <Loading />
  return (
    <div>
      {searchBar && <SearchBar onSearch={onSearch} placeholder="Search jobs" />}
      <Jobs jobs={jobs} />
    </div>
  );
}

export default JobList;
