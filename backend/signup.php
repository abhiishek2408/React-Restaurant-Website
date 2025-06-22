<?php
// Allow CORS and set JSON header
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

include('./db.php');

// Prepare the default response
$response = [
    'success' => false,
    'errors' => []
];

// Check database connection
if ($conn->connect_error) {
    $response['errors']['db'] = "Database connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect and sanitize form inputs
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $address = $_POST['address'] ?? '';
    $bio = $_POST['bio'] ?? '';
    $created_at = date('Y-m-d H:i:s');
    $role = 'customer';
    $imageData = null;

    // Validate password confirmation
    if ($password !== $confirmPassword) {
        $response['errors']['confirmPassword'] = "Passwords do not match.";
        echo json_encode($response);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Handle profile image (optional)
    if (isset($_FILES['profileImg']) && $_FILES['profileImg']['error'] === UPLOAD_ERR_OK) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        $fileType = $_FILES['profileImg']['type'];
        if (in_array($fileType, $allowedTypes)) {
            $imageData = file_get_contents($_FILES['profileImg']['tmp_name']);
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
        $response['errors']['username'] = "Username already taken.";
    }

    // Check for existing email
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($emailCount);
    $stmt->fetch();
    $stmt->close();

    if ($emailCount > 0) {
        $response['errors']['email'] = "Email already in use.";
    }

    // If there are no errors, insert the user
    if (empty($response['errors'])) {
        // Use 'b' type for binary data (image)
        $stmt = $conn->prepare("INSERT INTO users (username, password, email, phone, address, bio, created_at, role, profile_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssss", $username, $hashedPassword, $email, $phone, $address, $bio, $created_at, $role, $imageData);
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Registration successful!";
        } else {
            $response['errors']['db'] = "Error inserting user: " . $stmt->error;
        }
        $stmt->close();
    }
}

$conn->close();
echo json_encode($response);
?>
