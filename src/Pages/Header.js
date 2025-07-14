import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import logo from "../pics/logo.png";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { SwipeableDrawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { toast } from "react-toastify";


const useStyle = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
    marginBottom: "2em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0.5em",
    },
  },
  logo: {
    width: "4em",
  },
  tabs: {
    marginLeft: "auto",
  },
  tab: {
    fontWeight: 300,
    padding: "5px",
    minWidth: 20,
    marginLeft: "25px",
  },
  btnbar: {
    borderRadius: "50px",
    height: "3em",
    margin: "25px",
  },
  iconConatiner: {
    marginLeft: "auto",
  },
  iconMenu: {
    height: "50px",
    width: "50px",
    color: "white",
  },
  drawer: {},
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function Header() {
  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyle();
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent); // Fixed: Removed process.browser
  const theme = useTheme();
  const history = useHistory();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/about" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/contact" && value !== 2) {
      setValue(2);
    }
  }, [value]);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const logoutfunction = () => {
    localStorage.removeItem("token");
    history().push("/");
    toast.success("Logged Out Successfully");
  };

  const _id = localStorage.getItem("userID");

  const tabs = (
    <React.Fragment>
      <Tabs value={value} className={classes.tabs} onChange={handleChange}>
        <Tab
          className={classes.tab}
          label="Home"
          component={Link}
          to="/store"
        />
        <Tab
          className={classes.tab}
          label="About Us"
          component={Link}
          to="/about"
        />
        <Tab
          className={classes.tab}
          label="Contact Us"
          component={Link}
          to={`/contact/${_id}`}
        />
      </Tabs>

      {localStorage.getItem("token") ? (
        <a href="/" style={{ textDecoration: "none" }}>
          <Button
            className={classes.btnbar}
            color="secondary"
            variant="contained"
            onClick={() => logoutfunction()}
          >
            Logout
          </Button>
        </a>
      ) : (
        <a href="/" style={{ textDecoration: "none" }}>
          <Button
            className={classes.btnbar}
            color="secondary"
            variant="contained"
          >
            Login
          </Button>
        </a>
      )}
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List>
          <ListItem
            divider
            button
            onClick={() => setOpenDrawer(false)}
            component={Link}
            to="/store"
          >
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            onClick={() => setOpenDrawer(false)}
            component={Link}
            to="/about"
          >
            <ListItemText>About Us</ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            onClick={() => setOpenDrawer(false)}
            component={Link}
            to="/contact"
          >
            <ListItemText>Contact Us</ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            onClick={() => logoutfunction()}
            component={Link}
            style={{ backgroundColor: "#f50057" }}
          >
            <ListItemText>Log Out</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.iconConatiner}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon className={classes.iconMenu} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Button onClick={() => setValue(0)} component={Link} to="/store">
              <img src={logo} alt="logo" className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbar} />
    </React.Fragment>
  );
}

export default Header;