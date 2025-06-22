<?php
session_start();
include('db.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$response = [];

if ($conn->connect_error) {
    $response['status'] = "error";
    $response['message'] = "Database connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit;
}

// Handle GET request to fetch user session data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['user'])) {
        // User is logged in, return user data from session
        $user = $_SESSION['user'];
        
        // Prepare the response with the user's data
        $response = [
            "status" => "success",
            "user" => [
                "user_id" => $user['user_id'],
                "username" => $user['username'],
                "role" => $user['role'],
                "email" => $user['email'],
                "created_at" => $user['created_at'],
                "phone" => $user['phone'],
                "address" => $user['address'],
                "bio" => $user['bio'],
                "profile_img" => $user['profile_img']  // Assuming profile_img is base64 encoded
            ]
        ];
    } else {
        // No user logged in
        $response = [
            "status" => "error",
            "message" => "No user logged in"
        ];
    }

    echo json_encode($response);
    exit;
}

$conn->close();
?>
