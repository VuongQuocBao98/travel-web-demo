import React from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routers from "../router";

function CusPage(props) {
  const showRouters = (routers) => {
    let show = null;
    if (routers.length > 0) {
      show = routers.map((router, index) => {
        return (
          <Route
            key={index}
            path={router.path}
            exact={router.exact}
            component={router.main}
          />
        );
      });
    }
    return show;
  };
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Switch>{showRouters(routers)}</Switch>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default CusPage;
