//
// GET USER DATA
// Function to fetch user profile data
async function fetchUserProfile() {
  const token = localStorage.getItem('token');

  console.log(token);

  if (!token) {
    alert('User information not found. Please log in again.');
    return null; // Return null if token not found
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
    return userData; // Return user profile data
  } catch (error) {
    console.error('Error:', error);
    alert(
      'Failed to fetch user profile data. Error details can be found in the console.'
    );
    return null; // Return null in case of error
  }
}

// EDIT PROFILE DATA
// Fetch user data and place it in the user profile
async function placeProfileData() {
  try {
    const rawUserData = await fetchUserProfile(); // Fetch user profile data
    document.getElementById('username').textContent = rawUserData[0].username;
    document.getElementById('height').textContent = rawUserData[0].height;
    document.getElementById('weight').textContent = rawUserData[0].weight;
    document.getElementById('age').textContent = rawUserData[0].age;
    document.getElementById('gender').textContent = rawUserData[0].gender;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// Toggle the profile edit mode
function toggleProfileEdit() {
  const editButton = document.querySelector('.editData');
  const userDetails = document
    .getElementById('userDetails')
    .querySelectorAll('span');

  if (editButton.innerText === 'Edit') {
    editButton.innerText = 'Save';
    userDetails.forEach((span) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      span.textContent = ''; // Clear the span's text content
      span.appendChild(input);
    });
  } else {
    editButton.innerText = 'Edit';
    console.log('Saving account details...');
    saveAccountDetails();
  }
}

async function saveAccountDetails() {
  try {
    const userDetails = document.getElementById('userDetails');
    const username = userDetails.querySelector('p:nth-child(1) input').value;
    const height = userDetails.querySelector('p:nth-child(2) input').value;
    const weight = userDetails.querySelector('p:nth-child(3) input').value;
    const age = userDetails.querySelector('p:nth-child(4) input').value;
    const gender = userDetails.querySelector('p:nth-child(5) input').value;

    const token = localStorage.getItem('token');

    if (!token) {
      alert('User information not found. Please log in again.');
      return;
    }

    const data = {
      username: username,
      height: height,
      weight: weight,
      age: age,
      gender: gender,
    };

    console.log('Request Body:', data);

    // Send data to backend
    const url = 'http://127.0.0.1:3000/api/data';
    const options = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      console.log('Account details saved successfully');
      placeProfileData(); // Refresh the profile data after saving
    } else {
      console.error('Failed to save account details');
    }
  } catch (error) {
    console.error('Error saving account details:', error);
  }
}

// Call the function to fetch and display user profile data
placeProfileData();

// Fetch the profile data from Kubios
async function fetchUserInfo() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('User token not found. Please log in again.');
    return null;
  }

  const url = 'http://127.0.0.1:3000/api/kubios/user-info';
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const response = await fetch(url, options);
    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.error('Error:', error);
    alert(
      'Failed to fetch user info. Error details can be found in the console.'
    );
    return null;
  }
}

// Display user info on the HTML page in a table format
async function displayUserInfo() {
  const userInfoDiv = document.getElementById('userInfo');
  const userInfo = await fetchUserInfo();

  const {user} = userInfo;
  const {birthdate, email, family_name, gender, given_name, height, weight} =
    user;

  // Generate HTML for the table
  let tableHTML = '<h2>User Info</h2><table>';
  tableHTML += '<p>This is the user information set in KubiosCloud.</p>';
  tableHTML += `<tr><th>Name</th><td>${JSON.stringify(given_name)}</td></tr>`;
  tableHTML += `<tr><th>Last Name</th><td>${JSON.stringify(
    family_name
  )}</td></tr>`;
  tableHTML += `<tr><th>Email</th><td>${JSON.stringify(email)}</td></tr>`;
  tableHTML += `<tr><th>Birthdate</th><td>${JSON.stringify(
    birthdate
  )}</td></tr>`;
  tableHTML += `<tr><th>Gender</th><td>${JSON.stringify(gender)}</td></tr>`;
  tableHTML += `<tr><th>Height (cm)</th><td>${JSON.stringify(
    height
  )}</td></tr>`;
  tableHTML += `<tr><th>Weight (kg)</th><td>${JSON.stringify(
    weight
  )}</td></tr>`;
  tableHTML += '</table>';

  // Set the HTML content of userInfoDiv
  userInfoDiv.innerHTML = tableHTML;
}

// Toggle user info display
async function toggleInfo() {
  await displayUserInfo();
};