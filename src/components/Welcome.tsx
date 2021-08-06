import React, { FC, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppContext from './AppContext';
import { ButtonGroup, Card, colors, createStyles, FormControl, Grid, Input, InputLabel, makeStyles, MenuItem, Select, Theme, Typography } from '@material-ui/core';
import CompanyList from './CompanyList';
import JobList from './JobList';
import { useEffect } from 'react';
import { Brand } from './Brand';
import { useAlert } from '../hooks';
import { NO_USER_MSG } from '../constants';

const BACKGROUND_IMG = "https://digitaladdictsblog.com/wp-content/uploads/2018/01/Digital-Addicts-superior-spy-apps-catch-a-cheater-smartphone.jpg";
const useStyles = makeStyles((theme: Theme) => createStyles({
    backgroundImg: { 
        background:`url(${BACKGROUND_IMG}) no-repeat`,
        backgroundSize:"100% 1020px",
        height:"785px",
        width:"100%",
        float:"left",
    },
    bgImgContainer: {
        zIndex:-1,
        width:"100%",
        position:"absolute",
        float:"right",
        right:0,
        clear:"both",
        borderBottom: "solid black 1.5px",
    },
    card: {
        width:"20rem",
        height:"50rem",
        textAlign: "center",
        boxShadow: "0 16px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    sectionFormControl: {
        minWidth: 100,
        marginLeft: "1.5rem",
    },
    bodyText: {
        maxWidth: theme.spacing(15),
        margin: "auto",
        fontSize: "1.15rem"
    },
    captionText: {
        fontSize: "1.15rem",
        color: colors.grey[600]
    },
    buttonGroup: {
        marginTop: "1rem"
    }
}));

const Welcome: FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const { userToken } = useContext(AppContext);
    const alert = useAlert(NO_USER_MSG, "info");
    const [query, setQuery] = useState<string>("");
    const [section, setSection] = useState<"companies" | "jobs">("companies");

    const notLoggedInP = (
        <><Link to="/sign-in">Sign in</Link> or <Link to="/sign-up">Sign Up</Link> to apply to jobs and view companies</>
    );
    const loggedInP = (
        <>Welcome back <Link to="/profile">{userToken?.username}</Link></>
    );
    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { name } = e.currentTarget;
        if(query){
            history.push(`/${name === "companies" ? "companies" : "jobs"}?query=${query}`)
        }else{
            history.push(`/${name}`);
        }
    }
    const onSeachButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(userToken){
            return handleSearch(e);
        }else{
            alert();
        }
    }

    useEffect(() => {
        const initialSection = localStorage.getItem("initialSection");
        if(initialSection && initialSection === "jobs" || initialSection === "companies") setSection(initialSection);
    }, []);

    return (
        <Container fixed>
            <div className={classes.bgImgContainer}>
                <div className={classes.backgroundImg}></div>
            </div>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{padding: "5rem"}}
            >   
                <Card className={classes.card}>
                    <Grid item xs={12} style={{marginTop:"8rem "}}>
                        <Brand size="large">Jobly</Brand>
                        <Typography variant="caption" className={classes.captionText}>Find a job you love!</Typography>
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"5rem"}}>
                        <Typography className={classes.bodyText}>{userToken ? loggedInP : notLoggedInP}</Typography>
                    </Grid>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Grid item xs={12} style={{marginTop:"3rem"}}>
                            <FormControl className="my-3" size="medium" style={{width:"13rem"}}  disabled={userToken ? false : true}>
                                <InputLabel htmlFor="search-box" style={{fontSize: ".9rem"}}>Search for a job or a company</InputLabel>
                                <Input
                                  fullWidth 
                                  id="search-box"
                                  aria-describedby="search-box-small"
                                  value={query}
                                  onSubmit={(e) => e.preventDefault()}
                                  onChange={(e) => setQuery(e.target.value)} 
                                  disabled={userToken ? false : true}
                                />
                                <div className={classes.buttonGroup}>
                                    <button className="btn btn-md btn-outline-dark mx-1 mb-1" name="jobs" onClick={onSeachButtonClick}>Jobs</button>
                                    <button className="btn btn-md btn-outline-dark mx-1 mb-1" name="companies" onClick={onSeachButtonClick}>Companies</button>
                                </div>
                            </FormControl>
                        </Grid>
                    </form>
                </Card>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
            >  
                <Grid item xs={3} style={{ marginLeft: "4rem"}}>
                    <Typography variant="h5" className="m-0">Recommended
                        <FormControl variant="standard" className={classes.sectionFormControl}>
                            <Select
                              id="section-option"
                              value={section}
                              onChange={() => setSection((section) => {
                                    const newSection = section === "jobs" ? "companies" : "jobs"
                                    localStorage.setItem("initialSection", newSection);
                                    return newSection;
                              })}
                            >
                              <MenuItem value="companies">Companies</MenuItem>
                              <MenuItem value="jobs">Jobs</MenuItem>
                            </Select>
                        </FormControl>
                    </Typography>
                </Grid>
                {
                    section === "jobs" ? (
                        <Grid item xs={12}>
                            <JobList jobAmt={10} xsVal={3} searchBar={false} />
                        </Grid>
                    ): (
                        <Grid item xs={12}>
                            <CompanyList companyAmt={10} xsVal={4} searchBar={false} />
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    )
}

export default Welcome;