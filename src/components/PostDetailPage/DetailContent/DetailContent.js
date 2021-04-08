import React from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

DetailContent.propTypes = {
  data: PropTypes.object,
};

DetailContent.defaultProps = {
  data: {},
};

function DetailContent(props) {
  const { data } = props;
  var time = new Intl.DateTimeFormat("en-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(data.creatAt);
  return (
    <React.Fragment>
      <div
        id="detail-content"
        className="col-md-8"
        style={{ overflow: "hidden" }}
      >
        <h1 className="text-primary text-center">{data.title}</h1>
        <p> - Ngày Đăng :{time}</p>
        <div>{ReactHtmlParser(data.content)}</div>
        {data.user ? (
          <p className="fw-bold">- Được viết bởi tác giả : {data.user.name}</p>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default DetailContent;
