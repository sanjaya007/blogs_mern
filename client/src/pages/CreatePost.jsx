import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createPostApi } from "../apis/BlogApi";

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
    image: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInput = (e, value = null) => {
    if (!value) {
      if (e.target.name === "image") {
        setInput({
          ...input,
          [e.target.name]: e.target.files[0],
        });
      } else {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setInput({
        ...input,
        content: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    for (const value in input) {
      if (value !== "image") {
        if (input[value].trim() === "") {
          setError("Please enter " + value + ".");
          return false;
        }
      } else {
        if (input[value] === "") {
          setError("Please upload " + value + ".");
          return false;
        }
      }
    }

    const response = await createPostApi(input);
    const data = response.data;

    if (!data.success) {
      setError(data.message);
      return false;
    }

    setError(null);
    navigate("/");
  };

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
      <input name="image" type="file" onChange={handleInput} />
      <ReactQuill
        theme="snow"
        formats={formats}
        modules={modules}
        onChange={(value) => handleInput(null, value)}
        value={input.content}
      />
      <div className="error-box">
        <p>{error ?? ""}</p>
      </div>
      <button>Create</button>
    </form>
  );
};

export default CreatePost;
