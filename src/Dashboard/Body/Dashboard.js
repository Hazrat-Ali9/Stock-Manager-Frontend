import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { ArrowUpward } from "@material-ui/icons";
import Chart from "./Chart";
import { motion } from "framer-motion";
const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    justifyContent: "center",
  },
  maincard: {
    borderRadius: "20px",
    boxShadow: "0 5px 20px #777",
    padding: "5px 5px",
  },
  price: {
    fontSize: "20px",
  },
  pagetitle: {
    margin: ".3em",
  },
  downicon: {
    color: "red",
  },
  upicon: {
    color: "green",
  },
  downtitle: {
    color: "grey",
    display: "flex",
    justifyContent: "center",
  },
  mobile: {
    [theme.breakpoints.down("md")]: {
      marginLeft: "4em",
      marginBottom: "1em",
    },
  },
}));
function Dashboard() {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4" className={classes.pagetitle}>
        Dashboard
      </Typography>
      <Grid
        container
        justifyContent="space-between"
        spacing={2}
        alignItems="center"
      >
        <motion.Grid
          whileHover={{ scale: 1.05, originX: 0 }}
          item
          xs={12}
          md={3}
          className={classes.mobile}
        >
          <Card className={classes.maincard}>
            <CardContent>
              <Typography variant="h5" className={classes.title}>
                Sales
              </Typography>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item className={classes.price}>
                  <b>$ 234.4</b>
                </Grid>
                <Grid item>
                  -1.4
                  <ArrowDownwardIcon className={classes.downicon} />
                </Grid>
              </Grid>
              <Typography className={classes.downtitle}>
                Compare to last month
              </Typography>
            </CardContent>
          </Card>
        </motion.Grid>

        <motion.Grid
          whileHover={{ scale: 1.04, originX: 0 }}
          item
          xs={12}
          md={3}
          className={classes.mobile}
        >
          <Card className={classes.maincard}>
            <CardContent>
              <Typography variant="h5" className={classes.title}>
                Revanue
              </Typography>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item className={classes.price}>
                  <b>$ 234.4</b>
                </Grid>
                <Grid item>
                  -1.4
                  <ArrowDownwardIcon className={classes.downicon} />
                </Grid>
              </Grid>
              <Typography className={classes.downtitle}>
                Compare to last month
              </Typography>
            </CardContent>
          </Card>
        </motion.Grid>

        <motion.Grid
          whileHover={{ scale: 1.03, originX: 0 }}
          item
          xs={12}
          md={3}
          className={classes.mobile}
        >
          <Card className={classes.maincard}>
            <CardContent>
              <Typography variant="h5" className={classes.title}>
                Expense
              </Typography>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item className={classes.price}>
                  <b>$ 234.4</b>
                </Grid>
                <Grid item>
                  1.4
                  <ArrowUpward className={classes.upicon} />
                </Grid>
              </Grid>
              <Typography className={classes.downtitle}>
                Compare to last month
              </Typography>
            </CardContent>
          </Card>
        </motion.Grid>

        <motion.Grid
          whileHover={{ scale: 1.02, originX: 0 }}
          item
          xs={12}
          md={3}
          className={classes.mobile}
        >
          <Card className={classes.maincard}>
            <CardContent>
              <Typography variant="h5" className={classes.title}>
                Purchase
              </Typography>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item className={classes.price}>
                  <b>$ 234.4</b>
                </Grid>
                <Grid item>
                  -1.4
                  <ArrowDownwardIcon className={classes.downicon} />
                </Grid>
              </Grid>
              <Typography className={classes.downtitle}>
                Compare to last month
              </Typography>
            </CardContent>
          </Card>
        </motion.Grid>
      </Grid>
      <Chart />
    </div>
  );
}

export default Dashboard;
