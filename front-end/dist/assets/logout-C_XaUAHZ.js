const o=document.querySelector(".logout a");o&&o.addEventListener("click",()=>{localStorage.removeItem("token"),window.location.href="index.html"});
