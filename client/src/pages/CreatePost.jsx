import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const [input, setInput] = useState({
    title: "",
    summary: "",
    content: "",
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="title"
        placeholder="Title"
        name="title"
        onChange={handleInput}
        value={input.title}
      />
      <input
        type="summary"
        placeholder="Summary"
        name="summary"
        onChange={handleInput}
        value={input.summary}
      />
      <input type="file" />
      <ReactQuill
        theme="snow"
        name="content"
        formats={formats}
        modules={modules}
        onChange={handleInput}
        value={input.content}
      />
      <div className="error-box">
        <p></p>
      </div>
      <button>Create</button>
    </form>
  );
};

export default CreatePost;
