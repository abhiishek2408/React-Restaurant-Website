<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include('db.php'); // Database connection

// Validate if a search query is provided
if (!isset($_GET['query']) || empty($_GET['query'])) {
    echo json_encode(["success" => false, "message" => "No search query provided"]);
    exit();
}

$searchQuery = $conn->real_escape_string($_GET['query']); // Secure input

// Debugging: Log search query
error_log("Searching for: $searchQuery");

// Query to search for products in multiple columns
$query = "SELECT 
            Id, 
            FoodType, 
            food_category, 
            name, 
            description, 
            price, 
            vegan, 
            rating, 
            time, 
            product_image, 
            Offers, 
            quantity 
          FROM menu_sections 
          WHERE 
            Id LIKE '%$searchQuery%' OR
            FoodType LIKE '%$searchQuery%' OR
            food_category LIKE '%$searchQuery%' OR
            name LIKE '%$searchQuery%' OR
            description LIKE '%$searchQuery%' OR
            price LIKE '%$searchQuery%' OR
            vegan LIKE '%$searchQuery%' OR
            rating LIKE '%$searchQuery%' OR
            time LIKE '%$searchQuery%' OR
            Offers LIKE '%$searchQuery%' OR
            quantity LIKE '%$searchQuery%' 
          LIMIT 10"; // Limit results for efficiency

$result = $conn->query($query);

// If products are found
if ($result->num_rows > 0) {
    $products = [];

    while ($row = $result->fetch_assoc()) {
        if ($row['product_image']) {
            $row['product_image'] = base64_encode($row['product_image']);
        }
        $products[] = $row;
    }

    echo json_encode(["success" => true, "data" => $products]);
} else {
    echo json_encode(["success" => false, "message" => "No matching products found"]);
}

$conn->close();
?>
