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

function Message() {
  const classes = useStyles();
  let history = useHistory();
  let { path, url } = useRouteMatch();
  // const [data, setDate] = useState(orders);
  const [rowdata, setRowdata] = useState([]);
  const [success, setSuccess] = useState(false);
  const handleDelete = (_id) => {

    axios
      .delete(`https://stock-manager-backend-indol.vercel.app/API/feedback/${_id}`)
      .then((res) => {
        // history.push("http://localhost:3000/store");
        toast.success(res.data.message)
        setRowdata(rowdata);
        setSuccess(true);
        history.push("/admin");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    // { field: "id", headerName: "Name", width: 195 },
    {
      field: "email",
      headerName: "Email",
      width: 400,
      editable: true,
    },
    {
      field: "feedback",
      headerName: "Feedback",
      width: 400,
      editable: true,
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
      width: 260,
    },
  ];

  useEffect(async () => {
    await axios
      .get("https://stock-manager-backend-indol.vercel.app/API/feedback")
      .then((res, req) => {
        // history.push("http://localhost:3000/store");

        setRowdata(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
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
            Feedback
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
    </>
  );
}

export default Message;
