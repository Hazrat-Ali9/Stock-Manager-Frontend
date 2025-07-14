import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import userdata from "./DummyData";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "1em",
    padding: "5px 10px",
  },
  mainDiv: {
    width: "100%",
    height: 280,
    backgroundColor: "white",
    marginTop: "1em",
    borderRadius: "20px",
    boxShadow: "0 5px 20px #777",
    padding: "5px 3px",
    [theme.breakpoints.down("md")]: {
      width: "100%",

      height: 400,
      padding: "2px",
    },
  },
}));
function Chart() {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        Analytics
      </Typography>

      <div className={classes.mainDiv}>
        <ResponsiveContainer>
          <ComposedChart data={userdata}>
            <XAxis dataKey="name" />
            <YAxis />
            <Line type="monotone" dataKey="sales" stroke="red" />
            <Line type="monotone" dataKey="expense" stroke="green" />
            <Line type="monotone" dataKey="revanue" stroke="blue" />
            <Tooltip />
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
            <Legend />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default Chart;
