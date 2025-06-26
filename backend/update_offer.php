<?php
require 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$id             = $data["id"] ?? null;
$name           = $data["name"] ?? "";
$description    = $data["description"] ?? "";
$price          = isset($data["price"]) ? floatval($data["price"]) : 0;
$vegan          = isset($data["vegan"]) ? intval($data["vegan"]) : 0;
$rating         = isset($data["rating"]) ? floatval($data["rating"]) : 0.0;
$start_timing   = $data["start_timing"] ?? "";
$end_timing     = $data["end_timing"] ?? "";
$product_image  = $data["product_image"] ?? "";
$offers         = $data["offers"] ?? "";
$quantity       = isset($data["quantity"]) ? intval($data["quantity"]) : 1;
$food_category  = $data["food_category"] ?? "";
$food_type      = $data["food_type"] ?? "";

if (!$id || !$name || $price <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing or invalid required fields"]);
    exit;
}

// Decode base64 image if provided
$binary_image = null;
if (!empty($product_image)) {
    $base64_image = preg_replace('#^data:image/\w+;base64,#i', '', $product_image);
    $binary_image = base64_decode($base64_image);

    if ($binary_image === false) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Image decoding failed"]);
        exit;
    }
}

// Update SQL
$sql = "UPDATE restaurant_offers SET
            food_type = ?, food_category = ?, name = ?, description = ?, price = ?, vegan = ?, rating = ?, start_timing = ?, end_timing = ?, product_image = ?, offers = ?, quantity = ?
        WHERE id = ?";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Prepare failed", "error" => $conn->error]);
    exit;
}

$stmt->bind_param(
    "ssssdidsssiii",
    $food_type,
    $food_category,
    $name,
    $description,
    $price,
    $vegan,
    $rating,
    $start_timing,
    $end_timing,
    $binary_image,
    $offers,
    $quantity,
    $id
);

// Send image blob data
$stmt->send_long_data(9, $binary_image);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Offer updated successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Update failed", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
