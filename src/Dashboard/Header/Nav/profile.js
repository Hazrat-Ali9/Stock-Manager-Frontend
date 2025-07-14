import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import { Link, useHistory } from "react-router-dom";

import { FcBusinessman } from "react-icons/fc";

import { makeStyles } from "@material-ui/core";
import { components } from "react-select";

const useStyles = makeStyles((theme) => ({}));
function Profile() {
  const history = useHistory();
  const handleClick = () => {
    debugger;
    localStorage.removeItem("admintoken");
    localStorage.removeItem("tenantId");
    history.push("/adminlogin");
    window.location.reload();
  };

  return (
    <div>
      <Button Component={Link} to="/adminlogin" onClick={handleClick}>
        <FcBusinessman size="3em" />
      </Button>
    </div>
  );
}

export default Profile;
