//
// GET USER ENTRIES
const getEntriesButton = document.querySelector(".get_history");
getEntriesButton.addEventListener("click", getDiaryEntries);

async function getDiaryEntries() {
  try {
    // Get user token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User token not found. Please log in.");
    }

    // Fetch user's diary entries
    const response = await fetch("/api/measurements", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch diary entries.");
    }

    const data = await response.json();
    if (data.length === 0) {
      // Show alert if there are no entries
      alert("There are no diary entries for the user. Please add entry.");
      return; // Exit function early
    }

    // Display diary entries in the table
    const diaryEntriesTable = document.querySelector(".diary-entries");
    diaryEntriesTable.innerHTML = ""; // Clear existing entries

    data.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${measurement.measurement}</td>
          <td>${measurement.device}</td>
          <td>${measurement.date}</td>
          <td>
            <button class="detail" data-id="${entry.entry_id}">Details</button>
          </td>
        `;

      // Add event listener for Update button
      const updateButton = row.querySelector(".update");
      updateButton.addEventListener("click", () => {
        // Open modal or form for modification
        openUpdateEntryPopup(entry);
      });

      // Add event listener for Delete button
      const deleteButton = row.querySelector(".del");
      deleteButton.addEventListener("click", deleteEntry);

      diaryEntriesTable.appendChild(row);
    });
  } catch (error) {
    console.error("Error:", error.message);
    alert("Failed to fetch diary entries. Please try again.");
  }
}