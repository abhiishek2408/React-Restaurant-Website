<?php
require_once "db.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Updated query: includes start_timing and end_timing
$sql = "SELECT id, food_type, food_category, name, description, price, vegan, rating, start_timing, end_timing, product_image, offers, quantity, created_at 
        FROM restaurant_offers 
        ORDER BY id ASC";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Query failed: " . $conn->error]);
    exit;
}

$offers = [];

while ($row = $result->fetch_assoc()) {
    // Optionally base64 encode image
    if (isset($row['product_image'])) {
        $row['product_image'] = base64_encode($row['product_image']);
    }

    $offers[] = $row;
}

echo json_encode(["status" => "success", "offers" => $offers]);
?>
