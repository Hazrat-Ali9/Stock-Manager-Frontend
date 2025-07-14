import React, { useState } from "react";
import { Drawer, Hidden, makeStyles, Typography } from "@material-ui/core";
import SideList from "./SideList";

const useStyles = makeStyles((theme) => ({
  side: {
    backgroundColor: "white",
  },
  drawerPaper: {
    backgroundColor: "white",
    boxShadow: "0 15px 15px #777",
    width: "180px",
    marginTop: "64px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },
  },
}));
function Sidenav({ mobileOpen, handleDrawerToggle, handleDrawerClose }) {
  const classes = useStyles();

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <SideList handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <SideList handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Sidenav;
