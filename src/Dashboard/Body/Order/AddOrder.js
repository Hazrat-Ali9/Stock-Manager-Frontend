import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { GrSubtractCircle } from "react-icons/gr";
// import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { placeManualOrder } from "../../../Actions/Order";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
let schema = yup
  .object({
    name: yup.string().min(3).max(15).required(),
    contact: yup.string().required(),
    address: yup.string().required(),
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
  miandiv: {
    // width: "100%",
    height: 300,
    backgroundColor: "white",
    border: "1px dashed grey",
    [theme.breakpoints.down("md")]: {
      height: 600,
      marginTop: "2em",
    },
    title: {
      marginTop: "10px",
    },
  },
  maingrid: {
    backgroundColor: "white",
    padding: "10px",
    border: "1px dashed grey",
  },
}));

let tenantID = localStorage.getItem("tenantId");
function AddNewOrder() {
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
  // const {
  //   register: register2,
  //   handleSubmit: handleSubmit2,
  //   control: control2,
  // } = useForm();

  const [available, setAvailable] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dropdownitem, setDropdownitem] = useState();
  const [itemTotal, setItemTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [rowdata, setRowdata] = useState([]);
  const [customOrder, setCustomOrder] = useState([]);
  const columns = [
    { field: "id", headerName: "Id", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 120,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              disabled={params.row.stock === params.row.qty ? true : false}
              style={{
                marginRight: "5px",
                // minWidth: "40px",
                cursor: "pointer",
              }}
              onClick={() => handleIncreament(params.row._id)}
            >
              <BiMessageRoundedAdd
                style={{ color: "green", marginRight: "5px", minWidth: "40" }}
              />
            </Button>
            <div style={{ margin: "0 3px" }}>
              {params.row.isSelected ? params.row.qty : 0}
            </div>

            {/* <Link to={`${url}/:productId` + params.row._id}> */}
            <Button
              variant="contained"
              disabled={!params.row.isSelected}
              onClick={() => handleDecreament(params.row._id)}
            >
              <GrSubtractCircle
                style={{ color: "red", cursor: "pointer", minWidth: "40" }}
              />
            </Button>
            {/* </Link> */}
          </>
        );
      },
      width: 160,
    },
  ];

  const handleIncreament = (id) => {
    debugger;
    let getTotal = 0;
    const filteredItem = rowdata.map((el) => {
      getTotal =
        el.qty > 0 && el._id !== id
          ? getTotal + Number(el.qty) * Number(el.price)
          : getTotal + 0;

      if (el._id === id) {
        debugger;
        if (el.isSelected) {
          el.isSelected = true;
          el.qty += 1;
          getTotal =
            el.qty > 0
              ? getTotal + Number(el.qty) * Number(el.price)
              : getTotal + 0;
          return el;
        } else {
          el.isSelected = true;
          el.qty = 1;
          getTotal =
            el.qty > 0
              ? getTotal + Number(el.qty) * Number(el.price)
              : getTotal + 0;
          return el;
        }
      }
      return el;
    });
    setItemTotal(getTotal);
    setRowdata(filteredItem);
  };

  const handleDecreament = (id) => {
    debugger;
    let getTotal = 0;
    const filteredItem = rowdata.map((el) => {
      debugger;
      getTotal =
        el.qty > 0 && el._id !== id
          ? getTotal + Number(el.qty) * Number(el.price)
          : getTotal + 0;

      if (el._id === id) {
        debugger;
        if (el.isSelected && el.qty > 1) {
          el.isSelected = true;
          el.qty -= 1;
          getTotal =
            el.qty > 0
              ? getTotal + Number(el.qty) * Number(el.price)
              : getTotal + 0;
          return el;
        } else if (el.qty === 1 && el.isSelected) {
          el.isSelected = false;
          el.qty = 0;
          getTotal =
            el.qty > 0
              ? getTotal + Number(el.qty) * Number(el.price)
              : getTotal + 0;
          return el;
        }
      }
      return el;
    });
    setItemTotal(getTotal);
    setRowdata(filteredItem);
  };

  useEffect(async () => {
    await axios
      .get(`https://stock-manager-backend-indol.vercel.app/API/products/tenant/${tenantID}`)
      .then((res, req) => {
        setRowdata(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // const handleProductFun = (e) => {
  //   e.preventDefault();
  //   debugger;
  //   console.log(e);
  // };

  const handleChange2 = (event) => {
    setAvailable(event.target.value);
  };

  const handleChange1 = (event) => {
    setCategory(event.target.value);
  };
  const onSubmit = (data) => {
    debugger;
    const tenantId = localStorage.getItem("tenantId");
    let getTotal = 0;
    const checkData = rowdata
      .map((el) => {
        debugger;
        if (el.isSelected) {
          getTotal = getTotal + Number(el.qty) * Number(el.price);
          return {
            product: el.id,
            quantity: el.qty,
          };
        }
      })
      .filter((el) => el !== undefined);
    data.payment = "COD";
    debugger;
    if (!checkData.length > 0) {
      setErrorMessage("Please Select Altleast one Product");
    } else {
      setErrorMessage("");
      data.items = checkData;
      data.totalAmount = getTotal;
      data.tenant_id = tenantId;
    }
    placeManualOrder(data);
  };
  const onSubmit1 = (data1) => {
    debugger;
    setCustomOrder([...customOrder, data1]);
  };

  return (
    <div>
      <h1>Add Order</h1>
      <Grid container className={classes.maingrid}>
        <Grid spacing={2} container>
          <Grid item md={6}>
            <form key={1} onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h4"> Customer Details</Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contact"
                    variant="outlined"
                    fullWidth
                    name="contact"
                    {...register("contact")}
                  />
                  {errors.contact ? (
                    <p style={{ color: "red" }}>{errors.contact.message}</p>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    name="address"
                    type="text"
                    {...register("address")}
                  />
                  {errors.address ? (
                    <p style={{ color: "red" }}>{errors.address.message}</p>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Total"
                    value={itemTotal}
                    variant="outlined"
                    contentEditable={false}
                    fullWidth
                  />
                </Grid>

                {/*  <Grid item xs={12} sm={6}>
                  <TextField
                    id="category"
                    select
                    fullWidth
                    label="Category"
                    value={category}
                    defaultValue=""
                    name="category"
                    {...register("category")}
                    onChange={handleChange1}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select category"
                    variant="outlined"
                  >
                    {Category.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-select-currency-native"
                    select
                    fullWidth
                    name="status"
                    {...register("status")}
                    label="Status"
                    value={available}
                    defaultValue=""
                    onChange={handleChange2}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select status"
                    variant="outlined"
                  >
                    {Status.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="outlined-multiline-static"
                    fullWidth
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue=""
                    name="desc"
                    {...register("desc")}
                    variant="outlined"
                  />
                </Grid> */}
              </Grid>

              <Grid
                container
                justifyContent="center"
                spacing={1}
                sx={{ my: 2 }}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      history.push("/ordermanual");
                    }}
                  >
                    Cancel
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
                    Place Order
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item md={6} style={{ borderLeft: "1px dashed grey" }}>
            <Typography variant="h4"> Product Details</Typography>
            {/* <form key={2} onSubmit={handleSubmit2(onSubmit1)}>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={1}
                direction="row"
                style={{ marginBottom: "5em" }}
              >
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Product_Id"
                    variant="outlined"
                    fullWidth
                    name="product"
                    {...register2("cproduct")}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    name="quantity"
                    {...register2("quantity")}
                  />
                </Grid>
               

                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    // onClick={handleProductFun}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </form> */}
            <Grid item md={12}>
              {rowdata.length > 0 && (
                <div className={classes.miandiv}>
                  <DataGrid
                    rows={rowdata}
                    columns={columns}
                    pageSize={7}
                    // checkboxSelection
                    // disableSelectionOnClick
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddNewOrder;
