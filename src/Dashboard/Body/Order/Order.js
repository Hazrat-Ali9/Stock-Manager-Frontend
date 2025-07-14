import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  miandiv: {
    height: 450,
    backgroundColor: "white",
    border: "1px dashed grey",
    [theme.breakpoints.down("md")]: {
      height: 600,
      marginTop: "2em",
    },
  },
  uppergrid: {
    marginTop: "2em",
    marginBottom: "1em",
  },
  delete: {
    color: "red",
    marginRight: "5px",
  },
  edit: {},
}));

function Order() {
  const classes = useStyles();
  let { path, url } = useRouteMatch();
  const [orders, setOrders] = useState([]);
  const tenutId = localStorage.getItem("tenantId");
  // Fetch all orders (regular and manual)
  const fetchOrders = async () => {
    try {
      // Fetch regular orders
      const regularOrdersResponse = await axios.get(`https://stock-manager-backend-indol.vercel.app/API/orders/tenant/${tenutId}`);
      const regularOrders = regularOrdersResponse.data.map((order) => ({
        ...order,
        type: "Regular",
      }));

      // Fetch manual orders
      const manualOrdersResponse = await axios.get("https://stock-manager-backend-indol.vercel.app/API/ManualOrders/");
      const manualOrders = manualOrdersResponse.data.map((order) => ({
        ...order,
        type: "Manual",
      }));

      // Combine regular and manual orders
      const combinedOrders = [...regularOrders, ...manualOrders];
      setOrders(combinedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle order status update
  const handleDeliver = async (orderId, type) => {
    try {
      const endpoint =
        type === "Regular"
          ? `https://stock-manager-backend-indol.vercel.app/API/orders/${orderId}`
          : `https://stock-manager-backend-indol.vercel.app/API/ManualOrders/${orderId}`;

      await axios.put(endpoint, {
        OrderStatus: "Completed",
      });
      fetchOrders(); // Refresh orders after updating status
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Handle order deletion
  const handleDelete = async (orderId, type) => {
    try {
      const endpoint =
        type === "Regular"
          ? `https://stock-manager-backend-indol.vercel.app/API/orders/${orderId}`
          : `https://stock-manager-backend-indol.vercel.app/API/ManualOrders/${orderId}`;

      await axios.delete(endpoint);
      fetchOrders(); // Refresh orders after deletion
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "type",
      headerName: "Type",
      width: 120,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 200,
      valueGetter: (params) => {
        if (params.row.type === "Regular") {
          return `${params.row.user_id?.firstname} ${params.row.user_id?.lastname}`;
        } else {
          return params.row.name || "N/A";
        }
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 150,
      valueGetter: (params) => {
        if (params.row.type === "Regular") {
          return params.row.user_id?.contact || "N/A";
        } else {
          return params.row.contact || "N/A";
        }
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
      valueGetter: (params) => {
        if (params.row.type === "Regular") {
          return params.row.address || "N/A";
        } else {
          return params.row.address || "N/A";
        }
      },
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
    },
    {
      field: "OrderStatus",
      headerName: "Status",
      width: 150,
    },
    {
      field: "deliver",
      headerName: "Deliver",
      renderCell: (params) => {
        return (
          <>
            {params.row.OrderStatus === "pending" && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDeliver(params.row._id, params.row.type)}
              >
                Deliver
              </Button>
            )}
          </>
        );
      },
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              style={{ marginRight: "5px", cursor: "pointer" }}
              onClick={() => handleDelete(params.row._id, params.row.type)}
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

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.uppergrid}
      >
        <Grid item>
          <Typography variant="h3">All Orders</Typography>
        </Grid>
        <Grid item>
          <Button
            to="/ordermanual"
            component={Link}
            variant="contained"
            style={{ backgroundColor: "Green", color: "white" }}
          >
            Manual Order
          </Button>
        </Grid>
      </Grid>
      <div className={classes.miandiv}>
        {orders.length > 0 && (
          <DataGrid
            rows={orders}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row._id} // Use _id as the unique identifier
          />
        )}
      </div>
    </>
  );
}

export default Order;