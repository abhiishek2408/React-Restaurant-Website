<?php

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization"); 


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');


session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "restaurant_management";
$port = 3306;


$conn = new mysqli($servername, $username, $password, $dbname, $port);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT * FROM menu_sections WHERE FoodType = 'Rice and Grain-Based Dishes' ORDER BY name";
$result = $conn->query($sql);


$menuItems = [];


while ($row = $result->fetch_assoc()) {
    $row['product_image'] = base64_encode($row['product_image']); 
    $menuItems[] = $row;
}

echo json_encode($menuItems);


$conn->close();
?>
