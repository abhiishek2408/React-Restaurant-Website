<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include('db.php');

// Set limit to 10 per page
$limit = 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

if ($page < 1) {
    echo json_encode(["success" => false, "message" => "Invalid page number"]);
    exit();
}

// Get total number of rows
$totalQuery = "SELECT COUNT(*) as total FROM menu_sections";
$totalResult = $conn->query($totalQuery);
if (!$totalResult) {
    echo json_encode(["success" => false, "message" => "Error fetching total count"]);
    exit();
}
$totalRow = $totalResult->fetch_assoc();
$totalRecords = $totalRow['total'];
$totalPages = ceil($totalRecords / $limit);

// Fetch 10 items
$query = "SELECT Id, FoodType, food_category, name, description, price, vegan, rating, time, product_image, Offers, quantity 
          FROM menu_sections 
          LIMIT $limit OFFSET $offset";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $menu_sections = [];

    while ($row = $result->fetch_assoc()) {
        if ($row['product_image']) {
            $row['product_image'] = base64_encode($row['product_image']);
        }
        $menu_sections[] = $row;
    }

    echo json_encode([
        "success" => true,
        "data" => $menu_sections,
        "totalPages" => $totalPages
    ]);
} else {
    echo json_encode(["success" => false, "message" => "No menu sections found."]);
}

$conn->close();
?>
