import "./style.css";

import { addBlog, deleteBlog } from "./js/data.js";
import { renderBlogList, bindDeleteEvents } from "./js/ui.js";

const form = document.getElementById("blog-form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const blogList = document.getElementById("blog-list");

// Add Blog
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title || !body) return;

  const newBlog = {
    id: Date.now(),
    title,
    body,
  };

  addBlog(newBlog);

  renderBlogList(blogList);

  form.reset();
});

// Delete Blog
bindDeleteEvents(blogList, (id) => {
  deleteBlog(id);

  renderBlogList(blogList);
});

// Initial Render
renderBlogList(blogList);