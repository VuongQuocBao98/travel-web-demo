import React, { useState } from "react";
import PropTypes from "prop-types";
import { titleCut } from "../../../ulti";
import firebase from "../../../firebase";

Post.propTypes = {
  showEdit: PropTypes.func,
  post: PropTypes.object,
};
Post.defaultProps = {
  showEdit: null,
  post: {},
};

function Post(props) {
  const { post, PostEditData } = props;
  const [confirmDelete, setconfirmDelete] = useState(false);

  var time = new Intl.DateTimeFormat("en-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(post.creatAt);

  const showEdit = () => {
    PostEditData(post);
  };
  const deletePost = () => {
    setconfirmDelete(true);
  };
  const confirm = () => {
    firebase
      .database()
      .ref("posts/" + post.id)
      .remove();
  };
  const cancelDelete = () => {
    setconfirmDelete(false);
  };
  return (
    <tr>
      <th>{titleCut(post.title, 0, 50)}</th>
      <td>
        <p>{time}</p>
      </td>
      <td>
        <span onClick={showEdit} className="btn btn-warning">
          Sửa
        </span>
      </td>
      <td>
        {confirmDelete === false ? (
          <span onClick={deletePost} className="btn btn-danger">
            Xóa
          </span>
        ) : (
          <>
            <span onClick={confirm} className="btn btn-danger">
              Xác Nhận
            </span>{" "}
            <span onClick={cancelDelete} className="btn btn-warning">
              Hủy
            </span>
          </>
        )}
      </td>
    </tr>
  );
}

export default Post;
