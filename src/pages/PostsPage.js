import React, { useEffect, useState } from "react";

import Banner from "../components/Banner/Banner";
import ListPost from "../components/PostPage/ListPost/ListPost";
import SearchPost from "../components/PostPage/SearchPost/SearchPost";
import TitlePost from "../components/PostPage/TitlePost/TitlePost";
import firebase from "../firebase";
import { useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../app/SearchSlice";

function PostsPage(props) {
  const match = useRouteMatch();

  const [searchParams, setsearchParams] = useState("");
  const [count, setcount] = useState(5);
  const data = useSelector((state) => state.search.listPost);
  const [spiner, setSpiner] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(searchParams);
    if (searchParams === "") {
      setSpiner(true);
      firebase
        .database()
        .ref("posts/")
        .orderByChild("category")
        .equalTo(match.params.posts)
        .limitToFirst(count)
        .on("value", (data) => {
          let list = [];
          data.forEach((el) => {
            list.push(el.val());
          });
          let actionSearch = search(list);
          dispatch(actionSearch);
          setSpiner(false);
        });
    } else {
      firebase
        .database()
        .ref("posts/")
        .orderByChild("category")
        .equalTo(match.params.posts)
        .on("value", (data) => {
          let list = [];
          data.forEach((el) => {
            list.push(el.val());
          });
          let actionSearch = search(list);
          dispatch(actionSearch);
        });
    }
  }, [match.params.posts, searchParams, count, dispatch]);

  const SearchParams = (textSearch) => {
    setsearchParams(textSearch);
  };

  const changeCount = () => {
    setcount(count + 4);
  };

  return (
    <React.Fragment>
      {data ? (
        <>
          <Banner />
          <section id="content" className="container">
            {/* TITLE TRAVEL  */}
            <TitlePost />
            <SearchPost SearchParams={SearchParams} />
            <ListPost data={data} searchParams={searchParams} />
            {searchParams === "" ? (
              <div className="row">
                <div className="col-md-12 text-center">
                  <div
                    onClick={changeCount}
                    className="btn btn-outline-success"
                  >
                    Xem Thêm{" "}
                    {spiner ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden m-lg-2">
                          Loading...
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </>
      ) : null}
    </React.Fragment>
  );
}

export default PostsPage;
