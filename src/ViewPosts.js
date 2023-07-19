import { useState, useEffect } from "react";
import Post from "./Post.js";

export default function ViewPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <p>AHEM! I'm trying to view a post here :/</p>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
