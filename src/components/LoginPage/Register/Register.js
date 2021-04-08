import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { isRegister } from "../../../app/LoginSlice";
import { useForm } from "react-hook-form";
import firebase from "../../../firebase";
import { Redirect } from "react-router";

Register.propTypes = {
  errorStyle: PropTypes.object,
};

Register.defaultProps = {
  errorStyle: {},
};

function Register(props) {
  const { errorStyle } = props;
  const dispatch = useDispatch();

  // REACT HOOK FORM
  const { register, handleSubmit, errors, watch } = useForm();

  //   thay đổi form dang nhap
  const redirectLoginForm = () => {
    const action = isRegister();
    dispatch(action);
  };

  //   password confirm
  const confirm = (pass, cfpass) => {
    if (pass === cfpass) return true;
    return false;
  };

  // USE STATE
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [spiner, setSpiner] = useState(false);

  //   hook form
  const onSubmit = (data) => {
    setSpiner(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.passwordConfirm)
      .then(async (userCredential) => {
        // Signed in
        let user = userCredential.user;
        setErrorMessage(null);
        await firebase
          .database()
          .ref("users/" + user.uid)
          .set({
            email: user.email,
            role: 0,
            name: user.email,
            creatAt: firebase.database.ServerValue.TIMESTAMP,
          });
        setSpiner(false);
        setRedirect(true);
      })
      .catch((error) => {
        // var errorCode = error.code;
        setErrorMessage(error.message);
      });
  };

  return (
    <React.Fragment>
      {!redirect ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
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
            {errorMessage !== null ? (
              <p className="mt-1 m-lg-1 text-danger">
                <i className="fas fa-times"></i> Email đã tồn tại
              </p>
            ) : null}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="mật khẩu phải chứa kí tự hoa , thường , ký tự đặt biệt , và từ [6-16] Ký tự"
              style={errors.password ? errorStyle : null}
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
            />
            {errors.password && (
              <p className="mt-1 m-lg-1 text-danger">
                <i className="fas fa-times"></i> {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password confirm</label>
            <input
              type="password"
              className="form-control"
              id="password-confirm"
              placeholder="xác nhận mật khẩu phải trùng khớp với mật khẩu"
              name="passwordConfirm"
              ref={register}
              style={
                !confirm(watch("password"), watch("passwordConfirm"))
                  ? errorStyle
                  : null
              }
            />
            {!confirm(watch("password"), watch("passwordConfirm")) && (
              <p className="mt-1 m-lg-1 text-danger">
                <i className="fas fa-times"></i> Mật Khẩu Và Xác Nhận Mật Khẩu
                Phải Trùng Nhau
              </p>
            )}
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Register{" "}
              {spiner ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden m-lg-2">Loading...</span>
                </div>
              ) : null}
            </button>
            <p
              onClick={redirectLoginForm}
              className="btn btn-info m-lg-5 fw-bold"
            >
              LoginForm
            </p>
          </div>
        </form>
      ) : (
        <Redirect to="/" />
      )}
    </React.Fragment>
  );
}

export default Register;
