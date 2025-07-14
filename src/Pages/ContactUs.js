import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios";
import { FcFeedback } from "react-icons/fc";
import { Link, useParams } from "react-router-dom";
import FlashMessage from "./FlashMessage";
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

function UserRegister() {
  const [success, setSuccess] = useState(false);
  let history = useHistory();
  const classes = useStyles();
  const { register, handleSubmit, reset, control } = useForm();
  let { _id } = useParams();
  const functionName = async (info) => {
    axios
      .post(`https://stock-manager-backend-indol.vercel.app/API/feedback/${_id}`, info)
      .then((res) => {
        toast.success("Feedback submitted successfully");
        setSuccess(true);
      })
      .catch((err) => {
        console.error(err);
      });
    setSuccess(false);
  };

  const onSubmit = (data) => {
    functionName(data);
    reset();
    // f2();
  };

  return (
    <div className={classes.div}>
      <Grid container className={classes.maingrid}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={1} container justifyContent="center">
            <Grid item>
              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12} sm={12}>
                  <Typography variant="h4">
                    Feedback <FcFeedback color="blue" />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    {...register("email")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="User_Name"
                    variant="outlined"
                    fullWidth
                    name="id"
                    {...register("id")}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    id="outlined-multiline-static"
                    fullWidth
                    label="Feedback"
                    multiline
                    rows={4}
                    defaultValue=""
                    name="feedback"
                    {...register("feedback")}
                    variant="outlined"
                  />
                </Grid>

                <Grid
                  container
                  justifyContent="center"
                  style={{ marginTop: 10 }}
                  spacing={2}
                >
                  <Grid item>
                    {/* <Link to="/" style={{ textDecoration: "none" }}> */}
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"

                      // onClick={history.goBack}
                    >
                      submit
                    </Button>
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
