<?php

header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow these request methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow these headers
header("Access-Control-Allow-Credentials: true"); // If using cookies or authentication

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "restaurant_management";
$port = 3306;

// Include the database name in the connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

$rawData = file_get_contents("php://input");
error_log("Received Data: " . $rawData); // Debugging log

if (!$rawData) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

$data = json_decode($rawData, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["status" => "error", "message" => "JSON decoding error: " . json_last_error_msg()]);
    exit;
}

if (!isset($data['user_id']) || empty($data['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Missing or empty user_id"]);
    exit;
}

$user_id = intval($data['user_id']);

$sql = "SELECT cart_id, menu_section_id, user_id, quantity, price, item_name, state, added_at, updated_at, description, item_image 
        FROM cart 
        WHERE user_id = ?";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Database query preparation failed"]);
    exit;
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $cartData = [];
    while ($row = $result->fetch_assoc()) {
        if (!empty($row['item_image'])) {
            $row['item_image'] = 'data:image/jpeg;base64,' . base64_encode($row['item_image']);
        }
        $cartData[] = $row;
    }
    echo json_encode(["status" => "success", "data" => $cartData]);
} else {
    echo json_encode(["status" => "error", "message" => "No cart data found."]);
}

$stmt->close();
$conn->close();
?>