import React from "react";
import PropTypes from "prop-types";
import { titleCut } from "../../../../ulti/index";
import { Link } from "react-router-dom";

PostImageLeft.propTypes = {
  data: PropTypes.object,
};

PostImageLeft.defaultProps = {
  data: {},
};

function PostImageLeft(props) {
  const { data } = props;

  return (
    <div id="post-img__left" className="row mt-5">
      <div className="col-md-4 post-img">
        <img
          src={data.thumbnailsUrl}
          className="img-thumbnail"
          alt={data.title}
        />
      </div>
      <div className="col-md-8 post-content">
        <Link
          to={`/${data.category}/${data.slug}`}
          className="text-decoration-none text-success"
        >
          <h3>{titleCut(data.title, 0, 120)}</h3>
        </Link>

        {/* lorem 80  */}
        <p>{titleCut(data.subContent, 0, 500)}</p>
        <Link
          to={`/${data.category}/${data.slug}`}
          className="btn btn-primary text-decoration-none"
        >
          Xem thêm
        </Link>
      </div>
    </div>
  );
}

export default PostImageLeft;
