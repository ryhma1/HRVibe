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
        let tableHTML = '<h2>User Data</h2><table>';
        tableHTML += '<tr><th>Date</th><th>Mean Heart Rate</th><th>PNS Index</th><th>SNS Index</th></tr>';

        // Iterate over each measurement in reverse order (starting from the most recent one)
        for (let i = userData.results.length - 1; i >= 0; i--) {
            const measurement = userData.results[i];
            const { create_timestamp, result } = measurement;

            // Extract the desired values for each measurement
            const { mean_hr_bpm, pns_index, sns_index } = result;

            // Add a row to the table for the current measurement
            tableHTML += `<tr><td>${JSON.stringify(create_timestamp)}</td>`;
            tableHTML += `<td>${JSON.stringify(mean_hr_bpm)}</td>`;
            tableHTML += `<td>${JSON.stringify(pns_index)}</td>`;
            tableHTML += `<td>${JSON.stringify(sns_index)}</td></tr>`;
        }

        tableHTML += '</table>';

        // Set the HTML content of userDataDiv
        userDataDiv.innerHTML = tableHTML;
    } else {
        // If userData is empty or does not contain measurements, display a message indicating no data available
        userDataDiv.innerHTML = '<h2>No data available</h2>';
    }
}

    // Call functions to fetch and display data when the page loads
    window.onload = async function () {
        await displayUserData();
      };