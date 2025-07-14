import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios";
import { BiLogInCircle } from "react-icons/bi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import FlashMessage from "../Pages/FlashMessage";
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
    border: "0.5px solid grey",
    borderRadius: "10% ",
    // boxShadow: "0 5px 10px #777",
    width: "30%",
    marginTop: "6em",
    [theme.breakpoints.down("md")]: {
      width: "80%",
      marginTop: "7em",
    },
  },
}));
const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

function AdminForgotPass() {
  let history = useHistory();
  const classes = useStyles();
  const [loginMessage, setLoginMessage] = useState("");
  const [ErrorDisplay, setErrorDisplay] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const functionName = (data) => {
    axios
      .put("https://stock-manager-backend-indol.vercel.app/API/admin/forgetPassword", data)
      .then((res) => {

        // localStorage.setItem("userID", users._id);
        toast.success(res.data.message);
        history.push("/adminresetpassword");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setErrorDisplay(true);
      });
  };

  const onSubmit = (data) => {
    functionName(data);
    // history.push("/admin");
  };

  return (
    <>
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
            <Typography variant="h4" style={{ color: "blue" }}>
              Enter Your Email
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <input {...register("email")} />
            <p>{errors.email?.message}</p> */}

            <Grid item xs={12} md={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                {...register("email")}
              />
              <p style={{ color: "red" }}>{errors.email?.message}</p>
            </Grid>

            <Grid item>
              <Button type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
      </div>
      {/* {ErrorDisplay && <FlashMessage message={loginMessage} />} */}
    </>
  );
}

export default AdminForgotPass;
