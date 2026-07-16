import { getBlogs } from "./data.js";

// ======================================
// RENDER BLOGS
// ======================================

export function renderBlogList(container) {

  const blogs = getBlogs();

  container.innerHTML = "";

  const emptyState = document.getElementById("emptyState");

  // Update Counters
  document.getElementById("totalBlogs").innerText = blogs.length;

  document.getElementById("favoriteBlogs").innerText =
    blogs.filter(blog => blog.favorite).length;

  // Empty State
  if (blogs.length === 0) {

    emptyState.style.display = "block";
    return;

  }

  emptyState.style.display = "none";

  blogs.forEach(blog => {

    const li = document.createElement("li");

    li.className = "blog-card";

    li.innerHTML = `

      <div class="blog-top">

        <h2 class="blog-title">

          ${blog.pinned ? "📌" : ""}

          ${blog.favorite ? "⭐" : ""}

          ${blog.title}

        </h2>

        <span class="category">

          ${blog.category}

        </span>

      </div>

      <p class="blog-body">

        ${blog.body}

      </p>

      <div class="blog-info">

        <span>

          📅 ${blog.createdAt}

        </span>

        <span>

          ⏱ ${blog.readTime}

        </span>

      </div>

      <div class="blog-actions">

        <button
          class="favorite"
          data-id="${blog.id}"
        >

          ${blog.favorite ? "⭐ Remove" : "⭐ Favorite"}

        </button>

        <button
          class="pin"
          data-id="${blog.id}"
        >

          ${blog.pinned ? "📌 Unpin" : "📌 Pin"}

        </button>

        <button
          class="edit"
          data-id="${blog.id}"
        >

          ✏ Edit

        </button>

        <button
          class="delete"
          data-id="${blog.id}"
        >

          🗑 Delete

        </button>

      </div>

    `;

    container.appendChild(li);

  });

}

// ======================================
// EVENTS
// ======================================

export function bindBlogEvents(

  container,

  onDelete,

  onEdit,

  onFavorite,

  onPin

) {

  container.addEventListener("click", (e) => {

    const id = Number(e.target.dataset.id);

    if (!id) return;

    if (e.target.classList.contains("delete")) {

      onDelete(id);

    }

    else if (e.target.classList.contains("edit")) {

      onEdit(id);

    }

    else if (e.target.classList.contains("favorite")) {

      onFavorite(id);

    }

    else if (e.target.classList.contains("pin")) {

      onPin(id);

    }

  });

}

// ======================================
// TOAST
// ======================================

export function showToast(message) {

  const toast = document.getElementById("toast");

  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}