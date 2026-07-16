import {getBlogs} from "./data.js";



export function renderBlogList(container){


container.innerHTML="";



getBlogs().forEach(blog=>{


const li=document.createElement("li");



li.innerHTML=`

<h3>${blog.title}</h3>

<p>${blog.body}</p>


<button class="edit" data-id="${blog.id}">
Edit
</button>


<button class="delete" data-id="${blog.id}">
Delete
</button>


`;



container.appendChild(li);



});


}




export function bindBlogEvents(container,onDelete,onEdit){



container.addEventListener("click",(e)=>{


const id=Number(e.target.dataset.id);



if(e.target.classList.contains("delete")){


onDelete(id);


}



if(e.target.classList.contains("edit")){


onEdit(id);


}



});



}