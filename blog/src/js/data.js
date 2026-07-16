// Load blogs from localStorage
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

// Return all blogs
export function getBlogs() {
  return blogs;
}

// Save blogs
function saveBlogs() {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

// Add Blog
export function addBlog(blog) {
  blogs.push(blog);
  saveBlogs();
}

// Delete Blog
export function deleteBlog(id) {
  blogs = blogs.filter((blog) => blog.id !== id);
  saveBlogs();
}