import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  outer: {
    backgroundColor: "#141A46",
    padding: "0px",
  },
  inner: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "1em",
    },
  },
  btn: {
    backgroundColor: "#03a9f4",
    marginLeft: "2em",
    borderRadius: "50px",
    [theme.breakpoints.down("xs")]: {
      margin: "15px",
      marginLeft: "1em",
    },
  },
}));
function Categories({ filterItem, categories }) {
  const a = "abc";
  useEffect(() => {
    filterItem(["all"]);
  }, []);
  const classes = useStyle();
  return (
    <Grid container className={classes.outer} spacing={2}>
      <Grid item className={classes.inner}>
        {categories.map((category, index) => {
          return (
            <Button
              key={index}
              className={classes.btn}
              onClick={() => {
                filterItem(category);
              }}
              variant="contained"
            >
              {category}
            </Button>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default Categories;
