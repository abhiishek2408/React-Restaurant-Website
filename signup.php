<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

include('./db.php');

$response = [
    'success' => false,
    'errors' => []
];

// Check database connection
if ($conn->connect_error) {
    $response['errors']['db'] = "Database connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit;
} else {
    $response['message'] = "Database connection successful.";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $email = $_POST['email'];
    $phone = $_POST['phone'] ?? '';
    $address = $_POST['address'] ?? '';
    $bio = $_POST['bio'] ?? '';
    $created_at = date('Y-m-d H:i:s');
    $role = 'customer';
    $imageData = null;

    // Profile image handling
    if (isset($_FILES['profileImg']) && $_FILES['profileImg']['error'] === UPLOAD_ERR_OK) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        $fileType = $_FILES['profileImg']['type'];
        if (in_array($fileType, $allowedTypes)) {
            $imageData = file_get_contents($_FILES['profileImg']['tmp_name']);
            if ($imageData === false) {
                $response['errors']['profileImg'] = "Failed to process image.";
            }
        } else {
            $response['errors']['profileImg'] = "Invalid file type. Please upload a JPEG, PNG, or GIF image.";
        }
    }

    // Check for existing username
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($usernameCount);
    $stmt->fetch();
    $stmt->close();

    if ($usernameCount > 0) {
        $response['errors']['username'] = "Username already taken. Please choose a different username.";
    }

    // Check for existing email
    if (!isset($response['errors']['username'])) {
        $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($emailCount);
        $stmt->fetch();
        $stmt->close();

        if ($emailCount > 0) {
            $response['errors']['email'] = "Email already in use. Please use a different email.";
        }
    }

    // Insert data if no errors
    if (empty($response['errors'])) {
        $stmt = $conn->prepare("INSERT INTO users (username, password, email, phone, address, bio, created_at, role, profile_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssss", $username, $password, $email, $phone, $address, $bio, $created_at, $role, $imageData);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Registration successful!";
        } else {
            $response['errors']['db'] = "Error executing statement: " . $stmt->error;
        }
        $stmt->close();
    }
}

echo json_encode($response);
$conn->close();
?>
