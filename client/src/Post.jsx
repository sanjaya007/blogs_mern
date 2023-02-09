import React from "react";

const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://www.juventus.com/images/image/private/t_editorial_landscape_12_desktop/f_auto/dev/nyuf6tne3npisv92zetr.jpg"
          alt="entry"
        />
      </div>
      <div className="texts">
        <h2>Juventus says goodbye to Cristiano Ronaldo</h2>
        <p className="info">
          <a className="author">Sanjaya Paudel</a>
          <time> 2023 02:03:09 </time>
        </p>
        <p className="summary">
          On 10 July 2018, two icons of the European and football world came
          together - Cristiano Ronaldo became a Juventus player. Today, after
          three years together and 133 appearances, 101 goals scored and five
          trophies won, that chapter has come to an end.
        </p>
      </div>
    </div>
  );
};

export default Post;
