import React, { useEffect, useState } from "react";

import firebase from "../firebase";

import DetailBanner from "../components/PostDetailPage/DetailBanner/DetailBanner";
import DetailSidebar from "../components/PostDetailPage/DetailSidebar/DetailSidebar";
import DetailContent from "../components/PostDetailPage/DetailContent/DetailContent";
import { useRouteMatch } from "react-router";

PostDetailPage.propTypes = {};

function PostDetailPage(props) {
  const match = useRouteMatch();
  const [checkCategory, setcheckCategory] = useState(true);
  const [data, setdata] = useState({});
  const [sidebarPost, setsidebarPost] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("posts")
      .orderByChild("slug")
      .equalTo(match.params.id)
      .on("value", (el) => {
        if (el.val() === null) {
          setcheckCategory(false);
        } else {
          let list = [];
          el.forEach((el) => {
            list.push(el.val());
          });
          if (list[0].category !== match.params.post) {
            setcheckCategory(false);
          } else {
            setdata(list[0]);
          }
        }
      });
    firebase
      .database()
      .ref("posts")
      .orderByChild("category")
      .equalTo(match.params.post)
      .limitToFirst(10)
      .on("value", (el) => {
        let list = [];
        el.forEach((el) => {
          list.push(el.val());
        });
        setsidebarPost(list);
      });
  }, [match]);

  return (
    <React.Fragment>
      <DetailBanner />
      <section id="detail-content-wrapper" className="container mt-5">
        <div className="row">
          {checkCategory === true ? (
            <>
              <DetailContent data={data} />
              <DetailSidebar sidebarPost={sidebarPost} />
            </>
          ) : (
            <h1 className="text-warning fw-bold text-text-uppercase">
              Đường dẫn không tồn tại
            </h1>
          )}
        </div>
      </section>
    </React.Fragment>
  );
}

export default PostDetailPage;
