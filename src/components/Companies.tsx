import { createStyles, Grid, GridSize, makeStyles, Theme } from "@material-ui/core";
import { FC } from "react";
import { CompanyProps } from "../interfaces";
import Company from "./Company";

const useStyles = makeStyles((theme: Theme) => createStyles({
    grid: {
        color: theme.palette.text.primary,
      },
    gridContainer: {
      padding: "4rem"
    },
  }),
);
const Companies: FC<{companies: CompanyProps[], xsVal?: GridSize}> = ({companies, xsVal = 3}) => {
  const classes = useStyles();
  const companiesJsx = companies.map(({name, description, handle, numEmployees, jobs, img }) => (
    <Grid item xs={xsVal} className={classes.grid} key={handle}>
      <Company
        name={name} 
        numEmployees={numEmployees} 
        description={description} 
        handle={handle}
        jobs={jobs}
        img={img}
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
      {companiesJsx}
    </Grid>
  );
}

export default Companies