import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import { MdDelete } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FlashMessage from "../Pages/FlashMessage";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
    // boxShadow: "0 5px 10px #777",
    border: "0.5px solid grey",
    width: "40%",
    marginTop: "6em",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginTop: "7em",
    },
  },
}));
const id = localStorage.getItem("adminID");

const functionName = async (info, history) => {
  const Passdata = {
    Tenant: {
      Tenant_name: `${info.Tenant_name}`,
      Tenant_id: `${info.Tenant_id}`,
    },
  };
  //   debugger;
  axios
    .post(`https://stock-manager-backend-indol.vercel.app/API/tenant/addTenant/${id}`, Passdata)
    .then((res) => {
      debugger;
      // setSuccess(true);
      toast.success(res.data.message);
      history.push("/tenantlogin");
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

let schema = yup.object().shape({
  Tenant_name: yup.string().required(),
});

function Login() {
  let history = useHistory();
  // const [success, setSuccess] = useState(false);
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    functionName(data, history);
  };

  return (
    <div className={classes.div}>
      <Grid
        container
        className={classes.maingrid}
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h4">
            Create New <MdCreateNewFolder color="green" />
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <TextField
                label="Tenant_Name"
                variant="outlined"
                fullWidth
                name="Tenant_name"
                {...register("Tenant_name")}
              />

              {/* {console.log(errors)} */}
              <p style={{ color: "red" }}>{errors.Tenant_name?.message}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tenant-ID"
                variant="outlined"
                fullWidth
                name="Tenant_id"
                {...register("Tenant_id")}
              />

              {/* {console.log(errors)} */}
            </Grid>

            <Grid item>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={history.goBack}
                  >
                    Cencel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    type="submit"
                    // onClick={history.goBack}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        {/* {success ? <FlashMessage message={"Tenant Added"} /> : ""} */}
      </Grid>
    </div>
  );
}

export default Login;
