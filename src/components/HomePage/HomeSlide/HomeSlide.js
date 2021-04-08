import React, { useEffect, useState } from "react";
import PostSlice from "./PostSlice/PostSlice";
import OwlCarousel from "react-owl-carousel2";

import "../../../../node_modules/react-owl-carousel2/lib/styles.css";
function HomeSlide(props) {
  const { data } = props;
  const [dataMap, setdataMap] = useState(null);
  useEffect(() => {
    if (data) {
      setdataMap(
        data.map((post, index) => {
          return <PostSlice key={index} post={post} />;
        })
      );
    }
  }, [data]);
  const options = {
    items: 4,
    nav: true,
    rewind: true,
    autoplay: true,
    margin: 10,
    autoplayTimeout: 3000,
  };

  return (
    <React.Fragment>
      <div id="post-list-slide" className="row">
        <div className="col-md-12 text-center">
          <h3>Các Bài Viết Nổi Bật</h3>
        </div>
        <div
          id="side-post-content"
          className="col-md-12 slideInLeft"
          data-wow-duration="2s"
          data-wow-delay="0.5s"
        >
          {dataMap !== null ? (
            <OwlCarousel options={options}>{dataMap}</OwlCarousel>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomeSlide;
