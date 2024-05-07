//
// GET USER DATA
// Function to fetch user profile data
async function fetchUserProfile() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('User information not found. Please log in again.');
    return;
  }

  const url = `http://127.0.0.1:3000/api/data`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const response = await fetch(url, options);
    const userData = await response.json();

    if (userData && userData.length > 0 && userData[0].username) {
      // User has a username, redirect to a new page
      window.location.href = 'logged-index.html';
      return;
    }
  } catch (error) {
    console.error('Error:', error);
    alert(
      'Failed to fetch user profile data. Error details can be found in the console.'
    );
  }
}

// Call the function to fetch and display user profile data
fetchUserProfile();

//
// POST USER DATA
document
  .getElementById('user_form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const height = formData.get('height');
    const weight = formData.get('weight');
    const age = formData.get('age');
    const gender = formData.get('gender');

    // Get user information from localStorage
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      alert('User information not found. Please log in again.');
      return;
    }

    // Add data
    const data = {
      username: username,
      height: height,
      weight: weight,
      age: age,
      gender: gender,
    };

    // DEBUG: Check if request body is constructed correctly
    console.log('Request Body:', data);

    // Send data to backend
    const url = 'http://127.0.0.1:3000/api/data';
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      const responseDataText = await response.text(); // Log the response text
      console.log('Response text:', responseDataText); // Log the response text

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      window.location.href = 'logged-index.html';
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add data. Error details can be found in the console.');
    }
  });
