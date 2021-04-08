import React from "react";
import PropTypes from "prop-types";
import { titleCut } from "../../../../ulti";
import { Link } from "react-router-dom";

PostImageRight.propTypes = {
  data: PropTypes.object,
};

PostImageRight.defaultProps = {
  data: {},
};

function PostImageRight(props) {
  const { data } = props;

  return (
    <div id="post-img__right" className="row mt-5">
      <div className="col-md-8 post-content">
        <Link
          to={`/${data.category}/${data.slug}`}
          className="text-decoration-none"
        >
          <h3 className="text-success">{titleCut(data.title, 0, 120)}</h3>
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
      <div className="col-md-4 post-img">
        <img
          src={data.thumbnailsUrl}
          className="img-thumbnail"
          alt={data.title}
        />
      </div>
    </div>
  );
}

export default PostImageRight;
