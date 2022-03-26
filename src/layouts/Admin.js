import React, { useEffect } from "react";
// react library for routing
import { useLocation, Route, Switch } from "react-router-dom";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { isAuthenticated } from "api/auth";
import routes, { adminRoutes, viewerRoutes } from "routes.js";

function Admin() {
  const [sidenavOpen, setSidenavOpen] = React.useState(true);
  const location = useLocation();
  const { user } = isAuthenticated();
  const mainContentRef = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, [location]);

  console.log(user.role);
  console.log(adminRoutes);

  let routes1 = [];
  // for (const key in user.role) {
  //   console.log(key);
  //   routes1.push(key);
  // }

  // let routes1 = [];
  let permittedRoute = [];

  for (const key in user.role) {
    console.log(key);
    console.log(user.role[key]);
    // routes1.push(key);

    let permitted = adminRoutes.find(
      (route) => key.toString() === route.name.toString()
    );
    console.log(permitted);
    if (permitted && permitted.views) {
      // let permittedViews = permitted.views.filter(
      //   (view) => user.role[key].toString() === view.permission.toString()
      // );
      let permittedViews = permitted.views.filter(
        (view) => "view" === view.permission.toString() 
      );
      permitted.views = permittedViews;
    }
    if (permitted) {
      permittedRoute.push(permitted);
    }
    console.log(permitted);
  }

  console.log(permittedRoute);

  const getRoutes = (routes) => {
    // console.log(routes);
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  // toggles collapse between mini sidenav and normal
  const toggleSidenav = (e) => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    setSidenavOpen(!sidenavOpen);
  };
  const getNavbarTheme = () => {
    return location.pathname.indexOf("admin/alternative-dashboard") === -1
      ? "dark"
      : "light";
  }; 

  return (
    <>
      <Sidebar
        routes={permittedRoute}
        toggleSidenav={toggleSidenav}
        sidenavOpen={sidenavOpen}
        logo={{
          innerLink: "/",
          imgSrc: require("assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar
          theme={getNavbarTheme()}
          toggleSidenav={toggleSidenav}
          sidenavOpen={sidenavOpen}
          brandText={getBrandText(location.pathname)}
        />
        <Switch>{getRoutes(routes)}</Switch>
        <AdminFooter />
      </div>
      {sidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={toggleSidenav} />
      ) : null}
    </>
  );
}

export default Admin;
