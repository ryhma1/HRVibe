import "./style.css";
import { fetchData } from "./fetch.js";

//
// CREATE USER
const signupForm = document.getElementById("signupForm"); // Selecting the sign-up form
const signupButton = document.querySelector(".signup-button"); // Selecting the sign-up button

signupForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  console.log("Creating user");

  const url = "/api/users";

  const formData = new FormData(signupForm);

  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("password-confirm");

  if (password !== passwordConfirm) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  const data = {
    email: email,
    password: password
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
      alert("User created successfully!");

      // Automatically log in the newly created user
      const loginData = {
        email: email,
        password: password, // Use the same password
      };

      const loginOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      };

      const loginResponse = await fetch(
        "/api/auth/login",
        loginOptions
      );
      const loginResponseData = await loginResponse.json();

      if (loginResponse.ok) {
        localStorage.setItem("token", loginResponseData.token);
        window.location.href = "logged-index.html"; // Redirect to logged-in page
      } else {
        throw new Error(`HTTP error! status: ${loginResponse.status}`);
      }
    } else {
      // Handle other status codes (e.g., server error)
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    alert(
      "Failed to create user. Check your user information and please try again."
    );
  }
});
