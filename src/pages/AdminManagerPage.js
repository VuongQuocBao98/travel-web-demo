import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import firebase from "../firebase";
import Post from "../components/AdminManager/AdminPost/Post";
import EditPost from "../components/AdminManager/EditPost/EditPost";
import AddPost from "../components/AdminManager/AdminAddPost/AddPost";
import { isLogin, setUser } from "../app/LoginSlice";

function AdminAddPage(props) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);
  const emailRedirect = useRouteMatch();
  const history = useHistory();

  const [listPost, setlistPost] = useState(true);
  const [addNewPost, setaddNewPost] = useState(false);
  const [editPost, seteditPost] = useState(false);
  const [count, setCount] = useState(8);
  const [addMessage, setaddMessage] = useState("");

  const [modifyData, setmodifyData] = useState(null);

  const showListPost = () => {
    setlistPost(true);
    setaddNewPost(false);
    seteditPost(false);
  };

  const showAddPost = () => {
    setlistPost(false);
    setaddNewPost(true);
    seteditPost(false);
  };

  // lấy dữ liệu data cần sửa từ component Post , và chỉnh lại trạng thái
  const PostEditData = (data) => {
    setlistPost(false);
    setaddNewPost(false);
    seteditPost(true);
    setmodifyData(data);
  };

  // Danh sách bài viết kiểu array
  const [list, setList] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("posts")
      .limitToLast(count)
      .on("value", (data) => {
        let list = [];
        data.forEach((el) => {
          list.push(el.val());
        });
        setList(list);
      });
  }, [count]);

  const seeMore = () => {
    setCount(count + 5);
  };

  const successAdd = (data) => {
    showListPost();
    setaddMessage(data);
    setTimeout(() => {
      setaddMessage("");
    }, 8000);
  };

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
        history.push("/admin/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <React.Fragment>
      {user.role === 1 ? (
        <>
          <header className="container">
            <div className="row text-center">
              <div className="col-md-12">
                <h1 className="fw-bold">TRANG QUAN LI ADMIN</h1>
              </div>
              <div className="col-md-12">
                <span>Quan Tri Vien :</span>
                {"  "} <span className="fw-bold text-info">{user.name}</span>{" "}
                <span onClick={sigout} className="btn btn-outline-secondary">
                  Đăng Xuất
                </span>
              </div>
            </div>
            <div className="col-md-12">
              <span
                onClick={showListPost}
                className="btn btn-primary"
                style={{ marginRight: 8 }}
              >
                Trang Danh Sách
              </span>
              <span onClick={showAddPost} className="btn btn-success">
                Thêm Mới Bài Viết
              </span>
            </div>
          </header>

          {/* CONTENT  */}
          {user.email === emailRedirect.params.id ? (
            <section className="container">
              <div className="row mt-lg-5">
                {/* ADMIN CONTENT  */}
                {addNewPost ? <AddPost successAdd={successAdd} /> : null}
                {/* DANH SÁCH  */}
                {listPost ? (
                  <div className="row mt-lg-5">
                    <div className="col-md-12 fw-bold text-success">
                      {addMessage}
                    </div>
                    <div className="col-md-12">
                      <h2>DANH SÁCH BÀI VIẾT</h2>

                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Tên Bài Viết</th>
                            <th scope="col">Ngày Đăng</th>
                            <th scope="col">Sửa</th>
                            <th scope="col">Xóa</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((post, index) => {
                            return (
                              <Post
                                key={index}
                                post={post}
                                PostEditData={PostEditData}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                      <p className="btn btn-outline-success" onClick={seeMore}>
                        Xem Thêm
                      </p>
                    </div>
                  </div>
                ) : null}
                {editPost ? <EditPost modifyData={modifyData} /> : null}
              </div>
            </section>
          ) : (
            <>
              <div>
                Xin Chào Admin : {user.name} Bạn Hiện Đang Truy Cập Sai địa chỉ
              </div>
              <button
                className="btn btn-warning"
                onClick={() => history.push("/admin/login")}
              >
                Hãy Click vào đây để được điều hướng chính xác nhất
              </button>
            </>
          )}
        </>
      ) : (
        <div>
          Xin Chào : {user.name} Bạn Hiện Đang Truy Cập vào địa chỉ mà bạn không
          được cấp quyền
        </div>
      )}
    </React.Fragment>
  );
}

export default AdminAddPage;
