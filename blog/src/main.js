import "./style.css";

import {
    getBlogs,
    addBlog,
    deleteBlog,
    updateBlog
} from "./js/data.js";

import {
    renderBlogList,
    bindBlogEvents
} from "./js/ui.js";

const form = document.getElementById("blog-form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const blogList = document.getElementById("blog-list");
const submitBtn = document.getElementById("submitBtn");

let editId = null;

renderBlogList(blogList);

form.addEventListener("submit", e => {

    e.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title || !body) {

        alert("Please fill all fields.");

        return;
    }

    if (editId !== null) {

        updateBlog(editId, {

            id: editId,

            title,

            body

        });

        editId = null;

        submitBtn.textContent = "Add Blog";

    }

    else {

        addBlog({

            id: Date.now(),

            title,

            body

        });

    }

    form.reset();

    renderBlogList(blogList);

});

bindBlogEvents(

    blogList,

    id => {

        const confirmDelete = confirm("Delete this blog?");

        if (!confirmDelete) return;

        deleteBlog(id);

        renderBlogList(blogList);

    },

    id => {

        const blog = getBlogs().find(blog => blog.id === id);

        if (!blog) return;

        titleInput.value = blog.title;

        bodyInput.value = blog.body;

        editId = id;

        submitBtn.textContent = "Update Blog";

        titleInput.focus();

    }

);