import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import firebase from "../firebase";
import { useDispatch } from "react-redux";
import { isLogin, setUser } from "../app/LoginSlice";
import CusPage from "../pages/CusPage";
import AdminPage from "../pages/AdminPage";

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

  return (
    <BrowserRouter>
      <div id="wrapper">
        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={CusPage} />
        </Switch>
        {/* <Header />
        <Switch>{showRouters(routers)}</Switch>
        <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
