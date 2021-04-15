import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import firebase from "../firebase";
import { useDispatch } from "react-redux";
import { isLogin, setUser } from "../app/LoginSlice";
import CusPage from "../pages/CusPage";
import AdminPage from "../pages/AdminPage";
import routers from "../router";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function App() {
  const dispatch = useDispatch();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      firebase
        .database()
        .ref("users/" + user.uid)
        .on("value", (snapshot) => {
          const data = snapshot.val();
          const action = setUser({
            email: data.email,
            role: data.role,
            emailVerified: user.emailVerified,
            name: data.name,
            avatarUrl: data.avatarUrl,
            userId: user.uid,
          });
          const Login = isLogin(true);
          dispatch(Login);
          dispatch(action);
        });
    } else {
      // No user is signed in.
    }
  });
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
    <BrowserRouter>
      <div id="wrapper">
        <Switch>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/">
            <Header />
            <Switch>{showRouters(routers)}</Switch>
            <Footer />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
