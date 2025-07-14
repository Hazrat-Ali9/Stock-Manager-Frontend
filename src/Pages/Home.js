import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import bg from "../pics/p.jpg";
import Main from "../menu/main";
import { useState, useEffect } from "react";
import axios from "axios";

const useStyle = makeStyles({
  gridback: {
    backgroundColor: "white",
    margin: "0.5em",
    borderRadius: "50px",
    padding: "20px",
  },
  itemimg: {
    width: "200px",
    height: "200px",
    padding: "10px",
  },
  outer: {
    padding: "10px",
    maxWidth: "100%",
  },
});

function Home() {
  // const [items, setItem] = useState([]);
  // useEffect(async () => {
  //   await axios
  //     .get("https://stock-manager-backend-indol.vercel.app/API/products")
  //     .then((res) => {
  //       let getitems = res.data;
  //       setItem(getitems);
  //       // console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // console.log(items);
  const classes = useStyle();
  return (
    <>
      <Main />
    </>
  );
}

export default Home;
