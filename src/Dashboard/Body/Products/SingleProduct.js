import { Button, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { FcUpload } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { Form } from "react-bootstrap";
import FlashMessage from "../../../Pages/FlashMessage";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  img: {
    width: "250px",
    height: "200px",
    [theme.breakpoints.down("md")]: {
      width: "180px",
      height: "150px",
    },
    title: {
      marginTop: "5em",
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
function SingleProduct() {
  let history = useHistory();
  let { id } = useParams();
  const classes = useStyles();
  const [rowdata, setRowdata] = useState({});

  const { register, handleSubmit } = useForm();
  const [available, setAvailable] = useState("");
  const [Category, setCategory] = useState("");
  const [showImage, setShowImage] = useState("");
  const [success, setSuccess] = useState(false);
  const [stateimage, Setsatateimage] = useState();

  const [productdata, setProductData] = useState({
    name: "",
    price: "",
    stock: "",
    color: "",
    picture: "",
    Tenant_id: "",
    category: "",
    date: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get(`https://stock-manager-backend-indol.vercel.app/API/categories/${tenantID}`)
      .then((res) => {
        debugger;
        setCategory(res.data);
        //   history.push("/store");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`https://stock-manager-backend-indol.vercel.app/API/products/${id}`)
      .then((res) => {
        debugger;
        // history.push("http://localhost:3000/store");
        setRowdata(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // const updateProduct = (data) => {
  //   debugger;
  //   axios({
  //     method: "put",
  //     url: `https://stock-manager-backend-indol.vercel.app/API/products/${id}`,
  //     data: data,
  //     headers: { "Content-Type": "form-data" },
  //   })
  //     // axios
  //     //   .put(`https://stock-manager-backend-indol.vercel.app/API/products/${id}`, data)
  //     .then((res) => {
  //       debugger;
  //       // history.push("http://localhost:3000/store");
  //       console.log(res.data);
  //       setRowdata(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const handleimage = (e) => {
  //   debugger;
  //   // Setsatateimage(e.target.files[0]);
  //   const selected = e.target.files[0];
  //   const Allowed_Tpes = ["picture/*"];
  //   if (selected && Allowed_Tpes) {
  //     // formData.append("picture", e.target.files[0]);
  //     console.log("select");
  //   } else {
  //     console.log("file not supported");
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     debugger;
  //     if (reader.readyState === 2) {
  //       debugger;
  //       setShowImage(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };
  let formData = new FormData();

  const updateProduct = async (info) => {
    debugger;
    let formData = new FormData();
    formData.append("name", info.name);
    formData.append("price", info.price);
    formData.append("id", info.id);
    formData.append("stock", info.stock);
    formData.append("color", info.color);
    formData.append("image", info.image);
    formData.append("category", info.category);
    formData.append("date", info.date);
    formData.append("time", info.time);
    formData.append("Tenant_id", info.Tenant_id);
    formData.append("description", info.description);

    axios({
      method: "put",
      url: `https://stock-manager-backend-indol.vercel.app/API/products/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        toast.success("Product Updated");
      })
      .catch(function (response) {
        console.error(response);});
  };

  const handleimage = (e) => {
    debugger;
    Setsatateimage(e.target.files[0]);
    const selected = e.target.files[0];
    const Allowed_Tpes = ["picture/*"];
    if (selected && Allowed_Tpes) {
      formData.append("picture", e.target.files[0]);
    } else {
      toast.error("file not supported");
    }
  };

  const handleChange2 = (event) => {
    setAvailable(event.target.value);
  };

  const handleChange1 = (event) => {
    debugger;
    event.preventDefault();
    const { value, name } = event.target;
    setProductData({
      ...productdata,
      [name]: value,
    });
    // setCategory(event.target.value);
  };
  const onSubmit = (data) => {
    debugger;
    const payload = {
      name: data.name ? data.name : rowdata.name,
      price: data.price ? Number(data.price) : Number(rowdata.price),
      stock: data.stock ? Number(data.stock) : Number(rowdata.stock),
      color: data.color ? data.color : rowdata.color,
      category: data.category ? data.category : rowdata.category,
      date: rowdata.date,
      Tenant_id: rowdata.Tenant_id,
      description: data.description ? data.description : rowdata.description,
      id: data.id ? data.id : rowdata.id,
      time: data.time ? data.time : rowdata.time,
      image: !data.image.length ? rowdata.picture : data.image[0],
    };

    debugger;
    updateProduct(payload);
  };
  return (
    <div>
      <h1>Edit Product</h1>

      <Grid container className={classes.maingrid}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={2} container>
            <Grid item md={8}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      {...register("name")}
                      defaultValue={rowdata.name && rowdata.name}
                      placeholder="Enter Name"
                    />
                  </Form.Group>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                      type="text"
                      name="color"
                      {...register("color")}
                      defaultValue={rowdata.color && rowdata.color}
                      placeholder="Enter Color"
                    />
                  </Form.Group>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label>price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      {...register("price")}
                      defaultValue={rowdata.price && rowdata.price}
                      placeholder="Enter Price"
                    />
                  </Form.Group>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                      type="text"
                      name="id"
                      {...register("id")}
                      defaultValue={rowdata.id && rowdata.id}
                      placeholder="Enter Id"
                    />
                  </Form.Group>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    onChange={handleChange1}
                    name="category"
                    value={
                      rowdata.category ? rowdata.category : productdata.category
                    }
                    as="select"
                  >
                    <option hidden>Open this select menu</option>
                    {Category.length > 0 &&
                      Category.map((cat, i) => (
                        <option key={i} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                  </Form.Control>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"
                      {...register("stock")}
                      defaultValue={rowdata.stock && rowdata.stock}
                      placeholder="Enter Stock"
                    />
                  </Form.Group>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      {...register("description")}
                      defaultValue={rowdata.description && rowdata.description}
                      placeholder="Enter Description"
                    />
                  </Form.Group>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Form.Group style={{ marginRight: ".25em" }} className="mb-3">
                    <Form.Label>Tenant_Id</Form.Label>
                    <Form.Control
                      type="text"
                      readOnly
                      name="Tenant_id"
                      {...register("Tenant_id")}
                      defaultValue={rowdata.Tenant_id && rowdata.Tenant_id}
                      placeholder="Enter Id"
                    />
                  </Form.Group>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4}>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={1}
                style={{ marginBottom: "5em" }}
              >
                <Grid item>
                  <img
                    src={`https://stock-manager-backend-indol.vercel.app/uploads/${
                      showImage ? showImage : rowdata.picture
                    }`}
                    alt="photo"
                    className={classes.img}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="picture"
                    type="file"
                    accept="image/*"
                    onChange={handleimage}
                    {...register("image")}
                  />

                  {/* <FcUpload size="3em" type="file" /> */}
                  {/* </input> */}
                </Grid>
              </Grid>

              <Grid container justifyContent="center" spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      history.push("/products");
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
                    //   history.push("/products");
                    // }}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        {success ? <FlashMessage message={"product Edit"} /> : ""}
      </Grid>
    </div>
  );
}

export default SingleProduct;
