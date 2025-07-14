import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import UserRegister from "../src/Form/UserRegister";
import Login from "../src/Form/Login";
import TenantLogin from "../src/Form/TenantLogin";
import Admin from "./Dashboard/Admin";
import Store from "../src/Store/Store";
import AdminLogin from "../src/Form/AdminLogin"
import CreateNew from "../src/Form/CreateNewTenant";
import AdminRegister from "../src/Form/AdminRegister";
import ForgotPassword from "../src/Form/ForgotPassword";
import AdminForgotPass from "../src/Form/AdminForgotPass";
import ResetPassword from "../src/Form/ResetPassword";
import AdminResetPass from "./Form/AdminResetPass";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// PrivateRoute for authenticated users/admins
const PrivateRoute = ({ component: Component, isAdmin, ...rest }) => {
  const token = localStorage.getItem(isAdmin ? "admintoken" : "token");
  //console.log(`PrivateRoute: isAdmin=${isAdmin}, token=${token}`);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to={isAdmin ? "/adminlogin" : "/"} />
        )
      }
    />
  );
};

// PublicRoute for login/signup pages (restrict access if token exists)
const PublicRoute = ({ component: Component, isAdmin, ...rest }) => {
  const token = localStorage.getItem(isAdmin ? "admintoken" : "token");
  //console.log(`PublicRoute: isAdmin=${isAdmin}, token=${token}`);
  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? (
          <Component {...props} />
        ) : (
          <Redirect to={isAdmin ? "/admin" : "/store"} />
        )
      }
    />
  );
};

function App() {
  const clientToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("admintoken");



  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        />
      <BrowserRouter>
        <Switch>
          {/* Redirect based on token */}
          <Route
            exact
            path="/"
            render={() => {
              if (clientToken) {
                return <Redirect to="/store" />;
              } else if (adminToken) {
                return <Redirect to="/admin" />;
              } else {
                return <Login />;
              }
            }}
          />

          {/* Public Routes */}
          <PublicRoute path="/adminlogin" exact component={AdminLogin} isAdmin={true} />
          <PublicRoute path="/tenantlogin" exact component={TenantLogin} isAdmin={false} />
          <PublicRoute path="/tenantlogin/:token" exact component={TenantLogin} isAdmin={false} />
          <PublicRoute path="/createnew" exact component={CreateNew} isAdmin={false} />
          <PublicRoute path="/register" exact component={UserRegister} isAdmin={false} />
          <PublicRoute path="/registeradmin" exact component={AdminRegister} isAdmin={true} />
          <PublicRoute path="/forgotpassword" exact component={ForgotPassword} isAdmin={false} />
          <PublicRoute path="/adminforgotpassword" exact component={AdminForgotPass} isAdmin={true} />
          <PublicRoute path="/resetpassword" exact component={ResetPassword} isAdmin={false} />
          <PublicRoute path="/adminresetpassword" exact component={AdminResetPass} isAdmin={true} />

          {/* Private Routes */}
          <PrivateRoute path="/admin" exact component={Admin} isAdmin={true} />
          <PrivateRoute path="/admin/:token" exact component={Admin} isAdmin={true} />
          <PrivateRoute path="/store" exact component={Store} isAdmin={false} />
          <PrivateRoute path="/store/:token" exact component={Store} isAdmin={false} />

          {/* Fallback Route */}
          <Route
            render={() => {
              //console.log("No route matched, rendering fallback");
              return <div>404 - Page Not Found</div>;
            }}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App