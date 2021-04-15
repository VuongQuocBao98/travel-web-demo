import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AdminLoginPage from "./AdminLoginPage";
import AdminManagerPage from "./AdminManagerPage";
import NotFoundPage from "./NotFoundPage";

function AdminPage(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/admin/login" component={AdminLoginPage} />
          <Route exact path="/admin/:id" component={AdminManagerPage} />
          <Route exact path="" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default AdminPage;
