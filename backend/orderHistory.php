<?php
// 🔐 CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000"); // Match your frontend domain
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// DB connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "restaurant_management";
$port = 3306;

$conn = new mysqli($servername, $username, $password, $dbname, $port);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Parse raw JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Validate user_id
if (!isset($data['user_id']) || empty($data['user_id'])) {
    echo json_encode(["success" => false, "message" => "Missing or empty user_id"]);
    exit;
}

$user_id = intval($data['user_id']);

// Fetch completed orders
$sql = "SELECT cart_id, item_name, quantity, price, delivery_address, time_to_reach, added_at, full_name, email, phone, item_image 
        FROM manage_order 
        WHERE user_id = ? AND state = 'completed' 
        ORDER BY added_at DESC";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "SQL error"]);
    exit;
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    if (!empty($row['item_image']) && !str_starts_with($row['item_image'], 'data:image')) {
        // Encode binary image only if not already base64
        $row['item_image'] = 'data:image/jpeg;base64,' . base64_encode($row['item_image']);
        
    }
    $orders[] = $row;
}

if (!empty($orders)) {
    echo json_encode(["success" => true, "data" => $orders]);
} else {
    echo json_encode(["success" => false, "message" => "No completed orders found"]);
}

$stmt->close();
$conn->close();
?>
