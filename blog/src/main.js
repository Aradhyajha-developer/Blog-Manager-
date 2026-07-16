import "./style.css";

import {
  addBlog,
  deleteBlog,
  updateBlog,
  toggleFavorite,
  togglePin,
  clearBlogs,
  exportBlogs,
  sortBlogs,
  getBlogs
} from "./js/data.js";


import {
  renderBlogList,
  bindBlogEvents,
  showToast
} from "./js/ui.js";


// =======================
// DOM ELEMENTS
// =======================

const form = document.querySelector("#blogForm");

const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");
const categoryInput = document.querySelector("#category");

const searchInput = document.querySelector("#search");

const categoryFilter = document.querySelector("#categoryFilter");

const sortBtn = document.querySelector("#sortBlogs");

const clearBtn = document.querySelector("#clearAll");

const exportBtn = document.querySelector("#exportBtn");

const darkBtn = document.querySelector("#themeBtn");
const blogContainer =
document.querySelector("#blog-list");


// =======================
// STATE
// =======================

let editId = null;


// =======================
// RENDER FUNCTION
// =======================

function render(){

    let blogs = getBlogs();

    const searchText =
    searchInput.value.toLowerCase();


    const category =
    categoryFilter.value;


    // Search Filter

    blogs = blogs.filter(blog=>{


        const matchSearch =
        blog.title
        .toLowerCase()
        .includes(searchText)
        ||
        blog.body
        .toLowerCase()
        .includes(searchText);



        const matchCategory =
        category === "All Categories"
        ||
        blog.category === category;


        return matchSearch && matchCategory;


    });



renderBlogList(
blogs,
blogContainer
);


bindBlogEvents(

    blogContainer,


    (id)=>{

        deleteBlog(id);

        render();

        showToast("Blog deleted");

    },


    (id)=>{

        const blog =
        getBlogs()
        .find(
            blog=>blog.id===id
        );


        editId = id;


        titleInput.value =
        blog.title;


        bodyInput.value =
        blog.body;


        categoryInput.value =
        blog.category;


        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    },


    (id)=>{

        toggleFavorite(id);

        render();

    },


    (id)=>{

        togglePin(id);

        render();

    }

);
   
// =======================
// FIRST RENDER
// =======================

render();



// =======================
// ADD / UPDATE BLOG
// =======================

form.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const title =
titleInput.value.trim();


const body =
bodyInput.value.trim();


const category =
categoryInput.value;



if(!title || !body){

    showToast(
    "Please fill all fields"
    );

    return;

}



// UPDATE

if(editId){


const oldBlog =
getBlogs()
.find(
blog=>blog.id===editId
);



updateBlog(
editId,
{

...oldBlog,


title,

body,

category,


readTime:
Math.max(
1,
Math.ceil(
body.split(" ").length/200
)
)
+" min read"



}

);



editId=null;



showToast(
"Blog updated"
);



}



// ADD

else{


addBlog({

id:Date.now(),

title,

body,

category,


favorite:false,


pinned:false,


createdAt:
new Date()
.toLocaleDateString(),



readTime:
Math.max(
1,
Math.ceil(
body.split(" ").length/200
)
)
+" min read"



});



showToast(
"Blog added"
);



}



form.reset();



render();



});




// =======================
// SEARCH
// =======================


searchInput
.addEventListener(
"input",
()=>{

render();

});




// =======================
// CATEGORY FILTER
// =======================


categoryFilter
.addEventListener(
"change",
()=>{

render();

});




// =======================
// SORT
// =======================


sortBtn
.addEventListener(
"click",
()=>{


sortBlogs();



render();



showToast(
"Blogs sorted"
);



});




// =======================
// CLEAR ALL
// =======================


clearBtn
.addEventListener(
"click",
()=>{


const confirmDelete =
confirm(
"Delete all blogs?"
);



if(confirmDelete){


clearBlogs();


render();



showToast(
"All blogs removed"
);



}



});




// =======================
// EXPORT
// =======================


exportBtn
.addEventListener(
"click",
()=>{


exportBlogs();



showToast(
"Export successful"
);



});





// =======================
// DARK MODE
// =======================

if(darkBtn){

    darkBtn.addEventListener(
        "click",
        ()=>{

            document.body.classList.toggle("dark");


            const isDark =
            document.body.classList.contains("dark");


            localStorage.setItem(
                "darkMode",
                isDark
            );

        }
    );

}


// =======================
// LOAD DARK MODE
// =======================

if(
localStorage.getItem("darkMode")==="true"
){

    document.body.classList.add("dark");

}