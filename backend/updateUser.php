<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include('db.php');
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    // Log the received data to check if it's correct
    error_log(print_r($input, true)); // Log the input data

    // Check if input is valid
    if (!isset($input['user_id']) || !isset($input['username']) || !isset($input['email'])) {
        echo json_encode(["success" => false, "message" => "Invalid input data"]);
        exit;
    }

    $user_id = intval($input['user_id']);
    $username = $input['username'];
    $password = isset($input['password']) ? $input['password'] : '';  // Assuming password is being updated, or you can ignore if not updating
    $role = isset($input['role']) ? $input['role'] : '';  // Role is optional
    $email = $input['email'];
    $phone = isset($input['phone']) ? $input['phone'] : ''; 
    $address = isset($input['address']) ? $input['address'] : '';
    $bio = isset($input['bio']) ? $input['bio'] : '';
    $profile_img = isset($input['profile_img']) ? base64_decode($input['profile_img']) : null;

    // Check if profile image exists and update accordingly
    if ($profile_img) {
        // If profile image is provided, bind 8 parameters (including the image)
        $stmt = $conn->prepare("UPDATE users SET username=?, password=?, role=?, email=?, phone=?, address=?, bio=?, profile_img=? WHERE user_id=?");
        $stmt->bind_param("ssssssssi", $username, $password, $role, $email, $phone, $address, $bio, $profile_img, $user_id);
    } else {
        // If no profile image, bind 7 parameters (without the image)
        $stmt = $conn->prepare("UPDATE users SET username=?, password=?, role=?, email=?, phone=?, address=?, bio=? WHERE user_id=?");
        $stmt->bind_param("sssssssi", $username, $password, $role, $email, $phone, $address, $bio, $user_id);
    }

    // Execute the query and check success
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating user."]);
    }

    $stmt->close();
    $conn->close();
}
?>
