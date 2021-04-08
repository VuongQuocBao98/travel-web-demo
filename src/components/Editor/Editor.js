import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import firebase from "../../firebase";
import "./Editor.css";

function Editors(props) {
  const { dataEditor, valueDefault } = props;

  // Set data mặc định cho tinymce s
  const [valueT, setvalueT] = useState(valueDefault);
  const handleEditorChange = (content, editor) => {
    // Đẩy data từ tinymce ở Editor qua Component cha
    setvalueT(content);
    dataEditor(content);
  };

  return (
    <React.Fragment>
      <Editor
        value={valueT}
        apiKey="h9fu6dzngpsa5fjnie2b7umtzkqfiqy2pnguz62xkyajxnah"
        init={{
          min_height: 400,

          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          menubar: "file insert format table",
          toolbar:
            "undo redo | styleselect fontselect fontsizeselect  | bold italic backcolor forecolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image icons |",
          image_title: true,

          automatic_uploads: true,

          file_picker_types: "image",

          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");

            input.onchange = async function (ev) {
              const imageFileEditor = this.files[0];
              console.log(imageFileEditor.name);
              console.log(imageFileEditor);
              var storageRef = firebase.storage();
              if (
                !imageFileEditor.name.match(
                  /\.(jpg|jpeg|png|gif|jpe|jfi|jif|jfif|bmp|webp)$/
                )
              ) {
                alert("Hình ảnh chưa đúng định dạng");
              } else {
                var uploadTask = storageRef
                  .ref()
                  .child(`images/${imageFileEditor.name}`)
                  .put(imageFileEditor);
                uploadTask.on(
                  "state_changed",
                  (snapshot) => {
                    var progress =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                      case firebase.storage.TaskState.PAUSED:
                        console.log("Upload is paused");
                        break;
                      case firebase.storage.TaskState.RUNNING:
                        console.log("Upload is running");
                        break;
                      default:
                        break;
                    }
                  },
                  (error) => {
                    alert("Gặp Lỗi Khi upload ảnh , Vui lòng thực hiện lại");
                  },
                  () => {
                    storageRef
                      .ref("images")
                      .child(imageFileEditor.name)
                      .getDownloadURL()
                      .then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        cb(downloadURL);
                      });
                  }
                );
              }
            };

            input.click();
          },
        }}
        onEditorChange={handleEditorChange}
      />
    </React.Fragment>
  );
}

export default Editors;
