//
// USER CREATION / LOGIN
document.getElementById("showSignup").addEventListener("click", () => {
    document.getElementById("signupSection").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
  });
  
  document.querySelector(".login-button").addEventListener("click", loginUser);
  
  document.querySelector(".signup-button").addEventListener("click", createUser);
  
  // CREATE USER
  async function createUser(evt) {
    evt.preventDefault();
    console.log("Creating user");
  
    const url = "/api/users";
  
    const form = document.querySelector("#signupForm");
    const email = form.querySelector("input[name=email]").value;
    const password = form.querySelector("input[name=password]").value;
    const confirmPassword = form.querySelector("input[name=password-confirm]").value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    const data = {
      email: email,
      password: password,
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
        localStorage.setItem("token", responseData.token);
        alert("User created successfully!");
        window.location.href = "logged-index.html"; // Redirect to logged-in page
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  }
  
  // LOG IN USER
  async function loginUser(evt) {
    evt.preventDefault();
    console.log("Logging in user");
  
    const url = "/api/auth/login";
  
    const form = document.querySelector("#loginForm");
  
    const data = {
      email: form.querySelector("input[name=email]").value,
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
        localStorage.setItem("token", responseData.token);
        window.location.href = "logged-index.html"; // Redirect to logged-in page
      } else {
        console.error("Login failed:", responseData.error);
        alert("Unauthorized: email or password incorrect!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again later.");
    }
  }
  