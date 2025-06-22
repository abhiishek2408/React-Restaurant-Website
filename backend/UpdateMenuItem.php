<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include('db.php');

// Read and decode JSON input
$input = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (
    !isset($input['Id']) || !isset($input['name']) ||
    !isset($input['price']) || !isset($input['Offers']) ||
    !isset($input['quantity']) || !isset($input['rating'])
) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields."
    ]);
    exit;
}

// Sanitize and assign variables
$id = intval($input['Id']);
$name = $conn->real_escape_string($input['name']);
$price = floatval($input['price']);
$offers = $conn->real_escape_string($input['Offers']);
$quantity = intval($input['quantity']);
$rating = floatval($input['rating']);

// Update query
$sql = "UPDATE menu_sections SET 
            name = '$name', 
            price = $price, 
            Offers = '$offers', 
            quantity = $quantity, 
            rating = $rating 
        WHERE Id = $id";

if ($conn->query($sql) === TRUE) {
    echo json_encode([
        "success" => true,
        "message" => "Menu item updated successfully."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error updating item: " . $conn->error
    ]);
}

$conn->close();
