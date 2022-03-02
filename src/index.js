/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
// react library for routing
import { BrowserRouter, Route, Switch } from "react-router-dom";

// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "select2/dist/css/select2.min.css";
import "quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// plugins styles downloaded
import "assets/vendor/nucleo/css/nucleo.css";
// core styles
import "assets/scss/argon-dashboard-pro-react.scss?v1.2.0";

import 'antd/dist/antd.css';

// import AdminLayout from "layouts/Admin.js";
// import RTLLayout from "layouts/RTL.js";
// import AuthLayout from "layouts/Auth.js";
// import IndexView from "views/Index.js";
import Login from "views/pages/Login/Login";
import AdminRoutes from "AdminRoutes";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/login' render={(props) => <Login {...props} />} />
      <AdminRoutes />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);


