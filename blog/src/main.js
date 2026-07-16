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

const form =
document.querySelector("#blogForm");


const titleInput =
document.querySelector("#title");


const bodyInput =
document.querySelector("#body");


const categoryInput =
document.querySelector("#category");


const searchInput =
document.querySelector("#search");


const categoryFilter =
document.querySelector("#categoryFilter");


const sortBtn =
document.querySelector("#sortBlogs");


const clearBtn =
document.querySelector("#clearAll");


const exportBtn =
document.querySelector("#exportBtn");


const darkBtn =
document.querySelector("#themeBtn");


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


let blogs =
getBlogs();



const searchText =
searchInput.value
.toLowerCase();



const selectedCategory =
categoryFilter.value;




blogs =
blogs.filter(blog=>{


const searchMatch =

blog.title
.toLowerCase()
.includes(searchText)

||

blog.body
.toLowerCase()
.includes(searchText);



const categoryMatch =

selectedCategory === "All Categories"

||

blog.category === selectedCategory;



return searchMatch && categoryMatch;



});



renderBlogList(

blogContainer,

blogs

);


}





// =======================
// BLOG ACTION HANDLERS
// =======================


function handleDelete(id){


deleteBlog(id);


render();


showToast(
"Blog deleted"
);


}




function handleEdit(id){


const blog =
getBlogs()
.find(
item=>item.id===id
);



if(!blog) return;



editId=id;



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


}





function handleFavorite(id){


toggleFavorite(id);


render();


}




function handlePin(id){


togglePin(id);


render();


}






// =======================
// EVENT BINDING
// =======================


bindBlogEvents(

blogContainer,

handleDelete,

handleEdit,

handleFavorite,

handlePin

);






// =======================
// INITIAL LOAD
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





const readTime =

Math.max(

1,

Math.ceil(
body.split(" ").length / 200
)

)

+ " min read";





// UPDATE BLOG

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

readTime

}

);




editId=null;



showToast(
"Blog updated"
);



}




// ADD BLOG

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



readTime


});



showToast(
"Blog added"
);



}




form.reset();



render();



}

);







// =======================
// SEARCH
// =======================


searchInput.addEventListener(

"input",

()=>{


render();


}

);






// =======================
// CATEGORY FILTER
// =======================


categoryFilter.addEventListener(

"change",

()=>{


render();


}

);







// =======================
// SORT
// =======================


if(sortBtn){


sortBtn.addEventListener(

"click",

()=>{


sortBlogs();


render();


showToast(
"Blogs sorted"
);



}

);


}






// =======================
// CLEAR ALL
// =======================


if(clearBtn){


clearBtn.addEventListener(

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



}

);


}







// =======================
// EXPORT
// =======================


if(exportBtn){


exportBtn.addEventListener(

"click",

()=>{


exportBlogs();


showToast(
"Export successful"
);



}

);


}







// =======================
// DARK MODE
// =======================


if(darkBtn){


darkBtn.addEventListener(

"click",

()=>{


document.body.classList.toggle(
"dark"
);



localStorage.setItem(

"darkMode",

document.body.classList.contains(
"dark"
)

);



}

);


}





// LOAD DARK MODE


if(

localStorage.getItem(
"darkMode"
)==="true"

){


document.body.classList.add(
"dark"
);


}