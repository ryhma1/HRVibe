import "/assets/css/main.css";
import { fetchData } from "./fetch.js";

//
// LOG IN USER
const loginUser = document.querySelector(".button.alt");

loginUser.addEventListener("click", async (evt) => {
  evt.preventDefault();
  console.log("Logging in user");

  const url = "/api/auth/login";

  // Select the form element
  const form = document.querySelector("form");

  const data = {
    // Adjust the input field name attributes here
    username: form.querySelector("input[name=email]").value,
    password: form.querySelector("input[name=password]").value,
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

// Define logResponse function
function logResponse(codeblock, text) {
  document.getElementById(codeblock).innerText = text;
}
