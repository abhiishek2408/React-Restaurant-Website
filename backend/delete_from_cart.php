<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

session_start();

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "restaurant_management";
$port = 3306;

// Create a new connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check the connection
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed.']);
    exit();
}

// Decode JSON payload from the request
$data = json_decode(file_get_contents("php://input"), true);

file_put_contents("php://stderr", print_r($data, true)); // Log data to debug

// Validate the request type and payload
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data['action'], $data['cart_id']) && $data['action'] === 'delete') {
    
    // Validate and sanitize cart_id
    $itemId = filter_var($data['cart_id'], FILTER_VALIDATE_INT);
    $userId = 1; // Ensure user is logged in (you may replace with actual user ID logic)

    // Log variables for debugging
    file_put_contents("php://stderr", "Item ID: " . $itemId . ", User ID: " . $userId . "\n");

    // If cart_id or user_id is invalid, respond with an error
    if (!$itemId || !$userId) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request data.']);
        exit();
    }

    // Prepare the delete statement to prevent SQL injection
    $stmt = $conn->prepare("DELETE FROM cart WHERE cart_id = ? AND user_id = ?");

    // Check if the statement was prepared correctly
    if ($stmt === false) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to prepare SQL statement.']);
        exit();
    }

    // Bind parameters and check for errors
    $stmt->bind_param("ii", $itemId, $userId);

    // Execute the query and check for errors
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Item deleted from cart']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete item']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request.']);
}

exit();
?>
