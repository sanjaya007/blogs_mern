import React from "react";
import { format } from "date-fns";

const Post = ({ title, summary, content, image, createdAt }) => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://www.juventus.com/images/image/private/t_editorial_landscape_12_desktop/f_auto/dev/nyuf6tne3npisv92zetr.jpg"
          alt="entry"
        />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">Sanjaya Paudel</a>
          <time> {format(new Date(createdAt), "MMM d, yyyy HH:mm")} </time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
