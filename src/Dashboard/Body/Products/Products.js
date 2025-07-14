import { DataGrid } from "@material-ui/data-grid";
import React, { useState, useEffect } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
// import pic from "../../../pics/m1.jpg";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import FlashMessage from "../../../Pages/FlashMessage";
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
function Products() {
  const classes = useStyles();
  let { path, url } = useRouteMatch();
  const [data, setDate] = useState(sales);
  const [rowdata, setRowdata] = useState([]);
  const [success, setSuccess] = useState(false);
  let history = useHistory();

  const handleDelete = (_id) => {

    axios
      .delete(`https://stock-manager-backend-indol.vercel.app/API/products/${_id}`)
      .then((res) => {
        // history.push("http://localhost:3000/store");
        toast.success(res.data.message);

        setRowdata(rowdata);
        setSuccess(true);
        history.push("/admin");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(async () => {
    await axios
      .get(`https://stock-manager-backend-indol.vercel.app/API/products/tenant/${tenantID}`)
      .then((res, req) => {
        // history.push("http://localhost:3000/store");

        setRowdata(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 190,
      editable: true,
      renderCell: (params) => {
        return (
          <>
            <img
              src={`https://stock-manager-backend-indol.vercel.app/uploads/${params.row.picture}`}
              style={{ width: "50px", height: "50px", marginRight: "5px" }}
              alt=""
            />
            {params.row.name}
          </>
        );
      },
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 140,
      editable: true,
    },
    {
      field: "color",
      headerName: "Color",
      width: 130,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
      editable: true,
    },
    {
      field: "time",
      headerName: "Time",
      width: 130,
      editable: true,
    },
    {
      field: "Tenant_id",
      headerName: "Tenant",
      width: 130,
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

            <Link to={`${url}/` + params.row._id}>
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
            Products
          </Typography>
        </Grid>
        <Grid item>
          <Link
            to="/products/add"
            to={`${url}/add`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
                color: "white",
                cursor: "pointer",
              }}
            >
              Add New
            </Button>
          </Link>
        </Grid>
      </Grid>
      {rowdata.length > 0 && (
        <div className={classes.miandiv}>
          <DataGrid
            rows={rowdata}
            columns={columns}
            pageSize={7}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      )}
      {/* {success ? <FlashMessage message={"Category Delete"} /> : ""} */}
    </>
  );
}

export default Products;
