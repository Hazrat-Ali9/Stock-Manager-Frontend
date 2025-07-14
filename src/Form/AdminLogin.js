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
let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
function AdminLogin() {
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


  // Check if admin token exists on component mount
  useEffect(() => {
    const adminToken = localStorage.getItem("admintoken");
    if (adminToken) {
      history.push("/admin"); // Redirect to admin dashboard if token exists
    }
  }, [history]);
  // const [available, setAvailable] = useState("");
  // const [category, setCategory] = useState("");
  // const [selectedDate, setSelectedDate] = useState("");
  // const [api, setApi] = useState("");
  // const onSubmit = (data) => console.log(data);

  const functionName = (data) => {
    debugger;
    axios
      .post("https://stock-manager-backend-indol.vercel.app/API/admin/login", data)
      .then((res) => {
        debugger;
        const { token, admins } = res.data;
        localStorage.setItem("admintoken", token);
        localStorage.setItem("adminID", admins._id);
        // localStorage.setItem("userID", users._id);
        history.push("/tenantlogin");
        toast.success(res.data.message);
      })
      .catch((err) => {
        setLoginMessage(err.message);
        setErrorDisplay(true);
        toast.error("Invalid email or password");
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
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item>
                <Typography variant="h4">
                  Admin SingIn <BiLogInCircle color="blue" />
                </Typography>
              </Grid>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    {...register("email")}
                  />
                  <p style={{ color: "red" }}>{errors.email?.message}</p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    type="password"
                    {...register("password")}
                  />
                </Grid>

                <Grid container justifyContent="center" spacing={2}>
                  <Grid item>
                    {/* <Link to="/store" style={{ textDecoration: "none" }}> */}
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      // onClick={history.goBack}
                    >
                      SingIn
                    </Button>
                    {/* </Link> */}
                  </Grid>
                  <Grid item>
                    {/* <Link to="/register" style={{ textDecoration: "none" }}> */}
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      onClick={() => history.push("/registeradmin")}
                    >
                      SingUp
                    </Button>
                    {/* </Link> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Link to="/adminforgotpassword">
                  <Typography>Forgot Password?</Typography>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
      {/* {ErrorDisplay && <FlashMessage message={loginMessage} />} */}
    </>
  );
}


export default AdminLogin;
