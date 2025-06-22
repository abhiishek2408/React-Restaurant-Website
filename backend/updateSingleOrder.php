<?php
// Allow CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

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
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Read input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['cart_id']) || empty($data['cart_id'])) {
    echo json_encode(["success" => false, "message" => "Missing cart_id"]);
    exit;
}

$cart_id = intval($data['cart_id']);
$quantity = isset($data['quantity']) ? intval($data['quantity']) : null;
$price = isset($data['price']) ? floatval($data['price']) : null;
$state = isset($data['state']) ? $conn->real_escape_string($data['state']) : null;
$delivery_address = isset($data['delivery_address']) ? $conn->real_escape_string($data['delivery_address']) : null;
$item_image = isset($data['item_image']) ? $data['item_image'] : null;

$updateFields = [];
$params = [];
$types = "";

// Build update fields
if ($quantity !== null) {
    $updateFields[] = "quantity = ?";
    $params[] = $quantity;
    $types .= "i";
}
if ($price !== null) {
    $updateFields[] = "price = ?";
    $params[] = $price;
    $types .= "d";
}
if ($state !== null) {
    $updateFields[] = "state = ?";
    $params[] = $state;
    $types .= "s";
}
if ($delivery_address !== null) {
    $updateFields[] = "delivery_address = ?";
    $params[] = $delivery_address;
    $types .= "s";
}
$imageIndex = null;
if ($item_image !== null && strpos($item_image, "base64") === false) { // already base64 string
    $decodedImage = base64_decode($item_image);
    if ($decodedImage !== false) {
        $updateFields[] = "item_image = ?";
        $params[] = $decodedImage;
        $types .= "b";
        $imageIndex = count($params) - 1;
    }
}

if (empty($updateFields)) {
    echo json_encode(["success" => false, "message" => "No fields to update."]);
    exit;
}

// Append cart_id
$sql = "UPDATE manage_order SET " . implode(", ", $updateFields) . " WHERE cart_id = ?";
$params[] = $cart_id;
$types .= "i";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
    exit;
}

// Dynamic bind
$bindNames[] = &$types;
foreach ($params as $key => $value) {
    $bindNames[] = &$params[$key];
}
call_user_func_array([$stmt, 'bind_param'], $bindNames);

// Send blob data
if ($imageIndex !== null) {
    $stmt->send_long_data($imageIndex, $params[$imageIndex]);
}

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Order updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
