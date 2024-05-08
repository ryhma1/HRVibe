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

// Display user data on the HTML page in a table format
async function displayUserData() {
  const userDataDiv = document.getElementById('userData');
  const userData = await fetchUserData();

  if (userData && userData.results && userData.results.length > 0) {
    // Find the most recent measurement
    let mostRecentMeasurement = userData.results[0];
    for (let i = 0; i < userData.results.length; i++) {
      if (
        userData.results[i].create_timestamp >
        mostRecentMeasurement.create_timestamp
      ) {
        mostRecentMeasurement = userData.results[i];
      }
    }
    const {create_timestamp, result} = mostRecentMeasurement;
    const {mean_hr_bpm, pns_index, sns_index, stress_index} = result;

    // Parse the timestamp to separate date and time
    const timestamp = new Date(create_timestamp);
    const date = timestamp.toDateString();
    const time = timestamp.toLocaleTimeString();

    // Generate HTML for the table
    let tableHTML = '<h2>Latest Measurement</h2><table>';
    tableHTML += `<tr><th>Date</th><td>${date}</td></tr>`;
    tableHTML += `<tr><th>Time</th><td>${time}</td></tr>`;
    tableHTML += `<tr><th>Mean Heart Rate (bpm)</th><td>${mean_hr_bpm.toFixed(
      2
    )}</td></tr>`;
    tableHTML += `<tr><th>PNS Index</th><td>${pns_index.toFixed(2)}</td></tr>`;
    tableHTML += `<tr><th>SNS Index</th><td>${sns_index.toFixed(2)}</td></tr>`;
    tableHTML += `<tr><th>Stress Index</th><td>${stress_index.toFixed(
      2
    )}</td></tr>`;
    tableHTML += '</table>';

    // Add a button to go back to the previous page
    tableHTML += '<button class="goBack" onclick="goBack()">Back</button>';

    // Set the HTML content of userDataDiv
    userDataDiv.innerHTML = tableHTML;
  } else {
    // If userData is empty or does not contain measurements, display a message indicating no data available
    userDataDiv.innerHTML = '<h2>No data available</h2>';
  }
}

// Function to go back to the previous page
function goBack() {
  window.location.href = 'measure.html';
}

// Call functions to fetch and display data when the page loads
window.onload = async function () {
  await displayUserData();
};
