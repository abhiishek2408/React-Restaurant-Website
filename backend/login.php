<?php

// CORS and headers
header("Access-Control-Allow-Origin: http://localhost:3000"); // Adjust if needed
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();
include('db.php'); // assumes $conn is created here

$response = [
    'success' => false,
    'message' => '',
    'errors' => [],
];

// Check DB connection
if (!$conn) {
    $response['errors'][] = "Database connection failed: " . mysqli_connect_error();
    echo json_encode($response);
    exit;
}

// Check required input
$data = json_decode(file_get_contents("php://input"), true);
$username = isset($data['username']) ? trim($data['username']) : null;
$password = isset($data['password']) ? $data['password'] : null;

if (!$username || !$password) {
    $response['errors'][] = "Username and password are required.";
    echo json_encode($response);
    exit;
}

// Use prepared statement
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
if (!$stmt) {
    $response['errors'][] = "Database error: " . $conn->error;
    echo json_encode($response);
    exit;
}

$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        // Store session
        $_SESSION['user'] = $user;
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['bio'] = $user['bio'];
        $_SESSION['phone'] = $user['phone'];
        $_SESSION['address'] = $user['address'];
        $_SESSION['role'] = $user['role'];

        $response['success'] = true;
        $response['message'] = $user['role'] === 'admin' ? "Welcome Admin!" : "Welcome Customer!";
        $response['role'] = $user['role'];
        $response['user_id'] = $user['user_id'];
        $response['username'] = $user['username'];
        $response['email'] = $user['email'];
        $response['phone'] = $user['phone'];
        $response['bio'] = $user['bio'];
        $response['address'] = $user['address'];
    } else {
        $response['errors'][] = "Invalid password.";
    }
} else {
    $response['errors'][] = "No user found with that username.";
}

$stmt->close();
$conn->close();
echo json_encode($response);
exit;

?>
