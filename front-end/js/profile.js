//
// GET USER DATA
async function getUserProfile() {
  try {
    // Get user token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User token not found. Please log in.');
    }

    // Fetch user's profile data
    const response = await fetch('http://127.0.0.1:3000/api/data', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile data.');
    }

    const userData = await response.json();

    // Update the HTML to display user profile data
    document.getElementById('username').textContent = userData.username;
    document.getElementById('height').textContent = userData.height;
    document.getElementById('weight').textContent = userData.weight;
    document.getElementById('age').textContent = userData.age;
    document.getElementById('gender').textContent = userData.gender;

    console.log(userData);
  } catch (error) {
    console.error('Error:', error.message);
    alert('Failed to fetch user profile data. Please try again.');
  }
}














// Call the function to fetch and display user profile data when the page loads
window.addEventListener('load', getUserProfile);

//
// UPDATE ENTRY
// Function to handle updating an entry
async function updateData(dataId, updatedData) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User token not found. Please log in.');
    }

    const response = await fetch(`http://127.0.0.1:3000/api/data/${dataId}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update data.');
    }

    alert('Data updated successfully!');
    // Refresh the entries table after updating
    getDiaryEntries();
  } catch (error) {
    console.error('Error:', error.message);
    alert('Failed to update entry. Please try again.');
  }
}

// Function to open update entry popup/modal with pre-filled data
function openUpdateDataPopup(data) {
  const updateModal = document.getElementById('updateModal');
  const moodInput = document.getElementById('moodInput');
  const sleepHoursInput = document.getElementById('sleepHoursInput');
  const notesInput = document.getElementById('notesInput');
  const updateForm = document.getElementById('updateForm');

  // Prefill input fields with existing entry data
  moodInput.value = entry.mood;
  sleepHoursInput.value = entry.sleep_hours;
  notesInput.value = entry.notes;

  // Define function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const updatedData = {
      mood: moodInput.value,
      sleep_hours: sleepHoursInput.value,
      notes: notesInput.value,
    };
    updateEntry(entry.entry_id, updatedData);
    updateModal.style.display = 'none'; // Close the modal after submission
    // Remove event listener after submission
    updateForm.removeEventListener('submit', handleSubmit);
  }

  // Event listener for form submission
  updateForm.addEventListener('submit', handleSubmit);

  // Event listener for close button
  const closeButton = document.querySelector('#updateModal .close');
  closeButton.addEventListener('click', () => {
    updateModal.style.display = 'none'; // Close the modal on close button click
    // Remove event listener if modal is closed without submission
    updateForm.removeEventListener('submit', handleSubmit);
  });

  // Display the modal
  updateModal.style.display = 'block';
}

// Event listener for Update button in each row of the diary entries table
document.querySelectorAll('.update').forEach((updateButton) => {
  updateButton.addEventListener('click', async (event) => {
    const entryId = event.target.dataset.id;
    // Fetch the entry details based on entryId
    const entry = await fetchEntryDetails(entryId);
    if (entry) {
      openUpdateEntryPopup(entry);
    }
  });
});

//
// DELETE ENTRY
async function deleteEntry(event) {
  const id = event.target.dataset.id;
  const answer = confirm(`Are you sure you want to delete entry ID: ${id} ?`);
  if (answer) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User token not found. Please log in.');
      }

      const response = await fetch(`http://127.0.0.1:3000/api/data/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete entry.');
      }

      alert('Entry deleted successfully!');
      // Refresh the entries table after deletion
      getDiaryEntries();
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to delete entry. Please try again.');
    }
  }
}
