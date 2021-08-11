import { createStyles, Grid, GridSize, makeStyles, Theme } from "@material-ui/core";
import { FC } from "react";
import { CompanyProps } from "../interfaces";
import Company from "./Company";

const useStyles = makeStyles((theme: Theme) => createStyles({
    grid: {
        color: theme.palette.text.primary,
      },
    gridContainer: {
      paddingTop: "4rem"
    },
  }),
);
// Dumb component to render a list of companies.
// Uses grid to layout cards.
const Companies: FC<{companies: CompanyProps[], smVal?: GridSize, mdVal?: GridSize, lgVal?: GridSize, xlVal?: GridSize}> = ({companies, smVal = 12, mdVal = 6, lgVal = 4, xlVal = 4}) => {
  const classes = useStyles();
  const companiesJsx = companies.map(({name, description, handle, numEmployees, jobs, img }) => (
    <Grid 
      item
      xs={12}
      sm={smVal}
      md={mdVal}
      lg={lgVal}
      xl={xlVal}
      className={classes.grid}
      key={handle}
    >
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