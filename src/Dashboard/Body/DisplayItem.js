// import { DataGrid } from "@material-ui/data-grid";
// import React from "react";
// import { Button, Grid, makeStyles } from "@material-ui/core";
// import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
// import EditIcon from "@material-ui/icons/Edit";
// import pic from "../../pics/p.jpg";
// import { Link } from "react-router-dom";
// const useStyles = makeStyles((theme) => ({
//   miandiv: {
//     // width: "100%",
//     height: 450,
//     backgroundColor: "white",
//     border: "1px dashed grey",
//   },
//   avatar: {
//     width: "25px",
//     height: "20px",
//   },
//   delete: {
//     color: "red",
//     marginRight: "5px",
//   },
//   edit: {},
// }));

// const columns = [
//   { field: "id", headerName: "ID", width: 100 },
//   {
//     field: "Name",
//     headerName: "Name",
//     width: 190,
//     editable: true,
//     renderCell: (params) => {
//       return (
//         <>
//           <img
//             src={params.row.avatar}
//             style={{ width: "50px", height: "50px", marginRight: "5px" }}
//             alt=""
//           />
//           {params.row.Name}
//         </>
//       );
//     },
//   },
//   {
//     field: "quantity",
//     headerName: "Quantity",
//     type: "number",
//     width: 140,
//     editable: true,
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     width: 130,
//     editable: true,
//   },
//   {
//     field: "price",
//     headerName: "Price",
//     width: 130,
//     editable: true,
//   },
//   {
//     field: "action",
//     headerName: "Action",
//     renderCell: (params) => {
//       return (
//         <>
//           <Button
//             variant="contained"
//             style={{ marginRight: "5px", cursor: "pointer" }}
//           >
//             <DeleteOutlineIcon style={{ color: "red", marginRight: "5px" }} />
//           </Button>

//           <Link to={""}>
//             <Button variant="contained">
//               <EditIcon style={{ color: "blue", cursor: "pointer" }} />
//             </Button>
//           </Link>
//         </>
//       );
//     },
//     width: 160,
//   },
// ];

const sales = [
  {
    id: 1,
    Name: "Snow",
    avatar:
      "https://thumbs.dreamstime.com/b/close-up-portrait-nice-person-bristle-show-finger-okey-sign-isolated-pink-color-background-203466939.jpg",
    status: "Active",
    quantity: 35,
    price: "$34",
  },
  {
    id: 2,
    Name: "Lannister",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    status: "Active",
    quantity: 42,
    price: "$37",
  },
  {
    id: 3,
    Name: "Lannister",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    status: "Active",
    quantity: 42,
    price: "$37",
  },
  {
    id: 4,
    Name: "Lannister",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    status: "Active",
    quantity: 42,
    price: "$37",
  },
  {
    id: 5,
    Name: "Lannister",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    status: "Active",
    quantity: 42,
    price: "$37",
  },
  {
    id: 6,
    Name: "Lannister",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    status: "Active",
    quantity: 42,
    price: "$37",
  },
  {
    id: 7,
    Name: "Lannister",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    status: "Active",
    quantity: 42,
    price: "$37",
  },
  {
    id: 8,
    Name: "Lannister",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    status: "Active",
    quantity: 42,
    price: "$37",
  },
  {
    id: 9,
    Name: "Lannister",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    status: "Active",
    quantity: 42,
    price: "$37",
  },
];

export default sales;
// function DisplayItem({ title }) {
// //   const classes = useStyles();
// //   return (
// //     <>
// //       <Grid container justifyContent="space-between" alignItems="center">
// //         <Grid item>
// //           <h1>{title}</h1>
// //         </Grid>
// //         <Grid item>
// //           <Button
// //             variant="contained"
// //             style={{
// //               backgroundColor: "green",
// //               color: "white",
// //               cursor: "pointer",
// //             }}
// //           >
// //             Add New
// //           </Button>
// //         </Grid>
// //       </Grid>
// //       <div className={classes.miandiv}>
// //         <DataGrid
// //           rows={rows}
// //           columns={columns}
// //           pageSize={7}
// //           checkboxSelection
// //           disableSelectionOnClick
// //         />
// //       </div>
// //     </>
//   );
// }

// export default DisplayItem;
