import React, { useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import pic from "../pics/l1.jpg";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { motion } from "framer-motion";
const useStyle = makeStyles({
  gridback: {
    backgroundColor: "white",
    margin: "0.5em",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 5px 20px #777",
  },

  itemimg: {
    width: "200px",
    height: "200px",
    padding: "10px",
  },
  outer: {
    padding: "10px",
    maxWidth: "100%",
  },
  btn: {
    margin: "5px",
    backgroundColor: "#03a9f4",
  },
});

function Menu({ items, categories }) {
  useEffect(() => {}, [categories]);
  const classes = useStyle();
  return (
    <Grid
      container
      className={classes.outer}
      direction="row"
      justifyContent="space-evenly"
    >
      {items != ""
        ? items.map((item) => {
            const { _id, name, category, price, picture, description, color } =
              item;
            return (
              <motion.div
                key={_id}
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 80,
                }}
                whileHover={{ scale: 1.1, color: "red" }}
              >
                <Grid item className={classes.gridback}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <img
                        className={classes.itemimg}
                        src={`https://stock-manager-backend-indol.vercel.app/uploads/${picture}`}
                        alt={name}
                      />
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-around"
                    >
                      <Grid item>
                        <h4>{name}</h4>
                      </Grid>
                      <Grid item>
                        <p>${price}</p>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button
                        className={classes.btn}
                        component={Link}
                        to={`/home/view/${_id}`}
                        variant="contained"
                      >
                        View
                      </Button>
                      {/* <Button
                    className={classes.btn}
                    component={Link}
                    to="/cart"
                    variant="contained"
                   
                  >
                    <AddShoppingCartIcon />
                  </Button> */}
                    </Grid>
                  </Grid>
                </Grid>
              </motion.div>
            );
          })
        : categories.map((item) => {
            const { _id, name, category, price, picture, description, color } =
              item;
            return (
              <motion.div
                key={_id}
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 80,
                }}
                whileHover={{ scale: 1.1, color: "red" }}
              >
                <Grid item className={classes.gridback}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <img
                        className={classes.itemimg}
                        src={`https://stock-manager-backend-indol.vercel.app/uploads/${picture}`}
                        alt={name}
                      />
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-around"
                    >
                      <Grid item>
                        <h5>{name}</h5>
                      </Grid>
                      <Grid item>
                        <p>${price}</p>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button
                        className={classes.btn}
                        component={Link}
                        to={`/home/view/${_id}`}
                        variant="contained"
                      >
                        View
                      </Button>
                      {/* <Button
                    className={classes.btn}
                    component={Link}
                    to="/cart"
                    variant="contained"
                   
                  >
                    <AddShoppingCartIcon />
                  </Button> */}
                    </Grid>
                  </Grid>
                </Grid>
              </motion.div>
            );
          })}
    </Grid>
  );
}

export default Menu;
