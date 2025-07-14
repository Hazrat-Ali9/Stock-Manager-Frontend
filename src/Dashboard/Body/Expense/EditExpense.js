import { Button, Grid, Input, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
// import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router";
import DateFnsUtils from "@date-io/date-fns";
import { getExpense } from "../../../Actions/Expense/Expense";
import FlashMessage from "../../../Pages/FlashMessage";
import axios from "axios";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Form } from "react-bootstrap";
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

function AddNewOrder() {
  let history = useHistory();
  let { id } = useParams();
  const classes = useStyles();
  const [getData, setData] = useState({});
  const { register, handleSubmit, control } = useForm();
  const [available, setAvailable] = useState("");
  const [success, setSuccess] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dropdownitem, setDropdownitem] = useState();

  useEffect(() => {
    getExpense(id, setData);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange2 = (event) => {
    setAvailable(event.target.value);
  };

  const handleChange1 = (event) => {
    setCategory(event.target.value);
  };

  const handleChange = (e) => {
    debugger;
    console.log(e.target.value);
  };

  const functionName = async (data) => {
    axios
      .put(`https://stock-manager-backend-indol.vercel.app/API/expense/${id}`, data)
      .then((res) => {
        toast.success("Expense Edited");
        history.push("/expense");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message || "Server Error");
      });
    setSuccess(false);
  };

  const onSubmit = (data) => {
    if (!data.product_name) {
      data.product_name = getData.product_name;
    }
    if (!data.description) {
      data.description = getData.description;
    }
    if (!data.id) {
      data.id = getData.id;
    }
    if (!data.travellingExpense) {
      data.travellingExpense = getData.travellingExpense;
    }
    if (!data.labourExpense) {
      data.labourExpense = getData.labourExpense;
    }
    if (!data.date) {
      data.date = getData.date;
    }
    if (!data.time) {
      data.time = getData.time;
    }
    functionName(data);
  };
  return (
    <div>
      <h1>Edit Expense</h1>
      <Grid container className={classes.maingrid}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={2} container>
            <Grid item md={6}>
              <Typography variant="h4"> Item Details</Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  {/* <Input
                    fullWidth
                    placeholder="Name"
                    defaultValue={getData.product_name && getData.product_name}
                    name="product_name"
                    {...register("product_name")}
                    variant="outlined"
                  /> */}
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label> Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="product_name"
                      {...register("product_name")}
                      defaultValue={
                        getData.product_name && getData.product_name
                      }
                      placeholder="Enter category name"
                    />
                  </Form.Group>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    label="Color"
                    variant="outlined"
                    fullWidth
                    name="color"
                    {...register("color")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    name="quantity"
                    type="number"
                    {...register("quantity")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="price"
                    variant="outlined"
                    fullWidth
                    name="price"
                    {...register("price")}
                  />
                </Grid> */}

                <Grid item xs={12} sm={12}>
                  {/* <Input
                    fullWidth
                    placeholder="Description"
                    multiline
                    rows={4}
                    defaultValue={getData.description && getData.description}
                    name="description"
                    {...register("description")}
                    variant="outlined"
                  /> */}
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label> Description</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      name="description"
                      {...register("description")}
                      defaultValue={getData.description && getData.description}
                      placeholder="Description"
                    />
                  </Form.Group>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  {/* <Grid item xs={12} sm={6}>
                    <Controller
                      name="date"
                      defaultValue={getData.date && getData.date}
                      defaultValue={null}
                      render={({ field }) => (
                        <KeyboardDatePicker
                          margin="normal"
                          id="date-picker-dialog"
                          label="Select Date"
                          format="MM/dd/yyyy"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          {...field}
                        />
                      )}
                    />
                  </Grid> */}

                  {/* <Grid item xs={12} sm={6}>
                    <Controller
                      name="time"
                      control={control}
                      defaultValue={getData.time && getData.time}
                      render={({ field }) => (
                        <KeyboardTimePicker
                          margin="normal"
                          id="time-picker"
                          label="Select Time"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                          {...field}
                        />
                      )}
                    />
                  </Grid> */}
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid item md={6} style={{ borderLeft: "1px dashed grey" }}>
              <Typography variant="h4"> Expense Details</Typography>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={5}
                style={{ marginBottom: "5em" }}
              >
                <Grid item xs={12} sm={12}>
                  {/* <Input
                    placeholder="Expense_id"
                    variant="outlined"
                    fullWidth
                    defaultValue={getData.id && getData.id}
                    name="id"
                    {...register("id")}
                  /> */}
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label> Expense_id</Form.Label>
                    <Form.Control
                      type="text"
                      name="id"
                      {...register("id")}
                      defaultValue={getData.id && getData.id}
                      placeholder="Id"
                    />
                  </Form.Group>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <Input
                    placeholder="Travelling_Expense"
                    variant="outlined"
                    fullWidth
                    defaultValue={
                      getData.travellingExpense && getData.travellingExpense
                    }
                    name="travellingExpense"
                    {...register("travellingExpense")}
                  /> */}
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label> Travelling_Expense</Form.Label>
                    <Form.Control
                      type="text"
                      name="travellingExpense"
                      {...register("travellingExpense")}
                      defaultValue={
                        getData.travellingExpense && getData.travellingExpense
                      }
                    />
                  </Form.Group>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <Input
                    placeholder="Laboura_Expense"
                    variant="outlined"
                    fullWidth
                    name="labourExpense"
                    defaultValue={
                      getData.labourExpense && getData.labourExpense
                    }
                    {...register("labourExpense")}
                  /> */}
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label> Laboura_Expense</Form.Label>
                    <Form.Control
                      type="text"
                      name="labourExpense"
                      {...register("labourExpense")}
                      defaultValue={
                        getData.labourExpense && getData.labourExpense
                      }
                    />
                  </Form.Group>
                </Grid>
              </Grid>

              <Grid container justifyContent="center" spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      history.push("/expense");
                    }}
                  >
                    Cencel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    // onClick={() => {
                    //   history.push("/orders");
                    // }}
                  >
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        {success ? <FlashMessage message={"Expense Edited"} /> : ""}
      </Grid>
    </div>
  );
}

export default AddNewOrder;
