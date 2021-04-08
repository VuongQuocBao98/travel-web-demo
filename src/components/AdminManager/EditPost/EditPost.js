import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Controller, useForm } from "react-hook-form";

import Editors from "../../Editor/Editor";
import { uploadImage } from "../../../ulti";
import firebase from "../../../firebase";
import { useSelector } from "react-redux";
import slugify from "slugify";

EditPost.propTypes = {
  modifyData: PropTypes.object,
};
EditPost.defaultProps = {
  modifyData: {},
};

function EditPost(props) {
  const { modifyData } = props;

  const user = useSelector((state) => state.login.user);

  const { handleSubmit, control, register, watch, errors } = useForm();
  const [slugErrMessage, setslugErrMessage] = useState("");
  const [toggleSlug, settoggleSlug] = useState(true);

  const ToggleSlug = () => {
    settoggleSlug(false);
  };
  // Kiểm tra slug link
  useEffect(() => {
    // kiểm tra nếu dường dùng xác nhận muốn thay đổi link
    if (toggleSlug === false) {
      let slugUrl = watch("slug");
      if (slugUrl !== "") {
        firebase
          .database()
          .ref("posts")
          .orderByChild("slug")
          .equalTo(slugify(slugUrl))
          .on("value", (el) => {
            if (el.val() === null) {
              setslugErrMessage("Đường dẫn hợp lệ");
            } else {
              setslugErrMessage(
                "Đường dẫn chưa phù hợp , vui lòng thay đổi đường dẫn để sao cho phù hợp"
              );
            }
          });
      } else {
        setslugErrMessage("");
      }
    }
  }, [slugErrMessage, watch, toggleSlug]);

  // Lưu trữ thông tin url ảnh up lên
  const [imgUploadUrl, setimgUploadUrl] = useState(null);
  const [dataContent, setdataContent] = useState(modifyData.content);
  const [spiner, setSpiner] = useState(false);
  const [updateMessage, setupdateMessage] = useState("");
  const [errMessage, seterrMessage] = useState({});

  // upload ảnh thumbnail lên store
  const uploadImageFile = () => {
    let imgfile = watch("thumbnailsUrl");
    if (imgfile[0]) {
      uploadImage(imgfile[0], setimgUploadUrl);
    } else {
      alert("Bạn chưa chọn hình ảnh");
    }
  };

  // Click Update Post
  const handleSubmitOnClick = async (data) => {
    if (dataContent === null) {
      seterrMessage({
        errContent: "Hãy nhập nội dung bài viết",
      });
    } else {
      if (toggleSlug === false) {
        if (slugErrMessage === "Đường dẫn hợp lệ") {
          seterrMessage({});
          setSpiner(true);
          let slugUrl = data.slug;
          let imgUrl =
            imgUploadUrl === null ? modifyData.thumbnailsUrl : imgUploadUrl;
          let postData = {
            id: modifyData.id,
            title: data.title,
            category: data.category,
            thumbnailsUrl: imgUrl,
            subContent: data.subContent,
            content: dataContent,
            slug: slugify(slugUrl),
            user: {
              id: user.userId,
              name: user.name,
            },
            creatAt: firebase.database.ServerValue.TIMESTAMP,
          };
          let updates = {};
          updates["/posts/" + modifyData.id] = postData;
          await firebase.database().ref().update(updates);
          setSpiner(false);
          setupdateMessage("Cập nhật thông tin thành công !!");
          settoggleSlug(true);
          setTimeout(() => {
            setupdateMessage("");
          }, 1000);
        } else {
          alert("Cảnh báo : Đường dẫn bài viết của bạn không hợp lê !!");
        }
      } else {
        seterrMessage({});
        setSpiner(true);
        let imgUrl =
          imgUploadUrl === null ? modifyData.thumbnailsUrl : imgUploadUrl;
        let postData = {
          id: modifyData.id,
          title: data.title,
          category: data.category,
          thumbnailsUrl: imgUrl,
          subContent: data.subContent,
          content: dataContent,
          slug: modifyData.slug,
          user: {
            id: user.userId,
            name: user.name,
          },
          creatAt: firebase.database.ServerValue.TIMESTAMP,
        };
        let updates = {};
        updates["/posts/" + modifyData.id] = postData;
        await firebase.database().ref().update(updates);
        setSpiner(false);
        setupdateMessage("Cập nhật thông tin thành công !!");
        settoggleSlug(true);
        setTimeout(() => {
          setupdateMessage("");
        }, 1000);
      }
    }
  };

  // Nhận dữ liệu từ Component Editor
  const dataEditor = (data) => {
    setdataContent(data);
  };

  return (
    <div className="col-md-12 mb-5" id="admin-content">
      <h2>Chỉnh Sữa Bài Viết</h2>
      {/* TIÊU ĐỀ  */}
      <form onSubmit={handleSubmit(handleSubmitOnClick)}>
        <div className="mb-3">
          <label className="form-label text-primary fw-bold">
            Tiêu Đề Bài Viết
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            defaultValue={modifyData.title}
            ref={register({ required: "Tiêu đề Không Được Để Trống" })}
          />
          {errors.title && (
            <p className="mt-1 m-lg-1 text-danger">
              <i className="fas fa-times"></i> {errors.title.message}
            </p>
          )}
        </div>

        {/* LINK BAI VIET  */}
        <div className="mb-3">
          <p className="form-label text-primary fw-bold">Link Đến Bài Viết</p>
          <p className="text-warning">
            Bạn có chắc chắn muốn cập nhật đường Link mới{" "}
            <span
              onClick={ToggleSlug}
              className="btn btn-sm btn-secondary ml-5"
            >
              Thay Đổi
            </span>
          </p>

          <input
            type="text"
            name="slug"
            className="form-control"
            defaultValue={modifyData.slug}
            ref={register({ required: "Link Bài Viết Không Được Để Trống" })}
            disabled={toggleSlug}
          />
          {errors.slug && (
            <p className="mt-1 m-lg-1 text-danger">
              <i className="fas fa-times"></i> {errors.slug.message}
            </p>
          )}
          {toggleSlug === false ? (
            <>
              {slugErrMessage !== "" ? (
                <p className="mt-1 m-lg-1 text-warning">
                  <i className="fas fa-exclamation-circle"></i> {slugErrMessage}
                </p>
              ) : null}
            </>
          ) : null}
        </div>

        {/* THỂ LOẠI  */}
        <label className="form-label text-primary fw-bold">Thể Loại</label>
        <select
          className="form-select mb-3"
          aria-label="Default select example"
          name="category"
          defaultValue={modifyData.category}
          ref={register}
        >
          <option value="travel">Du Lịch</option>
          <option value="share">Chia Sẽ</option>
        </select>

        {/* ẢNH THUMNAILS  */}
        <div className="mb-3">
          <label className="form-label text-primary fw-bold">
            Chọn ảnh đại diện bài viết
          </label>
          <input
            type="file"
            name="thumbnailsUrl"
            className="form-control"
            id="thumbnailsUrl"
            ref={register}
          />
          <span onClick={uploadImageFile} className="btn btn-success mt-3">
            UpLoad Image
          </span>
        </div>
        <div className="mb-3">
          <img
            style={{ maxWidth: 400, maxHeight: 400 }}
            src={
              imgUploadUrl === null ? modifyData.thumbnailsUrl : imgUploadUrl
            }
            alt="Hình ảnh thumbnails của bài viết"
          />
        </div>

        {/* SUB CONTENT  */}
        <div className="mb-3">
          <label className="form-label text-primary fw-bold">
            Mô Tả mở đầu cho bài viết
          </label>
          <div className="form-floating">
            <textarea
              className="form-control"
              name="subContent"
              id="subContent"
              style={{ minHeight: 200 }}
              defaultValue={modifyData.subContent}
              ref={register({ required: "Mô Tả Không Được Để Trống" })}
            />
            {errors.subContent && (
              <p className="mt-1 m-lg-1 text-danger">
                <i className="fas fa-times"></i> {errors.subContent.message}
              </p>
            )}
            <label htmlFor="subContent" className="text-danger">
              ** LƯU Ý ** Mô Tả này sẽ được hiển thị ở dưới tiêu đề bài viết
              trước khi người dùng click vào xem bài viết
            </label>
          </div>
        </div>

        {/* NỘI DUNG BÀI VIẾT */}
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label text-primary fw-bold"
          >
            Nội Dung Bài Viết
          </label>
          <p className="text-danger">
            ** Lưu Ý ** Tiêu Đề bài viết sẽ được để ở đầu bài + Nội dung bài
            viết
          </p>
          <Controller
            name="content"
            render={({ field }) => {
              return (
                <Editors
                  valueDefault={modifyData.content}
                  dataEditor={dataEditor}
                  {...field}
                />
              );
            }}
            control={control}
          />
          {errMessage.errContent && (
            <p className="mt-1 m-lg-1 text-danger">
              <i className="fas fa-times"></i> {errMessage.errContent}
            </p>
          )}
        </div>
        <div className="mb-3">
          <p className="text-success fw-bold">{updateMessage}</p>
        </div>
        <button type="submit" className="btn btn-outline-info">
          Cập Nhật{" "}
          {spiner ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden m-lg-2">Loading...</span>
            </div>
          ) : null}
        </button>
      </form>
    </div>
  );
}

export default EditPost;
