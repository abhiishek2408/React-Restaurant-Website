<?php
session_start();
include('db.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$response = [];

// Check if the user is logged in
if (!isset($_SESSION['user'])) {
    echo json_encode([
        "status" => "error",
        "message" => "User not logged in."
    ]);
    exit;
}

$user = $_SESSION['user'];
$sql = "SELECT * FROM users WHERE user_id = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("i", $user['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user_details = $result->fetch_assoc();
        $response = [
            "status" => "success",
            "user" => [
                "user_id" => $user_details['user_id'],
                "username" => $user_details['username'],
                "email" => $user_details['email'],
                "role" => $user_details['role'],
                "phone" => $user_details['phone'],
                "address" => $user_details['address'],
                "bio" => $user_details['bio'],
                "profile_img" => $user_details['profile_img'] ? base64_encode($user_details['profile_img']) : null,
                "created_at" => $user_details['created_at']
            ]
        ];
    } else {
        $response = ["status" => "error", "message" => "User data not found in the database."];
    }

    $stmt->close();
} else {
    $response = ["status" => "error", "message" => "Failed to prepare statement."];
}

$conn->close();
echo json_encode($response);
?>
