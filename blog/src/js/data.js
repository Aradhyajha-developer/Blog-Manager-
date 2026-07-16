// =======================================
// LOCAL STORAGE
// =======================================

let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

function saveBlogs() {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

// =======================================
// GET ALL BLOGS
// =======================================

export function getBlogs() {
  return blogs;
}

// =======================================
// ADD BLOG
// =======================================

export function addBlog(blog) {

  blog.favorite = false;
  blog.pinned = false;

  blog.createdAt = new Date().toLocaleString();

  blog.readTime =
    Math.max(
      1,
      Math.ceil(blog.body.split(" ").length / 200)
    ) + " min read";

  blogs.unshift(blog);

  saveBlogs();

}

// =======================================
// DELETE BLOG
// =======================================

export function deleteBlog(id) {

  blogs = blogs.filter(blog => blog.id !== id);

  saveBlogs();

}

// =======================================
// UPDATE BLOG
// =======================================

export function updateBlog(id, updatedBlog) {

  blogs = blogs.map(blog => {

    if (blog.id === id) {

      return {

        ...updatedBlog,

        favorite: blog.favorite,

        pinned: blog.pinned,

        createdAt: blog.createdAt,

        readTime:
          Math.max(
            1,
            Math.ceil(updatedBlog.body.split(" ").length / 200)
          ) + " min read"

      };

    }

    return blog;

  });

  saveBlogs();

}

// =======================================
// TOGGLE FAVORITE
// =======================================

export function toggleFavorite(id) {

  blogs = blogs.map(blog => {

    if (blog.id === id) {

      blog.favorite = !blog.favorite;

    }

    return blog;

  });

  saveBlogs();

}

// =======================================
// TOGGLE PIN
// =======================================

export function togglePin(id) {

  blogs = blogs.map(blog => {

    if (blog.id === id) {

      blog.pinned = !blog.pinned;

    }

    return blog;

  });

  blogs.sort((a, b) => b.pinned - a.pinned);

  saveBlogs();

}

// =======================================
// CLEAR ALL BLOGS
// =======================================

export function clearBlogs() {

  blogs = [];

  saveBlogs();

}

// =======================================
// SEARCH BLOGS
// =======================================

export function searchBlogs(searchText) {

  return blogs.filter(blog =>

    blog.title
      .toLowerCase()
      .includes(searchText.toLowerCase())

    ||

    blog.body
      .toLowerCase()
      .includes(searchText.toLowerCase())

  );

}

// =======================================
// FILTER CATEGORY
// =======================================

export function filterCategory(category) {

  if (category === "All") {

    return blogs;

  }

  return blogs.filter(blog =>

    blog.category === category

  );

}

// =======================================
// SORT BLOGS
// =======================================

export function sortBlogs(type) {

  if (type === "new") {

    blogs.sort((a, b) => b.id - a.id);

  }

  else {

    blogs.sort((a, b) => a.id - b.id);

  }

  saveBlogs();

}

// =======================================
// EXPORT BLOGS
// =======================================

export function exportBlogs() {

  const data =
    JSON.stringify(blogs, null, 2);

  const blob =
    new Blob([data], {

      type: "application/json"

    });

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download = "blogs.json";

  a.click();

  URL.revokeObjectURL(url);

}