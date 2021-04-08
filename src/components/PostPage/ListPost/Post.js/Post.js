import React from "react";
import PropTypes from "prop-types";
import { titleCut } from "../../../../ulti";
import { NavLink } from "react-router-dom";

Post.propTypes = {
  postData: PropTypes.object,
};

Post.defaultProps = {
  postData: {},
};
function Post(props) {
  const { postData } = props;

  return (
    <React.Fragment>
      <div className="row travel-content">
        {/* TRAVEL SUB CONTENT  */}
        <div className="col-md-6 travel-sub-content mt-4">
          <NavLink
            style={{ textDecoration: "none" }}
            to={`/${postData.category}/${postData.slug}`}
          >
            <h3 className="text-primary">{titleCut(postData.title, 0, 120)}</h3>
          </NavLink>
          <p>{titleCut(postData.subContent, 0, 500)}</p>
        </div>
        {/* TRAVEL IMG THUMBNAIL */}
        <div className="col-md-6">
          <img
            src={postData.thumbnailsUrl}
            style={{ maxHeight: 250 }}
            className="img-thumbnail"
            alt="..."
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Post;
