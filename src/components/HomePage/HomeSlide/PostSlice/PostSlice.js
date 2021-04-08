import React from "react";
import PropTypes from "prop-types";
import { titleCut } from "../../../../ulti";
import { Link } from "react-router-dom";

PostSlice.propTypes = {
  post: PropTypes.object,
};

PostSlice.defaultProps = {
  post: {},
};

function PostSlice(props) {
  const { post } = props;

  return (
    <div className="item mb-4">
      <div className="card product-item">
        <Link
          to={`/${post.category}/${post.slug}`}
          className="slidesub-img"
          alt="kkk"
        >
          <img
            style={{ maxHeight: 170 }}
            src={post.thumbnailsUrl}
            alt={post.title}
            className="card-img-top"
          />
        </Link>
        <div className="card-body p-0">
          <p className="product-star card-text text-warning mt-2">
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <span className="text-muted">(8 Nhan xet)</span>
          </p>
          <p className="product-title card-text">
            <Link
              style={{ textDecoration: "none" }}
              to={`/${post.category}/${post.slug}`}
            >
              {titleCut(post.title, 0, 72)}
            </Link>
          </p>
          <span>by {post.user.name}</span>
        </div>
      </div>
    </div>
  );
}

export default PostSlice;
