import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Popup from "./Popup";
import AddressEditPopup from "./AddressEditPopup"; // New component for address editing
import { OrderCheckout } from "../Actions/Order";

const useStyles = makeStyles((theme) => ({
  outer: {
    backgroundColor: "white",
    boxShadow: "0 5px 20px #777",
    marginBottom: "0.5em",
    paddingLeft: "1em",
    borderRadius: "8px",
  },
  photo: {
    width: "100px",
    borderRadius: "10px",
    height: "100px",
    borderBottom: "1px solid grey",
  },
  actionbtn: {
    marginRight: "1em",
    marginLeft: "1em",
  },
  h2: {
    backgroundColor: "#141A46",
    borderRadius: "10px",
    padding: "10px",
    color: "white",
    boxShadow: "0 5px 20px #777",
  },
  outer2: {
    paddingTop: "5px",
    marginTop: "5px",
    backgroundColor: "white",
    boxShadow: "0 5px 20px #777",
  },
  emptyCartMessage: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "1.2em",
    color: "#777",
  },
  quantityButton: {
    minWidth: "30px",
    padding: "5px",
  },
}));

function Cart() {
  const classes = useStyles();
  const [productData, setProductData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [openAddressEditPopup, setOpenAddressEditPopup] = useState(false); // New state for address editing popup
  const [address, setAddress] = useState(localStorage.getItem("address") || ""); // State to manage address
  const user_id = localStorage.getItem("userID");

  // Fetch cart data
  const fetchCartData = async () => {
    try {
      const response = await axios.get(`https://stock-manager-backend-indol.vercel.app/API/cart/${user_id}`);
      setProductData(response.data.cartItems || []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // Handle item deletion
  const handleDeleteItem = async (productId) => {
    try {
      await axios.delete(`https://stock-manager-backend-indol.vercel.app/API/cart/${user_id}/${productId}`);
      fetchCartData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle quantity update
  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(`https://stock-manager-backend-indol.vercel.app/API/cart/updatequantity/${user_id}/${productId}`, {
        quantity: newQuantity,
      });
      fetchCartData();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    // Extract tenant_id from the first product in the cart
    const tenant_id = productData[0].product.Tenant_id;
  
    const payload = {
      address: address, // Use the updated address
      totalAmount: price,
      user_id: user_id,
      payment: "COD",
      tenant_id: tenant_id, // Include tenant_id in the payload
      items: productData.map((data) => ({
        product: data.product._id,
        quantity: data.quantity,
        tenant_id: data.product.Tenant_id, // Include tenant_id for each product
      })),
    };
  
    OrderCheckout(payload);
    setOpenPopup(false); // Close the popup after placing the order
    fetchCartData(); // Refresh the cart data
  };

  // Calculate total price
  let price = 0;
  productData.forEach((item) => {
    price += item.price * item.quantity;
  });

  return (
    <div>
      <h2 className={classes.h2}>Cart Items</h2>

      {productData.length === 0 ? (
        <div className={classes.emptyCartMessage}>Your cart is empty.</div>
      ) : (
        <>
          {productData.map((item) => (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: "1em 2em" }}
              className={classes.outer}
              key={item.product._id}
            >
              <Grid item xs={3} sm={4.5}>
                <img
                  src={`https://stock-manager-backend-indol.vercel.app/uploads/${item.product.picture}`}
                  alt="title"
                  className={classes.photo}
                />
              </Grid>
              <Grid item xs={3} sm={4.5} style={{ textAlign: "center" }}>
                <Grid container direction="column">
                  <Grid item style={{ marginBottom: "2px" }}>
                    <b>Title:</b> {item.product.name}
                  </Grid>
                  <Grid item style={{ marginBottom: "2px" }}>
                    <b>Price:</b> {item.price}
                  </Grid>
                  <Grid item style={{ marginBottom: "2px" }}>
                    <b>Quantity:</b>
                    <Button
                      className={classes.quantityButton}
                      onClick={() =>
                        handleUpdateQuantity(item.product._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      className={classes.quantityButton}
                      onClick={() =>
                        handleUpdateQuantity(item.product._id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </Grid>
                  <Grid item style={{ marginBottom: "2px" }}>
                    <b>Total:</b> {item.price * item.quantity}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3} sm={3} style={{ textAlign: "right" }}>
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteItem(item.product._id)}
                >
                  <MdDelete fontSize="large" color="red" />
                </Button>
              </Grid>
            </Grid>
          ))}

          <Grid
            container
            justifyContent="flex-end"
            spacing={2}
            alignItems="center"
            className={classes.outer2}
          >
            <Grid item>
              <b>Total:</b>
            </Grid>
            <Grid item>
              <b>${price}</b>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setOpenPopup(true)}
              >
                Checkout
              </Button>
            </Grid>
          </Grid>
        </>
      )}

      {/* Checkout Popup */}
      <Popup
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
      handleCheckout={handleCheckout}
      setOpenAddressEditPopup={setOpenAddressEditPopup}
    />

    {/* Address Edit Popup */}
    <AddressEditPopup
      openPopup={openAddressEditPopup}
      setOpenPopup={setOpenAddressEditPopup}
      address={address}
      setAddress={setAddress}
    />
    </div>
  );
}

export default Cart;