import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import FlashMessage from "../../../Pages/FlashMessage";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
let schema = yup
  .object({
    name: yup.string().min(3).max(15).required(),

    id: yup.string().required(),
  })
  .required();
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
const Status = [
  { value: "available", label: "Available" },
  { value: "not-available", label: "Not Available" },
];
const Category = [
  { vale: "computer", label: "Computer" },
  { value: "mobile", label: "Mobile" },
  { value: "tv", label: "TV" },
];

let tenantID = localStorage.getItem("tenantId");
function AddCategory() {
  let history = useHistory();
  const classes = useStyles();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [available, setAvailable] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [success, setSuccess] = useState(false);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange2 = (event) => {
    setAvailable(event.target.value);
  };
  const functionName = async (data) => {
    axios
      .post(`https://stock-manager-backend-indol.vercel.app/API/categories/${tenantID}`, data)
      .then((res) => {
        toast.success(res.data.message);
        setSuccess(true);
      })
      .catch((err) => {
        toast.error("Failed to add category");
      });
    setSuccess(false);
  };

  const handleChange1 = (event) => {
    setCategory(event.target.value);
  };
  const onSubmit = (data) => {
    const myTenantId = localStorage.getItem("tenantId");
    data.tenant_id = myTenantId;
    functionName(data);
    reset();
  };
  return (
    <div>
      <h1>Add Category</h1>
      <Grid container className={classes.maingrid} justifyContent="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={2} container justifyContent="center">
            <Grid item md={12}>
              <Typography variant="h5"> Enter Details</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                {...register("name")}
              />
              {errors.name ? (
                <p style={{ color: "red" }}>{errors.name.message}</p>
              ) : (
                ""
              )}
            </Grid>
            {/* <Grid item xs={12} sm={12}>
              <TextField
                label="Tenant_Id"

                variant="outlined"
                defaultValue={tenantID}
                fullWidth
                name="tenant_id"
                {...register("tenant_id")}
              />
            </Grid> */}
            <Grid item xs={12} sm={12}>
              <TextField
                label="Id"
                variant="outlined"
                fullWidth
                name="id"
                {...register("id")}
              />
              {errors.id ? (
                <p style={{ color: "red" }}>{errors.id.message}</p>
              ) : (
                ""
              )}
            </Grid>

            <Grid item>
              <Grid container justifyContent="center" spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      history.push("/category");
                    }}
                  >
                    Cencel
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" type="submit">
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        {success ? <FlashMessage message={"Category added"} /> : ""}
      </Grid>
    </div>
  );
}

export default AddCategory;
