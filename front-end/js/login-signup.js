  document.getElementById("showLogin").addEventListener("click", () => {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupSection").style.display = "none";
  });
  
  //
  // CREATE USER
  const createUser = document.querySelector(".createuser");
  
  createUser.addEventListener("click", async (evt) => {
    evt.preventDefault();
    console.log("Creating user");
  
    const url = "/api/users";
  
    const form = document.querySelector("#signupForm");
    const email = form.querySelector("input[name=email]").value;
    const password = form.querySelector("input[name=password]").value;
    const confirmPassword = form.querySelector(
        'input[name=password-confirm]'
      ).value;
    
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
  
    const data = {
      password: password,
      email: email,
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
  
        const loginResponse = await fetch("/api/auth/login", loginOptions);
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
      alert("Failed to create user. Check your user information and please try again.");
    }
  });
  
  //
  // LOG IN USER
  const loginUser = document.querySelector(".loginuser");
  
  loginUser.addEventListener("click", async (evt) => {
    evt.preventDefault();
    console.log("Logging in user");
  
    const url = "/api/auth/login";
  
    const form = document.querySelector("#loginForm");
  
    const data = {
      username: form.querySelector("input[name=username]").value, // Updated to match HTML input name
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
  