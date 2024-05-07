async function fetchUserData() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('User token not found. Please log in again.');
    return null;
  }

  const url = 'http://127.0.0.1:3000/api/user-data';
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const response = await fetch(url, options);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error:', error);
    alert(
      'Failed to fetch user data. Error details can be found in the console.'
    );
    return null;
  }
}

async function fetchUserInfo() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('User token not found. Please log in again.');
    return null;
  }

  const url = 'http://127.0.0.1:3000/api/user-info';
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

// Display user data on the HTML page in a table format
async function displayUserData() {
  const userDataDiv = document.getElementById('userData');
  const userData = await fetchUserData();

  // Generate HTML for the table
  let tableHTML = '<h2>User Data</h2><table>';
  for (let key in userData) {
    tableHTML += `<tr><th>${key}</th><td>${userData[key]}</td></tr>`;
  }
  tableHTML += '</table>';

  // Set the HTML content of userDataDiv
  userDataDiv.innerHTML = tableHTML;
}

// Display user info on the HTML page in a table format
async function displayUserInfo() {
  const userInfoDiv = document.getElementById('userInfo');
  const userInfo = await fetchUserInfo();

  // Generate HTML for the table
  let tableHTML = '<h2>User Info</h2><table>';
  for (let key in userInfo) {
    tableHTML += `<tr><th>${key}</th><td>${userInfo[key]}</td></tr>`;
  }
  tableHTML += '</table>';

  // Set the HTML content of userInfoDiv
  userInfoDiv.innerHTML = tableHTML;
}

// Call functions to fetch and display data when the page loads
window.onload = async function () {
  await displayUserData();
  await displayUserInfo();
};
