// LOGOUT
const logoutButton = document.querySelector(".logout a");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
}
