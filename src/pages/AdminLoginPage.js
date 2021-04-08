import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

import Login from "../components/LoginPage/Login/Login";

function AdminLoginPage(props) {
  const errorStyle = {
    borderWidth: "2px",
    borderColor: "red",
  };

  const [isLogin, setisLogin] = useState(false);

  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    if (user.role && user.role === 1) {
      setisLogin(true);
    }
  }, [user]);

  return (
    <React.Fragment>
      {!isLogin ? (
        <div
          className="container"
          style={{ paddingTop: 100, backgroundColor: "cyan" }}
        >
          <div className="row">
            <div className="col-md-4 m-auto text-center">
              <h2>Đăng Nhập Vào Admin</h2>
              <Login errorStyle={errorStyle} />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to={`/admin/${user.email}`} />
      )}
    </React.Fragment>
  );
}

export default AdminLoginPage;
