//
// LOGOUT
const logoutButton = document.querySelector(".logout a");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});