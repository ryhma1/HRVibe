import "/assets/css/main.css";
import { fetchData } from "./fetch.js";  

//
// LOG IN USER
const loginForm = document.getElementById("loginForm"); // Selecting the login form
const loginUserButton = document.querySelector(".button alt login-button"); // Selecting the login button

loginForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  console.log("Logging in user");

  const url = "/api/auth/login";

  const formData = new FormData(loginForm);

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (response.ok) {
      // Store the token in localStorage
      localStorage.setItem("token", responseData.token);
      // alert("Login successful!");
      window.location.href = "logged-index.html"; // Redirect to logged-in page
    } else {
      // Handle login failure
      console.error("Login failed:", responseData.error);
      alert("Unauthorized: username or password incorrect!");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Error logging in. Please try again later.");
  }
});
