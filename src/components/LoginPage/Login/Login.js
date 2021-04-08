import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { isRegister } from "../../../app/LoginSlice";
import { useForm } from "react-hook-form";
import firebase from "../../../firebase";
import { useHistory, useRouteMatch } from "react-router";

Login.propTypes = {
  errorStyle: PropTypes.object,
};

Login.defaultProps = {
  errorStyle: {},
};

function Login(props) {
  const { errorStyle } = props;
  const dispatch = useDispatch();

  const checkAdmin = useRouteMatch();

  let history = useHistory();

  const [spiner, setSpiner] = useState(false);

  // REACT HOOK FORM
  const { register, handleSubmit, errors } = useForm();

  const redirectRegisterForm = () => {
    const action = isRegister();
    dispatch(action);
  };

  const [errorMessage, setErrorMessage] = useState(null);
  // Đăng Nhập
  const onSubmit = async (data) => {
    setSpiner(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        firebase
          .database()
          .ref("users/" + user.uid)
          .on("value", (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            if (data.role === 1) {
              setErrorMessage(null);
              setSpiner(false);
              history.push(`/admin/${data.email}`);
            } else {
              setErrorMessage(null);
              setSpiner(false);
              history.push("/");
            }
          });
      })
      .catch((error) => {
        setSpiner(false);
        setErrorMessage(error.message);
        // console.log(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          placeholder="vd : customer1@gmail.com"
          ref={register({
            required: "emai không được bỏ trống",
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "email bạn nhập không hợp lệ",
            },
          })}
          style={errors.email ? errorStyle : null}
        />
        {errors.email && (
          <p className="mt-1 m-lg-1 text-danger">
            <i className="fas fa-times"></i> {errors.email.message}
          </p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="mật khẩu phải chứa kí tự hoa , thường , ký tự đặt biệt , và từ [6-16] Ký tự"
          ref={register({
            required: "Mật Khẩu Không Được Để Trống",
            pattern: {
              value: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
              message:
                "Mật Khẩu Phải Chứa ít Nhất 1 Ký tự số , chữ thường , Chữ In HOA",
            },
            minLength: {
              value: 6,
              message: "Mật Khẩu Phải Nhiều Hơn 6 Ký Tự",
            },
            maxLength: {
              value: 16,
              message: "Mật Khẩu Phải ít hơn 16 Ký Tự",
            },
          })}
          style={errors.password ? errorStyle : null}
        />
        {errors.password && (
          <p className="mt-1 m-lg-1 text-danger">
            <i className="fas fa-times"></i> {errors.password.message}
          </p>
        )}
      </div>
      <div className="mb-3">
        {errorMessage !== null ? (
          <p className="mt-1 m-lg-1 text-danger">
            <i className="fas fa-times"></i>{" "}
            {errorMessage ===
            "The password is invalid or the user does not have a password."
              ? "Mật Khẩu Bạn Nhập Không Chính Xác"
              : "Email Không Tồn Tại"}
          </p>
        ) : null}
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Login{" "}
          {spiner ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden m-lg-2">Loading...</span>
            </div>
          ) : null}
        </button>
        {checkAdmin.path === "/login" ? (
          <p
            onClick={redirectRegisterForm}
            className="btn btn-info m-lg-5 fw-bold"
          >
            RegisterForm
          </p>
        ) : null}
      </div>
    </form>
  );
}

export default Login;
