import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css             */import"./logout-C_XaUAHZ.js";async function r(){const e=localStorage.getItem("token");if(console.log(e),!e)return alert("User information not found. Please log in again."),null;const n="http://127.0.0.1:3000/api/data",o={method:"GET",headers:{Authorization:"Bearer "+e}};try{return await(await fetch(n,o)).json()}catch(t){return console.error("Error:",t),alert("Failed to fetch user profile data. Error details can be found in the console."),null}}async function a(){try{const e=await r();document.getElementById("username").textContent=e[0].username,document.getElementById("height").textContent=e[0].height,document.getElementById("weight").textContent=e[0].weight,document.getElementById("age").textContent=e[0].age,document.getElementById("gender").textContent=e[0].gender}catch(e){console.error("Error fetching user data:",e)}}a();
