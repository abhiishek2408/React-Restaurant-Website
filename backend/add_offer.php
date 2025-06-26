<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'db.php';

// Get raw JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Extract values with defaults
$food_type      = $data["food_type"] ?? "";
$food_category  = $data["food_category"] ?? "";
$name           = $data["name"] ?? "";
$description    = $data["description"] ?? "";
$price          = isset($data["price"]) ? floatval($data["price"]) : 0.00;
$vegan          = isset($data["vegan"]) ? intval($data["vegan"]) : 0;
$rating         = isset($data["rating"]) ? floatval($data["rating"]) : 0.0;
$start_timing   = $data["start_timing"] ?? "";
$end_timing     = $data["end_timing"] ?? "";
$product_image  = $data["product_image"] ?? "";
$offers         = $data["offers"] ?? "";
$quantity       = isset($data["quantity"]) ? intval($data["quantity"]) : 0;

// Validate required fields
if (empty($name) || $price <= 0 || empty($product_image)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Missing or invalid required fields: name, price, or product_image"
    ]);
    exit;
}

// Decode base64 image
$base64_image = preg_replace('#^data:image/\w+;base64,#i', '', $product_image);
$binary_image = base64_decode($base64_image);

// Validate image decoding
if ($binary_image === false) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Image decoding failed"]);
    exit;
}

// Prepare SQL insert query
$sql = "INSERT INTO restaurant_offers 
        (food_type, food_category, name, description, price, vegan, rating, start_timing, end_timing, product_image, offers, quantity, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database prepare failed",
        "error" => $conn->error
    ]);
    exit;
}

// Bind parameters
$stmt->bind_param(
    "ssssdidssssi",
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
    $quantity
);

// Bind LONGBLOB separately
$stmt->send_long_data(9, $binary_image);

// Execute the query
if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Offer added successfully"]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to insert offer",
        "error" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
