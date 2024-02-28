import ToggleVisibility from "./ToggleVisibility";
import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, handleDelete, handleLikes }) => {
  const blogPostStyle = {
    padding: 10,
    border: "solid",
    borderWidth: 2,
    marginBottom: 10,
    width: 300,
  };

  return (
    <div style={blogPostStyle} className="a-blog">
      <div className="short">
        <p>{blog.title}</p>
        <p>{blog.author}</p>
      </div>
      <ToggleVisibility setVisibleLabel="view" setHiddenLabel="back">
        <div className="details">
          <p>{blog.url}</p>{" "}
          <p className="blog-likes">
            likes: {blog.likes}{" "}
            <button onClick={handleLikes} className="like-button">
              like this post
            </button>
          </p>
          <p>{user.name}</p>
          <p>
            {blog.user && user.username === blog.user.username && (
              <button onClick={handleDelete} id="delete-button">
                delete
              </button>
            )}
          </p>
        </div>
      </ToggleVisibility>
    </div>
  );
};

export default Blog;
