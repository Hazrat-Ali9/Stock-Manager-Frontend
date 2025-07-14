import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import axios from "axios";
import { BiLogInCircle } from "react-icons/bi";
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

function Login() {
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


  // Check if token exists on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/store"); // Redirect to store if token exists
    }
  }, [history]);

  // const [available, setAvailable] = useState("");
  // const [category, setCategory] = useState("");
  // const [selectedDate, setSelectedDate] = useState("");
  // const [api, setApi] = useState("");

  // const onSubmit = (data) => console.log(data);
  const functionName = async (data) => {
    axios
      .post("https://stock-manager-backend-indol.vercel.app/API/users/login", data)
      .then((res) => {
        const { token, users } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userID", users._id);
        localStorage.setItem("address", users.address);
        history.push("/store");
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error("Invalid email or password");
        setErrorDisplay(true);
      });
  };

  const onSubmit = (data) => {

    functionName(data);
  };

  return (
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
                SingIn <BiLogInCircle color="blue" />
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

                {/* {console.log(errors)} */}
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
                <p>{errors.password?.message}</p>
                {/* <p>{errors.password.message && errors.password.message}</p> */}
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
                    onClick={() => history.push("/register")}
                  >
                    SingUp
                  </Button>
                  {/* </Link> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Link to="/forgotpassword">
                <Typography>Forgot Password?</Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
        {/* {ErrorDisplay && <FlashMessage message={loginMessage} />} */}
      </Grid>
    </div>
  );
}

export default Login;
