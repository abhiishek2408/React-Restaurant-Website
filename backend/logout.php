<?php

// Allow cross-origin requests from all origins (or specify your frontend's domain, e.g., http://localhost:3000)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Start the session to access the session variables
session_start();

// Destroy the session and clear all session data
session_unset();  // Remove all session variables
session_destroy(); // Destroy the session itself

// Respond with a success message
$response = [
    'success' => true,
    'message' => 'User logged out successfully.'
];

// Return the response as JSON
echo json_encode($response);
exit;
?>
