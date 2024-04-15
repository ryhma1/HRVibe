import { fetchData } from "../js/fetch.js";

const signupForm = document.getElementById("signupForm"); // Selecting the sign-up form
const signupButton = document.querySelector(".signup-button"); // Selecting the sign-up button

signupForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  console.log("Creating user");

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("password-confirm");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const passwordConfirm = passwordConfirmInput.value.trim();

  if (!email || !password || !passwordConfirm) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== passwordConfirm) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  // Password must be at least 8 characters long
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  // You can add more password strength checks if needed

  const hashedPassword = await hashPassword(password);

  const data = {
    email: email,
    password: hashedPassword
  };

  const url = "/api/users";

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

      // Redirect to logged-in page
      window.location.href = "logged-index.html";
    } else {
      // Handle server errors
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    alert(
      "Failed to create user. Please try again later."
    );
  }
});

async function hashPassword(password) {
  // You can use a library like bcrypt.js for secure password hashing
  // For demonstration purposes, this function just returns the original password
  return password;
}
