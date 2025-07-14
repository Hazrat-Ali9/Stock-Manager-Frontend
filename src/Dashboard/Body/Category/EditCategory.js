import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import FlashMessage from "../../../Pages/FlashMessage";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import Editform from "./Editform";
import {
  getCategory,
  editCategory,
} from "../../../Actions/Categories/category";
import { Form } from "react-bootstrap";
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
let tenantID = localStorage.getItem("tenantId");
function AddCategory() {
  let history = useHistory();
  let { id } = useParams();
  const classes = useStyles();
  const [getData, setData] = useState({});

  const { register, handleSubmit, reset, control } = useForm();

  const [success, setSuccess] = useState(false);

  useEffect(() => {

    getCategory(id, setData);
  }, []);

  

  let Name = getData.name;
  const [dataName, setDataname] = useState(getData?.name);

  // const functionName = async (data, history) => {

  //   editCategory( data, history,id,setSuccess)
  //   // await axios
  //   //   .put(`https://stock-manager-backend-indol.vercel.app/API/categories/${id}`, data)
  //   //   .then((res) => {
  //   //     console.log(res.data);
  //   //     history.push("/category");
  //   //     setSuccess(true);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  //   // setSuccess(false);
  // };

  const onSubmit = (data) => {
    debugger;
    if (!data.id) {
      data.id = getData.id;
    }
    if (!data.name) {
      data.name = getData.name;
    }
    // functionName(data, history);
    editCategory(data, history, id, setSuccess);
    reset();
  };

  return (
    <div>
      <h1>Add Category</h1>
      {/* {getdata ? (
        <Editform _id={id} name={getdata?.name} id={getdata?.id} />
      ) : (
        "loading"
      )} */}

      <Grid container className={classes.maingrid} justifyContent="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={2} container justifyContent="center">
            <Grid item sm={12} md={12}>
              <Typography variant="h5"> Edit Details</Typography>
            </Grid>
            {/* <Grid item xs={12} sm={12}> */}
            {/* <TextField
                // value={dataName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                type="text"
                name="name"
                {...register("name")}
              /> */}
            <Grid item>
              <Grid container>
                <Grid item>
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label> Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      {...register("name")}
                      defaultValue={getData.name && getData.name}
                      placeholder="Enter category name"
                    />
                  </Form.Group>
                </Grid>
                <Grid item>
                  <Form.Group style={{ marginLeft: ".25em" }} className="mb-3">
                    <Form.Label> Category Id</Form.Label>
                    <Form.Control
                      type="text"
                      name="id"
                      {...register("id")}
                      defaultValue={getData.id && getData.id}
                      placeholder="Enter Id"
                    />
                  </Form.Group>
                </Grid>
              </Grid>
            </Grid>
            {/* </Grid> */}
            {/* <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="id"
                {...register("id")}
              />
            </Grid> */}

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
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          ;
        </form>
        {success ? <FlashMessage message={"Category Edit"} /> : ""}
      </Grid>
    </div>
  );
}

export default AddCategory;
