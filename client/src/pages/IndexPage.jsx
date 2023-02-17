import React, { useEffect, useState } from "react";
import { getPostsApi } from "../apis/BlogApi";
import Post from "../components/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await getPostsApi();
      const data = response.data;

      setPosts(data.data);
    };
    getPosts();
  }, []);

  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
};

export default IndexPage;
