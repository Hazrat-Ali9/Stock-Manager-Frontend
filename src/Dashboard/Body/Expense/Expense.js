import { DataGrid } from "@material-ui/data-grid";
import React, { useState, useEffect } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import pic from "../../../pics/m1.jpg";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import sales from "../DisplayItem";
import axios from "axios";
import { toast } from "react-toastify";

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
let tenantID = localStorage.getItem("tenantId");
function Expense() {
  let history = useHistory();
  const classes = useStyles();
  let { path, url } = useRouteMatch();
  const [rowdata, setRowdata] = useState([]);
  // const [data, setDate] = useState(sales);
  // const handleDelete = (id) => {
  //   setDate(data.filter((item) => item.id !== id));
  // };

  const handleDelete = (_id) => {
    axios
      .delete(`https://stock-manager-backend-indol.vercel.app/API/expense/${_id}`)
      .then((res) => {
        // history.push("http://localhost:3000/store");

        setRowdata(rowdata);
        toast.success("Expense Deleted Successfully");

        history.push("/admin");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error Deleting Expense");
      });
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 100 },
    {
      field: "product_name",
      headerName: "Product_Name",
      width: 200,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 600,
      editable: true,
    },
    {
      field: "labourExpense",
      headerName: "Labour_Expense",
      width: 200,
      editable: true,
    },
    {
      field: "travellingExpense",
      headerName: "Travelling_Expense",
      width: 200,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      editable: true,
    },
    {
      field: "time",
      headerName: "Time",
      width: 200,
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
              onClick={() => handleDelete(params.row._id)}
            >
              <DeleteOutlineIcon style={{ color: "red", marginRight: "5px" }} />
            </Button>

            <Link to={`${url}/${params.row._id}`}>
              <Button variant="contained">
                <EditIcon style={{ color: "blue", cursor: "pointer" }} />
              </Button>
            </Link>
          </>
        );
      },
      width: 160,
    },
  ];
  useEffect(() => {
    debugger;
    axios
      .get(`https://stock-manager-backend-indol.vercel.app/API/expense/tenant/${tenantID}`)
      .then((res, req) => {
        // history.push("http://localhost:3000/store");

        setRowdata(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
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
            Expense
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
              Add Expense
            </Button>
          </Link>
        </Grid>
      </Grid>
      {rowdata.length > 0 && (
        <div className={classes.miandiv}>
          <DataGrid
            rows={rowdata}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      )}
    </>
  );
}

export default Expense;
