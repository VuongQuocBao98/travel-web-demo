import React, { useEffect, useState } from "react";

import firebase from "../../firebase";
import { useDispatch } from "react-redux";
import { listAuthors } from "../../app/AuthorSlice";

function Banner(props) {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    var db = firebase.database();
    var event = db
      .ref()
      .child("users")
      .orderByChild("role")
      .equalTo(1)
      .limitToLast(3);
    event.on("value", (snapshot) => {
      const data = snapshot;
      var list = [];
      data.forEach((el) => {
        list.push(el.val());
      });
      setUsers(list);
    });
  }, []);
  dispatch(listAuthors(users));

  return (
    <React.Fragment>
      {users.length > 0 ? (
        <section id="banner" className="container-fluid">
          <div id="hot-author" className="row">
            <div className="col-6 col-sm-4 col-md-3">
              <div
                id="author1"
                data-wow-delay="0.5s"
                data-wow-duration="2s"
                className="card rollIn"
                style={{ width: "10rem" }}
              >
                <div>
                  <img
                    src={users[0].avatarUrl}
                    className="card-img-top"
                    alt={users[0].name}
                  />
                </div>
                <h5 className="card-title">
                  {users[0].name} <i className="fas fa-star-of-david" />
                </h5>
                <span className="text-secondary">tác giả tiêu biểu</span>
              </div>
            </div>

            <div className="col-6 col-sm-4 col-md-3 mt-5">
              <div
                id="author2"
                data-wow-delay="0.5s"
                data-wow-duration="2.5s"
                className="card hinge"
                style={{ width: "10rem" }}
              >
                <div>
                  <img
                    src={users[1].avatarUrl}
                    className="card-img-top"
                    alt={users[1].name}
                  />
                </div>
                <h5 className="card-title">
                  {users[1].name} <i className="fas fa-star-of-david" />
                </h5>
                <span className="text-secondary">tác giả tiêu biểu</span>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-md-3">
              <div id="card-story" className="card" style={{ width: "10rem" }}>
                <div className="card-body">
                  <p className="card-text">
                    Nét đẹp của một tấm ảnh không chỉ thể hiện ở những lượt like
                    , mà sau đó là những câu chuyện , những trải nghiệm và những
                    ý thức ...
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-md-3 mt-2">
              <div
                id="author3"
                data-wow-delay="0.5s"
                data-wow-duration="2.5s"
                className="card bounceInDown center"
                style={{ width: "10rem" }}
              >
                <a href="ds">
                  <img
                    src={users[2].avatarUrl}
                    className="card-img-top"
                    alt={users[2].name}
                  />
                </a>
                <h5 className="card-title">
                  {users[2].name} <i className="fas fa-star-of-david" />
                </h5>
                <span className="text-secondary">tác giả tiêu biểu</span>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </React.Fragment>
  );
}

export default Banner;
