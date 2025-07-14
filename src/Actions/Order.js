import axios from "axios";
import { toast } from "react-toastify";

let tenantID = localStorage.getItem("tenantId");
const userId = localStorage.getItem("userID");
export const OrderCheckout = (payload) => {
  // debugger;
  axios
    .post(`https://stock-manager-backend-indol.vercel.app/API/orders/placeOrder/${userId}`, payload)
    .then((res) => {
      // debugger;
      toast.success("Order Placed Successfully");
    })
    .then((error) => toast.error("Order Placed Failed"));
};

export const getOrders = (setData) => {
  // debugger;
  axios
    .get(`https://stock-manager-backend-indol.vercel.app/API/orders/tenant/${tenantID}`)
    .then((res) => {
      let managedData = res.data.map((item) => {
        // debugger;
        //console.log(res, "res");
        return {
          id: item._id,
          customerName: item.user_id.firstname + " " + item.user_id.lastname,
          number: item.user_id.contact,
          totalprice: item.totalAmount,
          address: item.address,
          status: item.OrderStatus,
        };
      });
      setData(managedData);
    })
    .then((error) => toast.error("Failed to display Orders"));
};

export const getManualOrders = (setData) => {
  // debugger;
  axios
    .get(`https://stock-manager-backend-indol.vercel.app/API/ManualOrders/tenant/${tenantID}`)
    .then((res) => {
      //console.log(res);
      let managedData = res.data.map((item) => {
        // debugger;
        //console.log(res, "res");
        return {
          id: item._id,
          customerName: item.name,
          number: item.contact,
          totalprice: item.totalAmount,
          address: item.address,
          status: item.OrderStatus,
        };
      });
      setData(managedData);
    })
    .then((error) => toast.error("Failed to display Manual Orders"));
};

export const orderplaced = (id) => {
  // debugger;

  axios
    .put(`https://stock-manager-backend-indol.vercel.app/API/orders/${id}`)
    .then((res) => {
      // debugger;
      toast.success(res.data.message)
    })
    .then((error) => toast.error("Failed to update Order Status"));
};

export const UpdateManualOrderPlaced = (id) => {
  // debugger;

  axios
    .put(`https://stock-manager-backend-indol.vercel.app/API/ManualOrders/${id}`)
    .then((res) => {
      // debugger;
      toast.success("Updated Order Status");
    })
    .then((error) => toast.error("Failed to update Order Status"));
};

export const placeManualOrder = (data) => {
  debugger;

  axios
    .post(
      `https://stock-manager-backend-indol.vercel.app/API/ManualOrders/ManualOrder/${data.tenant_id}`,
      data
    )
    .then((res) => {
      debugger;
      //console.log("Manualorderplaced   ", res.data);
      toast.success(res.data.message)
    })
    .then((error) => toast.error("Failed to place Manual Order"));
};
