import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios";
import { IoIosPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import FlashMessage from "../Pages/FlashMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "center",
  },
  img: {
    width: "250px",
    height: "200px",
    [theme.breakpoints.down("md")]: {
      width: "180px",
      height: "150px",
    },
  },
  maingrid: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5%",
    boxShadow: "0 5px 10px #777",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginTop: "2em",
    },
    width: "60%",
    marginTop: "3em",
  },
}));
let schema = yup
  .object({
    firstname: yup.string().min(3).max(15).required(),
    lastname: yup.string().min(3).max(15).required(),
    username: yup.string().min(5).max(15).required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmpassword: yup.string().oneOf([yup.ref("password"), null]),
    contact: yup.string().required(),
  })
  .required();
function UserRegister() {
  let history = useHistory();
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const functionName = (info) => {
    debugger;
    axios
      .post("https://stock-manager-backend-indol.vercel.app/API/admin/register", info)
      .then((res) => {
        debugger;
        const { token } = res.data;
        localStorage.setItem("adminregistertoken", token);
        toast.success(res.data.message);
        setSuccess(true);

        // history.push("/login");
      })
      .catch((err) => {
        debugger;
        console.error(err);
        toast.error(err.response.data.message);
      });
    setSuccess(false);
  };
  // const functionName = async (info) => {
  //   debugger;
  //   axios
  //     .post("https://stock-manager-backend-indol.vercel.app/API/users/register", info)
  //     .then((res) => {
  //       const { token } = res.data;
  //       localStorage.setItem("registertoken", token);
  //       console.log(res.data);
  //       setSuccess(true);

  //       // history.push("/login");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setSuccess(false);
  // };

  // const f2 = async () => {
  //   axios
  //     .post("https://stock-manager-backend-indol.vercel.app/API/users/ActivateAccount", {
  //       Headers: {
  //         token: localStorage.getItem("token"),
  //       },
  //     })
  //     .then(() => {
  //       history.push("http://localhost:3000/store");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const onSubmit = (data) => {
   
    functionName(data);
  };

  return (
    <div className={classes.div}>
      <Grid container className={classes.maingrid}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={2} container justifyContent="center">
            <Grid item>
              <Typography variant="h4">
                Register Admin <IoIosPersonAdd color="blue" />
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First_Name"
                    variant="outlined"
                    fullWidth
                    name="firstname"
                    id="firstname"
                    {...register(
                      "firstname"
                      //  {
                      //   required: "required",
                      //   minLength: { value: 5, message: "Must be 5 char long" },
                      // }
                    )}
                  />
                  {errors.firstname ? (
                    <p style={{ color: "red" }}>{errors.firstname.message}</p>
                  ) : (
                    ""
                  )}

                  {/* <p>
                    {errors.firstname?.message === "required" &&
                      "First name is required"}
                  </p> */}
                  {/* <p style={{ color: "red" }}>{errors.firstname?.message}</p> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last_Name"
                    variant="outlined"
                    fullWidth
                    name="lastname"
                    {...register("lastname")}
                  />
                  <p style={{ color: "red" }}>{errors.lastname?.message}</p>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="User_Name"
                    variant="outlined"
                    fullWidth
                    name="username"
                    {...register("username")}
                  />
                  <p style={{ color: "red" }}>{errors.username?.message}</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    {...register("email")}
                  />
                  <p style={{ color: "red" }}>{errors.email?.message}</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    {...register("password")}
                  />
                  <p style={{ color: "red" }}>{errors.password?.message}</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Confirm_Password"
                    variant="outlined"
                    fullWidth
                    name="confirmpassword"
                    {...register("confirmpassword")}
                  />
                  <p style={{ color: "red" }}>
                    {errors.confirmpassword?.message}
                  </p>
                </Grid>
                <Grid item xs={12} sm={12}>
                  {" "}
                  <hr style={{ height: 0.5, color: "black" }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contact_Number"
                    variant="outlined"
                    fullWidth
                    name="contact"
                    {...register("contact")}
                  />

                  <p style={{ color: "red" }}>{errors.contact?.message}</p>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    name="address"
                    {...register("address")}
                  />
                </Grid>

                <Grid
                  container
                  justifyContent="center"
                  style={{ marginTop: 10 }}
                >
                  <Grid item>
                    {/* <Link to="/" style={{ textDecoration: "none" }}> */}
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      // onClick={history.goBack}
                    >
                      Register
                    </Button>
                    {/* </Link> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
}

export default UserRegister;
