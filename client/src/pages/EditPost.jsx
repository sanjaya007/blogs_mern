import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPostApi, editPostApi, getSinglePostApi } from "../apis/BlogApi";
import Editor from "../components/Editor";

const CreatePost = () => {
  const [input, setInput] = useState({
    title: "",
    summary: "",
    content: "",
    // image: "",
  });
  const [error, setError] = useState(null);
  const [postId, setPostId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const response = await getSinglePostApi(params.id);
      const data = response.data;

      if (data.success) {
        setInput({
          title: data.data.title,
          summary: data.data.summary,
          content: data.data.content,
          image: data.data.image,
        });
        setPostId(data.data._id);
      }
    };
    getPosts();
  }, [params.id]);

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
      if (isTyping) {
        setInput({
          ...input,
          content: value,
        });
      }
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

    const response = await editPostApi(input, postId);
    const data = response.data;

    if (!data.success) {
      setError(data.message);
      return false;
    }

    setError(null);
    navigate(-1);
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
      <Editor
        onChange={(value) => handleInput(null, value)}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
        value={input.content}
      />
      <div className="error-box">
        <p>{error ?? ""}</p>
      </div>
      <button>Edit</button>
    </form>
  );
};

export default CreatePost;
