import { createStyles, Grid, GridSize, makeStyles, Theme } from '@material-ui/core';
import { FC } from 'react';
import { JobProps } from '../interfaces';
import Job from './Job';

const useStyles = makeStyles((theme: Theme) => createStyles({
    grid: {
        color: theme.palette.text.primary,
      },
    gridContainer: {
      padding: "4rem"
    },
  }),
);

// Dumb component to render a list of jobs
const Jobs: FC<{jobs: JobProps[], xsVal?: GridSize}> = ({jobs, xsVal}) => {
    const classes = useStyles();
    const jobsJsx = jobs.map(({title, salary, equity, id, img, companyName, companyHandle}) => (
      <Grid item xs={xsVal} className={classes.grid} key={id}>
          <Job title={title} salary={salary} equity={equity} id={id} img={img} companyName={companyName} companyHandle={companyHandle} />
      </Grid>
    ));

    return (
        <Grid 
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="baseline"
            className={classes.gridContainer}
        >
          {jobsJsx}
        </Grid>
    )
}

export default Jobs;