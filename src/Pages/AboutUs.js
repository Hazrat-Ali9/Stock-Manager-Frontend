import React from "react";
import { makeStyles } from "@material-ui/core";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import cui from "../pics/cui.jpeg";
import ahsan from "../pics/ahsan.jpeg";
import usmanSab from "../pics/usmanSab.jpeg";
import khawar from "../pics/khawar.jpeg";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "center",
  },
  img: {
    width: "1200px",
    height: "300px",
    [theme.breakpoints.down("md")]: {
      width: "320px",
      height: "150px",
    },
  },
  gridback: {
    backgroundColor: "white",
    margin: "0.5em",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0 5px 20px #777",
  },
  img1: {
    width: "250px",
    height: "300px",
    [theme.breakpoints.down("md")]: {
      width: "200px",
      height: "250px",
    },
  },
  maingrid: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5%",
    boxShadow: "0 5px 10px #777",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginTop: "2em",
    },
    width: "60%",
    marginTop: "3em",
  },
}));

function AboutUs() {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <h1 style={{ margin: "5px" }}>Cui Lahore</h1>
        </Grid>
        <Grid item>
          <img src={cui} alt="cui" className={classes.img} />
        </Grid>
        <Grid item>
          <h1 style={{ margin: "1px" }}>Team</h1>
        </Grid>
        <Grid container justifyContent="space-evenly">
          <Grid item className={classes.gridback}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <img className={classes.img1} src={ahsan} alt="cui" />
              </Grid>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing="0"
              >
                <Grid item>
                  <Typography>
                    <b>Name :</b> Muhammad Ahsan
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography> Team Leader</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <b>Email :</b>sp18-bse-180@cuilahore.edu.pk{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.gridback}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <img className={classes.img1} src={usmanSab} alt="cui" />
              </Grid>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing="0"
              >
                <Grid item>
                  <Typography>
                    <b>Name :</b> Usman Akram
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {" "}
                    <b>Project Supervisor</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <b>Email :</b>musmanakram@cuilahore.edu.pk
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.gridback}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <img className={classes.img1} src={khawar} alt="cui" />
              </Grid>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing="0"
              >
                <Grid item>
                  <Typography>
                    <b>Name :</b> Khawar Shahzad
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography> Team Member</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <b>Email :</b>sp18-bse-181@cuilahore.edu.pk{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AboutUs;
