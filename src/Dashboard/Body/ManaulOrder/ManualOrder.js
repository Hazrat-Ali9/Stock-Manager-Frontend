import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { FcPrint } from "react-icons/fc";
import { Link, useRouteMatch } from "react-router-dom";
import orders from "../OrderList";
import {
  getManualOrders,
  getOrders,
  UpdateManualOrderPlaced,
  orderplaced,
} from "../../../Actions/Order";

const useStyles = makeStyles((theme) => ({
  miandiv: {
    // width: "100%",
    height: 450,
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
  uppergrid: {
    marginTop: "2em",
    marginBottom: "1em",
  },
  avatar: {
    width: "25px",
    height: "20px",
  },
  delete: {
    color: "red",
    marginRight: "5px",
  },
  edit: {},
}));

function Order() {
  const classes = useStyles();
  let { path, url } = useRouteMatch();
  const [data, setDate] = useState([]);
  const handleDelete = (id) => {
    setDate(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
    getManualOrders(setDate);
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 95 },
    {
      field: "customerName",
      headerName: "Customer_Name",
      width: 200,
    },
    {
      field: "number",
      headerName: "Customer_Number",
      width: 200,
    },
    {
      field: "totalprice",
      headerName: "Total_Price",

      width: 160,
    },
    {
      field: "address",
      headerName: "Address",
      type: "number",
      width: 150,
      editable: !true,
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
    },
    {
      field: "print",
      headerName: "Print",
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "pending" && (
              <Button
                variant="contained"
                fullWidth
                style={{ cursor: "pointer" }}
                onClick={() => UpdateManualOrderPlaced(params.row.id)}
              >
                Deliver
              </Button>
            )}
          </>
        );
      },
      width: 150,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              style={{
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteOutlineIcon style={{ color: "red", marginRight: "5px" }} />
            </Button>

            {/* <Link to={`${url}/${params.row.id}`}>
              <Button variant="contained">
                <EditIcon style={{ color: "blue", cursor: "pointer" }} />
              </Button>
            </Link> */}
          </>
        );
      },
      width: 160,
    },
  ];

  const rows = [
    {
      id: 1,
      CustomerName: "Ahsan123",
      number: "03134162172",
      totalprice: 1290,
      totalproducts: 3,
      status: "paid",
    },
  ];

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.uppergrid}
      >
        <Grid item>
          <Typography variant="h3" className={classes.title}>
            Manual Order
          </Typography>
        </Grid>
        <Grid item>
          <Link to={`${url}/add`} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
                color: "white",
                cursor: "pointer",
              }}
            >
              Add Order
            </Button>
          </Link>
        </Grid>
      </Grid>
      <div className={classes.miandiv}>
        {data.length > 0 && (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        )}
      </div>
    </>
  );
}

export default Order;
