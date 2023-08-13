import React, { useEffect, useState } from "react";
import Post from "../Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  // removed const here okkk!!!
  useEffect(() => {
    fetch("https://blog-api-dotx.onrender.com/post").then((response) => {
      response.json().then((posts) => {
        console.log(posts);
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {/* it is a array of objects and we are at each object destructuring the object data.. */}
      {posts.length > 0 && posts.map((post) => <Post {...post} />)}
      {posts.length === 0 && (
        <h1>Nothing to show here please add some posts..</h1>
      )}
    </>
  );
};

export default IndexPage;
