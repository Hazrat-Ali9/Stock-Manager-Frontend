import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InsidePopup from "./InsidePopUp";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,

  p: 4,
};

export default function BasicModal({ openPopup, handleCheckout, setOpenAddressEditPopup  }) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={openPopup} onClose={openPopup}>
        <Box sx={style}>
          <InsidePopup openPopup={openPopup} handleCheckout={handleCheckout} setOpenAddressEditPopup={setOpenAddressEditPopup}  />
        </Box>
      </Modal>
    </div>
  );
}
