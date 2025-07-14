import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import FlashMessage from "../../../Pages/FlashMessage";
import axios from "axios";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
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
    padding: "10px",
    border: "1px dashed grey",
  },
}));

function Editform({ _id, id, name }) {
  const [first, setFirst] = useState(name);
  const [sec, setSec] = useState(id);

  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  let history = useHistory();
  const { register, handleSubmit, reset, control } = useForm();
  const functionName = async (data) => {
    axios
      .put(`https://stock-manager-backend-indol.vercel.app/API/categories/${_id}`, data)
      .then((res) => {
        toast.success(res.data.message);
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
  };

  return (
    <div>
      <Grid container className={classes.maingrid} justifyContent="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={2} container justifyContent="center">
            <Grid item md={12}>
              <Typography variant="h5"> Edit Details</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                defaultValue={name}
                onChange={(e) => {
                  setFirst({ name: e.target.value });
                }}
                variant="outlined"
                fullWidth
                type="text"
                name="name"
                {...register("name")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                defaultValue={id}
                variant="outlined"
                fullWidth
                name="id"
                {...register("id")}
              />
            </Grid>

            <Grid item>
              <Grid container justifyContent="center" spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      //   history.push("/orders");
                    }}
                  >
                    Editform
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" type="submit">
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
}

export default Editform;
