import { FC } from 'react';
import { JobProps } from '../interfaces';
import Job from './Job';

// Dumb component to render a list of jobs
const Jobs: FC<{jobs: JobProps[]}> = ({jobs}: {jobs: JobProps[]}): any => (
    jobs.map(({title, description, salary, equity, id}) => (
        <Job title={title} description={description} salary={salary} equity={equity} id={id} key={id} />
    ))
);

export default Jobs;