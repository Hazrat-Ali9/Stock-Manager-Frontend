import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Box, Hidden, makeStyles, Typography } from "@material-ui/core";
import NavNotfi from "./NavNotfi";
import Profile from "./profile";
import Message from "./Messages";
import MenuIcon from "@material-ui/icons/Menu";
import Store from "./Store";
const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: "white",
    boxShadow: "0 5px 10px #777",
  },
  toolbar: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
  },
  menuicon: {
    color: "black",
  },
}));
function Navbar({ handleDrawerToggle }) {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Store />
        {/* <Typography style={{ color: "black" }}>Dashboard</Typography> */}

        <Hidden smDown>
          <Box style={{ display: "flex" }}>
            <NavNotfi />
            <Message />
            <Profile />
          </Box>
        </Hidden>
        <Hidden mdUp>
          <MenuIcon onClick={handleDrawerToggle} className={classes.menuicon} />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
