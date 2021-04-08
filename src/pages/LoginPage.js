import React from "react";

import { useSelector } from "react-redux";
import Login from "../components/LoginPage/Login/Login";
import Register from "../components/LoginPage/Register/Register";
LoginPage.propTypes = {};

function LoginPage(props) {
  const errorStyle = {
    borderWidth: "2px",
    borderColor: "red",
  };

  const isRegister = useSelector((state) => state.login.isRegister);

  return (
    <React.Fragment>
      <div
        className="container"
        style={{ paddingTop: 100, backgroundColor: "cyan" }}
      >
        <div className="row">
          <div className="col-12">
            {isRegister ? (
              <Login errorStyle={errorStyle} />
            ) : (
              <Register errorStyle={errorStyle} />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LoginPage;
