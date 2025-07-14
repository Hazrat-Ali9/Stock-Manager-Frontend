import React, { useState, useEffect } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"; // Correct import for styles

const useStyles = makeStyles((theme) => ({
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 20px #777",
    zIndex: 1500, // Ensure this is higher than other elements
  },
  buttonContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
}));

function AddressEditPopup({ openPopup, setOpenPopup, address, setAddress }) {
  const classes = useStyles();
  const [newAddress, setNewAddress] = useState(address);

  // Update local state when the `address` prop changes
  useEffect(() => {
    setNewAddress(address);
  }, [address]);

  // Handle address input change
  const handleAddressChange = (e) => {
    setNewAddress(e.target.value); // Update the local state
  };

  // Save the address and close the popup
  const handleSaveAddress = () => {
    setAddress(newAddress); // Update the address in the parent component
    localStorage.setItem("address", newAddress); // Save the address to localStorage
    setOpenPopup(false); // Close the popup
  };

  return (
    openPopup && (
      <div className={classes.popup}>
        <Typography variant="h6">Edit Address</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={newAddress} // Bind the value to the local state
          onChange={handleAddressChange} // Update the state on change
          variant="outlined"
          placeholder="Enter your address"
          disabled={false} // Ensure this is not true
          readOnly={false} // Ensure this is not true
        />
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveAddress}
          >
            Save Address
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenPopup(false)}
          >
            Exit
          </Button>
        </div>
      </div>
    )
  );
}

export default AddressEditPopup;