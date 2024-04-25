import "../assets/css/main.css";
//
// POST USER DATA
document
  .getElementById("user_form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const height = formData.get("height");
    const weight = formData.get("weight");
    const age = formData.get("age");
    const gender = formData.get("gender");

    // DEBUG: Check if form data is captured correctly
    console.log("Form Data:", username, height, weight, age, gender);

    // Get user information from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User information not found. Please log in again.");
      return;
    }

    // Construct request body
    const data = {
      username: username,
      height: height,
      weight: weight,
      age: age,
      gender: gender,
    };

    // DEBUG: Check if request body is constructed correctly
    console.log("Request Body:", data);

    // Send data to backend
    const url = "http://127.0.0.1:3000/api/data";
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      const responseDataText = await response.text(); // Log the response text
      console.log("Response text:", responseDataText); // Log the response text

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Entry added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add data. Error details can be found in the console.");
    }
  });