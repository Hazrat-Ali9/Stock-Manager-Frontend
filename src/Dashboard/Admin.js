import React from "react";
import HeaderComponent from "./Header/HeaderComponent";
import { BrowserRouter } from "react-router-dom";
function Admin() {
  return (
    <BrowserRouter>
      <HeaderComponent />
    </BrowserRouter>
  );
}

export default Admin;
