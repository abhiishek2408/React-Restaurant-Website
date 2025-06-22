<?php
// CORS HEADERS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// DB connection
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "restaurant_management";
$port = 3306;

$conn = new mysqli($servername, $username, $password, $dbname, $port);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Get JSON input from frontend
$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$message = trim($data['message'] ?? '');

// Validate
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["success" => false, "message" => "Please fill all required fields."]);
    exit;
}

// Insert into database
$sql = "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $phone, $message);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Your message has been submitted successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Something went wrong."]);
}

$stmt->close();
$conn->close();
?>
