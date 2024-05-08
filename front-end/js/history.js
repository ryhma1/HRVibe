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

async function displayUserData() {
  const userDataDiv = document.getElementById('userData');
  const userData = await fetchUserData();

  if (userData && userData.results && userData.results.length > 0) {
    // Generate HTML for the table
    let tableHTML = '<h2>Measurement History</h2><table>';
    tableHTML +=
      '<tr><th>Date</th><th>Time</th><th>Mean Heart Rate</th><th>PNS Index</th><th>SNS Index</th><th>Stress Index</th></tr>';

    // Iterate over each measurement in reverse order (starting from the most recent one)
    for (let i = userData.results.length - 1; i >= 0; i--) {
      const measurement = userData.results[i];
      const {create_timestamp, result} = measurement;

      // Extract the desired values for each measurement
      const {mean_hr_bpm, pns_index, sns_index, stress_index} = result;

      // Parse the timestamp to separate date and time
      const timestamp = new Date(create_timestamp);
      const date = timestamp.toLocaleDateString();
      const time = timestamp.toLocaleTimeString();

      // Add a row to the table for the current measurement
      tableHTML += `<tr>`;
      tableHTML += `<td>${date}</td>`;
      tableHTML += `<td>${time}</td>`;
      tableHTML += `<td>${mean_hr_bpm.toFixed(2)}</td>`;
      tableHTML += `<td>${pns_index.toFixed(2)}</td>`;
      tableHTML += `<td>${sns_index.toFixed(2)}</td>`;
      tableHTML += `<td>${stress_index.toFixed(2)}</td>`;
      
      tableHTML += `</tr>`;
    }
    tableHTML += '</table>';

    // Add a button to go back to the previous page
    tableHTML += '<button class="goBack2" onclick="goBack2()">Back</button>';

    // Set the HTML content of userDataDiv
    userDataDiv.innerHTML = tableHTML;
  } else {
    // If userData is empty or does not contain measurements, display a message indicating no data available
    userDataDiv.innerHTML = '<h2>No data available</h2>';
  }
}

// Function to go back to the previous page
function goBack2() {
  window.location.href = 'measure.html';
}

// Call functions to fetch and display data when the page loads
window.onload = async function () {
  await displayUserData();
};
