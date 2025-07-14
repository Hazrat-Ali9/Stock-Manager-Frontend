import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { FcPrint } from "react-icons/fc";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import FlashMessage from "../../../Pages/FlashMessage";
import EditCategory from "../Category/EditCategory";
import axios from "axios";
import {
  activateInActiveUser,
  getAllUser,
} from "../../../Actions/User/getUser";
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

function People() {
  const classes = useStyles();
  let history = useHistory();
  let { path, url } = useRouteMatch();
  // const [data, setDate] = useState(orders);
  const [rowdata, setRowdata] = useState([]);
  const [success, setSuccess] = useState(false);
  const handleDelete = (_id) => {
    console.log(_id);

    // axios
    //   .delete(`https://stock-manager-backend-indol.vercel.app/API/categories/${_id}`)
    //   .then((res) => {
    //     // history.push("http://localhost:3000/store");
    //     console.log(res.data);

    //     setRowdata(rowdata);
    //     setSuccess(true);
    //     history.push("/admin");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleActiveStatus = (data) => {
    debugger;
    activateInActiveUser(data, setRowdata);
  };
  const columns = [
    // { field: "id", headerName: "Name", width: 195 },
    {
      field: "firstname",
      headerName: "FirstName",
      width: 200,
      editable: false,
    },
    {
      field: "lastname",
      headerName: "LastName",
      width: 200,
      editable: false,
    },

    {
      field: "email",
      headerName: "Email",
      width: 400,
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 200,
    },
    {
      field: "ActivationStatus",
      headerName: "Activation_Status",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <>
            <Link>
              <Button
                variant="contained"
                style={{
                  marginRight: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(params.row._id)}
              >
                <DeleteOutlineIcon
                  style={{ color: "red", marginRight: "5px" }}
                />
              </Button>
            </Link>
          </>
        );
      },
      width: 120,
    },
    {
      field: "activate",
      headerName: "Change Status",
      renderCell: (params) => {
        let data = {
          email: params.row.email,
          id: params.row._id,
        };
        return (
          <>
            {/* <Link> */}
            <Button
              variant="contained"
              style={{
                marginRight: "5px",
                // cursor: "pointer",
                backgroundColor: `${
                  params.row.ActivationStatus ? "red" : "green"
                }`,
                color: "white",
              }}
              onClick={() =>
                handleActiveStatus(
                  params.row.ActivationStatus ? data : params.row.email
                )
              }
            >
              {params.row.ActivationStatus ? "Deactivate" : "Activate"}
            </Button>
            {/* </Link> */}
          </>
        );
      },
      width: 160,
    },
  ];

  useEffect(async () => {
    getAllUser(setRowdata);
  }, []);

  const rows = [
    {
      id: 1,
      name: "Ahsan",
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
            People
          </Typography>
        </Grid>
      </Grid>

      {rowdata.length > 0 && (
        <div className={classes.miandiv}>
          <DataGrid
            rows={rowdata}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      )}
      {success ? <FlashMessage message={"Category Delete"} /> : ""}
    </>
  );
}

export default People;
