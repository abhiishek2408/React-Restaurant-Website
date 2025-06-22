<?php
// 🔐 CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
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

// Fetch all orders
$sql = "SELECT cart_id, item_name, quantity, price, delivery_address, time_to_reach, added_at, full_name, email, phone, item_image, state 
        FROM manage_order 
        ORDER BY added_at DESC";

$result = $conn->query($sql);

$orders = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Handle image like the first code (only base64, no prefix)
        if (!empty($row['item_image'])) {
            $row['item_image'] = base64_encode($row['item_image']);
        } else {
            $row['item_image'] = null;
        }
        $orders[] = $row;
    }

    echo json_encode(["success" => true, "data" => $orders]);
} else {
    echo json_encode(["success" => false, "message" => "No orders found"]);
}

$conn->close();
?>

