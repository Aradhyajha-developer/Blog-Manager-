let blogs = JSON.parse(localStorage.getItem("blogs")) || [];



export function getBlogs(){

return blogs;

}



function saveBlogs(){

localStorage.setItem(
"blogs",
JSON.stringify(blogs)
);

}



export function addBlog(blog){

blogs.push(blog);

saveBlogs();

}



export function deleteBlog(id){

blogs = blogs.filter(
blog => blog.id !== id
);

saveBlogs();

}



export function updateBlog(id,updatedBlog){


blogs = blogs.map(blog=>{


if(blog.id === id){

return updatedBlog;

}


return blog;


});


saveBlogs();


}