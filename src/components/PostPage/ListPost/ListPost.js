import React from "react";
import PropTypes from "prop-types";
import Post from "./Post.js/Post";
import { filter, includes } from "lodash";

ListPost.propTypes = {
  data: PropTypes.array,
  searchParams: PropTypes.string,
};

ListPost.defaultProps = {
  data: [],
  searchParams: "",
};

function ListPost(props) {
  const { data, searchParams } = props;
  var dataSearch = filter(data, (el) => {
    return includes(el.title.toLowerCase(), searchParams.toLowerCase());
  });
  var dataList = dataSearch.map((post, index) => {
    return <Post key={index} postData={post} />;
  });
  return <React.Fragment>{dataList}</React.Fragment>;
}

export default ListPost;
