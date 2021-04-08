import React, { useState } from "react";
import PropTypes from "prop-types";

SearchPost.propTypes = {
  SearchParams: PropTypes.func,
};

SearchPost.defaultProps = {
  SearchParams: null,
};
function SearchPost(props) {
  const { SearchParams } = props;
  const [searchParams, setsearchParams] = useState("");

  const handleSearchParams = (e) => {
    SearchParams(e.target.value);
    setsearchParams(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Tìm Kiếm"
            value={searchParams}
            onChange={handleSearchParams}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchPost;
