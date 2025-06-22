<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight requests (for CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include('db.php'); // Ensure this file contains the correct DB connection logic

// Query to fetch all users
$query = "SELECT user_id, username, role, email, created_at, phone, address, bio, profile_img FROM users";

$result = $conn->query($query);

if ($result->num_rows > 0) {
    $users = [];

    // Loop through the results and store each user
    while ($row = $result->fetch_assoc()) {
        // Optionally, you can exclude the password field from the response for security
        unset($row['password']); // Don't send the password field to the client

        // If you need to handle images or other fields, you can convert or modify them as needed
        // For example, you can encode images to base64 if necessary
        if ($row['profile_img']) {
            $row['profile_img'] = base64_encode($row['profile_img']);
        }

        $users[] = $row;
    }

    // Respond with a JSON-encoded array of users
    echo json_encode(["success" => true, "data" => $users]);
} else {
    // If no users are found
    echo json_encode(["success" => false, "message" => "No users found."]);
}

$conn->close();
?>
