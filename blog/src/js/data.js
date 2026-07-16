// Store all blogs
let blogs = [];

// Return all blogs
export function getBlogs() {
  return blogs;
}

// Add a new blog
export function addBlog(blog) {
  blogs.push(blog);
}

// Delete a blog by id
export function deleteBlog(id) {
  blogs = blogs.filter((blog) => blog.id !== id);
}