import React, { useEffect, useState } from "react";

import PostImageLeft from "./PostImageLeft/PostImageLeft";
import PostImageRight from "./PostImageRight/PostImageRight";
import firebase from "../../../firebase";

function HomeListPosts(props) {
  const [listTravel, setListTravel] = useState([]);
  const [listShare, setListShare] = useState([]);
  useEffect(() => {
    firebase
      .database()
      .ref("posts")
      .orderByChild("category")
      .equalTo("travel")
      .limitToLast(4)
      .on("value", (data) => {
        let list = [];
        data.forEach((el) => {
          list.push(el.val());
        });
        setListTravel(list);
      });
    firebase
      .database()
      .ref("posts")
      .orderByChild("category")
      .equalTo("share")
      .limitToLast(4)
      .on("value", (data) => {
        let list = [];
        data.forEach((el) => {
          list.push(el.val());
        });
        setListShare(list);
      });
  }, []);

  return (
    <section id="post-list" className="mt-5">
      {/* POST TRAVEL  */}
      <div id="post-list__travel">
        <div className="row">
          <div className="col-md-12" id="post-list-travel__title">
            <h3>
              Du Lịch <i className="fas fa-plane bounceInLeft" />
            </h3>
          </div>
        </div>
        {listTravel.map((travel, index) => {
          if (index % 2 === 0)
            return <PostImageLeft key={index} data={travel} />;
          return <PostImageRight key={index} data={travel} />;
        })}
      </div>
      {/* POST SHARE  */}
      <div id="post-list-share">
        <div className="row mt-5">
          <div className="col-md-12" id="post-list-share__title">
            <h3>
              Chia Sẽ <i className="fas fa-share-alt rotateIn" />
            </h3>
          </div>
        </div>
        {listShare.map((share, index) => {
          if (index % 2 !== 0)
            return <PostImageLeft key={index} data={share} />;
          return <PostImageRight key={index} data={share} />;
        })}
      </div>
    </section>
  );
}

export default HomeListPosts;
