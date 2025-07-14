import { Button, Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import { FcDecision } from "react-icons/fc";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  maingrid: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "20%",
    boxShadow: "0 5px 10px #777",
    width: "30%",
    marginTop: "6em",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginTop: "7em",
    },
  },
}));

function InsidePopup({ openPopup, handleCheckout, setOpenAddressEditPopup }) {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <FcDecision size="small" />
        </Grid>
        <Grid
          container
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenAddressEditPopup(true)} // Open address edit popup
            >
              Edit Address
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleCheckout}
              color="secondary"
            >
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default InsidePopup;