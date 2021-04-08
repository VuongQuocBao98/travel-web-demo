import React from "react";
import PropTypes from "prop-types";
import Iframe from "react-iframe";
import { Link } from "react-router-dom";
import { titleCut } from "../../../ulti";

DetailSidebar.propTypes = {
  sidebarPost: PropTypes.array,
};

DetailSidebar.defaultProps = {
  sidebarPost: [],
};

function DetailSidebar(props) {
  const { sidebarPost } = props;

  const showSidebarPost = sidebarPost.map((post, index) => {
    return (
      <Link
        key={index}
        to={`/${post.category}/${post.slug}`}
        className="list-group-item list-group-item-action"
      >
        {titleCut(post.title, 0, 150)}
      </Link>
    );
  });

  return (
    <div
      id="detail-sidebar"
      className="col-md-4"
      style={{ paddingLeft: "20px" }}
    >
      <h2>Các Bài Viết Liên Quan</h2>
      <div id="sidebar-list" className="list-group mt-5">
        {/* SHOW SIDEBAR POST  */}
        {showSidebarPost}
      </div>
      <div id="sidebar-des" className="mt-5">
        <Iframe
          src="https://www.youtube.com/embed/jTHui6870Q4"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></Iframe>
        <h3>
          " Nếu bạn muốn đi xa và nhanh hơn, hãy đi thật nhẹ nhàng. Bỏ hết tất
          cả ganh tị, ghen ghét, cố chấp, ích kỷ và sợ hãi "
        </h3>
      </div>
      <div className="mt-5">
        <Iframe
          src="https://www.youtube.com/embed/Tpp3xdTbWq4"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></Iframe>
      </div>
      <div className="mt-5">
        <Iframe
          src="https://www.youtube.com/embed/kEvoT8Md6vw"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></Iframe>
      </div>
    </div>
  );
}

export default DetailSidebar;
