

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