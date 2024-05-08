async function fetchUserData() {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('User token not found. Please log in again.');
      return null;
    }
  
    const url = 'http://127.0.0.1:3000/api/kubios/user-data';
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
  
  // Display user data on the HTML page in a table format
  async function displayUserData() {
    const userDataDiv = document.getElementById('userData');
    const userData = await fetchUserData();

    if (userData && userData.results && userData.results.length > 0) {
        // Find the most recent measurement
        let mostRecentMeasurement = userData.results[0];
        for (let i = 0; i < userData.results.length; i++) {
            if (userData.results[i].create_timestamp > mostRecentMeasurement.create_timestamp) {
                mostRecentMeasurement = userData.results[i];
            }
        }
        const { create_timestamp, result } = mostRecentMeasurement;
        const { mean_hr_bpm, pns_index, sns_index } = result;
  
    // Generate HTML for the table
        let tableHTML = '<h2>User Data</h2><table>';
        tableHTML += `<tr><th>Date</th><td>${JSON.stringify(create_timestamp)}</td></tr>`;
        tableHTML += `<tr><th>Mean Heart Rate (bpm)</th><td>${JSON.stringify(mean_hr_bpm)}</td></tr>`;
        tableHTML += `<tr><th>PNS Index</th><td>${JSON.stringify(pns_index)}</td></tr>`;
        tableHTML += `<tr><th>SNS Index</th><td>${JSON.stringify(sns_index)}</td></tr>`;
        tableHTML += '</table>';
  
    // Set the HTML content of userDataDiv
        userDataDiv.innerHTML = tableHTML;
    } else {
        // If userData is empty or does not contain measurements, display a message indicating no data available
        userDataDiv.innerHTML = '<h2>No data available</h2>';
      }
}
  
  // Display user info on the HTML page in a table format
  async function displayUserInfo() {
    const userInfoDiv = document.getElementById('userInfo');
    const userInfo = await fetchUserInfo();

    const { user } = userInfo;
    const { birthdate, email, family_name, gender, given_name, height, weight } = user;
  
    // Generate HTML for the table
    let tableHTML = '<h2>User Info</h2><table>';
    tableHTML += `<tr><th>Name</th><td>${JSON.stringify(given_name)}</td></tr>`;
    tableHTML += `<tr><th>Last Name</th><td>${JSON.stringify(family_name)}</td></tr>`;
    tableHTML += `<tr><th>Email</th><td>${JSON.stringify(email)}</td></tr>`;
    tableHTML += `<tr><th>Birthdate</th><td>${JSON.stringify(birthdate)}</td></tr>`;
    tableHTML += `<tr><th>Gender</th><td>${JSON.stringify(gender)}</td></tr>`;
    tableHTML += `<tr><th>Height (cm)</th><td>${JSON.stringify(height)}</td></tr>`;
    tableHTML += `<tr><th>Weight (kg)</th><td>${JSON.stringify(weight)}</td></tr>`;
    tableHTML += '</table>';
  
    // Set the HTML content of userInfoDiv
    userInfoDiv.innerHTML = tableHTML; 
  }
  
  // Call functions to fetch and display data when the page loads
  window.onload = async function () {
    await displayUserData();
    await displayUserInfo();
  };


  