import React, { useState } from "react";

import { Redirect, useRouteMatch } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { isLogin, setUser } from "../app/LoginSlice";

function ProfilePage(props) {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.login.user.name);

  const avatarUrl = useSelector((state) => state.login.user.avatarUrl);

  // REACT HOOK FORM
  const { register, handleSubmit, watch } = useForm();

  //   use state

  const [sigoutRedirect, setSigoutRedirect] = useState(false);
  const [spiner, setSpiner] = useState(false);
  const [messageUpdate, setMessageUpdate] = useState("");
  const role = useSelector((state) => state.login.user);

  //   Cập Nhật Thông tin người dùng
  const onSubmit = async (data) => {
    setMessageUpdate("");
    setSpiner(true);
    await firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .update({
        name: data.name,
        avatarUrl: data.avatar,
      });
    setSpiner(false);
    setMessageUpdate("Cập Nhật Thông Tin Thành Công");
  };

  //   Đăng Xuất Tài Khoản
  const sigout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const actionSigout = setUser({
          email: null,
          userId: null,
          role: 0,
          emailVerified: false,
          name: null,
        });
        const actionIsLogin = isLogin(false);
        dispatch(actionIsLogin);
        dispatch(actionSigout);
        setSigoutRedirect(true);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <React.Fragment>
      {!sigoutRedirect ? (
        <div
          className="container"
          style={{
            paddingTop: 100,
            backgroundImage: `url(
            "https://floorsplus.ca/wp-content/uploads/2014/04/contact-info-background.png"
          )`,
            minHeight: 600,
          }}
        >
          <div className="row">
            <div className="col-12 text-center text-white">
              <h2 className="fw-bold">Xin Chào</h2>
              <h2 className="fw-bold">
                {match.params.username}{" "}
                <p
                  onClick={sigout}
                  className="btn btn-outline-warning fw-bold text-white"
                >
                  Đăng Xuất
                </p>
              </h2>

              {role.role === 1 ? (
                <h3>Bạn Là có thể truy cập vào Admin</h3>
              ) : null}
            </div>
          </div>

          {/* FORM INFO USER */}
          <div className="row">
            <div className="col-md-4 text-center m-auto">
              <form
                style={{
                  backgroundColor: "Azure",
                  padding: 30,
                  borderRadius: 10,
                  opacity: 0.99,
                  marginBottom: 50,
                }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-3">
                  <label className="form-label">
                    <h5 className="fw-bold text-warning">
                      Cập Nhật Tên Hiển Thị Của Bạn:
                    </h5>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="name"
                    name="name"
                    defaultValue={userName}
                    ref={register}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <h5 className="fw-bold text-warning">
                      Cập Nhật Ảnh đại diện :
                    </h5>
                  </label>

                  <input
                    type="text"
                    placeholder="Hãy dán đường link ảnh của bạn vào đây"
                    className="form-control"
                    id="avatarUrl"
                    name="avatar"
                    defaultValue={avatarUrl}
                    ref={register}
                  />
                </div>
                <div className="mb-3">
                  {watch("avatar") === "" ? (
                    <div>Link Ảnh Trống</div>
                  ) : (
                    <img
                      src={watch("avatar")}
                      alt="avartar của bạn"
                      style={{ maxWidth: 150, maxHeight: 150 }}
                    />
                  )}
                </div>
                <div className="mb-3">
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    {messageUpdate}
                  </p>
                </div>

                <button type="submit" className="btn btn-primary">
                  Cập Nhật{" "}
                  {spiner ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden m-lg-2">Loading...</span>
                    </div>
                  ) : null}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </React.Fragment>
  );
}

export default ProfilePage;
