import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const slicedChar = (value, key) => {
  if (value.length > key) {
    return value.slice(0, key) + "...";
  } else {
    return value;
  }
};

const Post = ({ _id, title, summary, content, image, author, createdAt }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:7000/" + image} alt="entry" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{slicedChar(title, 80)}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time> {format(new Date(createdAt), "MMM d, yyyy HH:mm")} </time>
        </p>
        <p className="summary">{slicedChar(summary, 150)}</p>
      </div>
    </div>
  );
};

export default Post;
