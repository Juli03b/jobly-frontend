import { createStyles, Grid, GridSize, makeStyles, Theme } from '@material-ui/core';
import { FC } from 'react';
import { JobProps } from '../interfaces';
import Job from './Job';

const useStyles = makeStyles((theme: Theme) => createStyles({
    grid: {
        color: theme.palette.text.primary,
      },
    gridContainer: {
      paddingTop: "4rem"
    },
  }),
);
// Dumb component to render a list of jobs.
// Uses grid to layout cards.
const Jobs: FC<{jobs: JobProps[], smVal?: GridSize, mdVal?: GridSize, lgVal?: GridSize}> = ({jobs, smVal = 6, mdVal = 4, lgVal = 3}) => {
    const classes = useStyles();
    const jobComponents = jobs.map(({title, salary, equity, id, img, companyName, companyHandle}) => (
      <Grid
        item 
        xs={12}
        sm={smVal}
        md={mdVal}
        lg={lgVal}
        className={classes.grid}
        key={id}
      >
        <Job
          title={title}
          salary={salary}
          equity={equity}
          id={id}
          img={img}
          companyName={companyName}
          companyHandle={companyHandle} 
        />
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
          {jobComponents}
        </Grid>
    )
}

export default Jobs;