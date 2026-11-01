
const fetchBtn = document.getElementById("fetchBtn");
const userContainer = document.getElementById("userContainer");
const message = document.getElementById("message");

// Function to fetch users from API
async function fetchUsers() {
    userContainer.innerHTML = "";
    message.textContent = "Loading users...";

    try {
        // Fetch data from API
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        // Check if response is successful
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        // Convert response into JSON
        const users = await response.json();

        message.textContent = "Users fetched successfully!";

        // Display users dynamically
        users.forEach(function (user) {
            const card = document.createElement("div");
            card.className = "user-card";

            card.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>City:</strong> ${user.address.city}</p>
            `;

            userContainer.appendChild(card);
        });

    } catch (error) {
        message.textContent = "Error: " + error.message;
    }
}

// Fetch users when button is clicked
fetchBtn.addEventListener("click", fetchUsers);
