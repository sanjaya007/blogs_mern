import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { getSinglePostApi } from "../apis/BlogApi";
import { UserContext } from "../contexts/UserContext";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const params = useParams();

  const { profile } = useContext(UserContext);
  console.log(post?.author?._id);
  // const profileId = profile.id ?? null;
  // const authorId = post.author._id ?? null;

  useEffect(() => {
    const getPosts = async () => {
      const response = await getSinglePostApi(params.id);
      const data = response.data;

      if (data.success) {
        setPost(data.data);
      }
    };
    getPosts();
  }, []);

  if (!post) return "";

  return (
    <div className="post-page">
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="time">
        <time>{formatISO9075(new Date(post.createdAt))}</time>
      </div>
      <div className="author">
        <p>
          By: <span>{post.author.username}</span>
        </p>
        {profile?.id === post?.author?._id && (
          <Link to={`/edit/${post._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <p>Edit</p>
          </Link>
        )}
      </div>
      <div className="img-box">
        <img src={"http://localhost:7000/" + post.image} alt="post" />
      </div>
      <div className="info">
        <h3>{post.summary}</h3>
      </div>
      <hr />
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostPage;
