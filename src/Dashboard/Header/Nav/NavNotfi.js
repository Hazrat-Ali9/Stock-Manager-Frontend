import React, { useEffect, useState } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  micon: {
    color: "Black",
  },
  Avatar: {
    backgroundColor: "blue",
    color: "white",
  },
  btn: {
    backgroundColor: "green",
    color: "white",
    marginTop: "10px",
    textAlign: "center",
    alignItems: "center",
  },
}));
const id = localStorage.getItem("adminID");
function NavNotfi() {
  const [TenantItem, setTenantItem] = useState([]);
  useEffect(() => {
    axios
      .get(`https://stock-manager-backend-indol.vercel.app/API/tenant/Admin/${id}`)

      .then((res) => {
        debugger;
        setTenantItem(res.data[0].Tenant);
        //   history.push("/store");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTenantClick = (id) => {
    debugger;
    localStorage.setItem("tenantId", id);
    window.location.reload();
    setAnchorEl(null);
  };
  const dropdown = [{ label: "Settings", desc: "Like your feed" }];
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        className={classes.btn}
      >
        Swith Tenant
        {/* <Badge badgeContent={4} color="secondary">
          <NotificationsNoneIcon fontSize="medium" className={classes.micon} />
        </Badge> */}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {TenantItem.length > 0 &&
          TenantItem.map((item, i) => (
            <MenuItem
              key={i}
              component={ListItem}
              onClick={() => handleTenantClick(item.Tenant_id)}
            >
              <ListItemIcon>
                <Avatar className={classes.Avatar}>
                  {item.Tenant_name[0].toUpperCase()}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={item.Tenant_name.toUpperCase()}
              ></ListItemText>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}

export default NavNotfi;
