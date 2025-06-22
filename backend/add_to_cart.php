<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);  // Preflight request handling
}

// Check if POST data is received
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data (JSON)
    $data = json_decode(file_get_contents('php://input'), true);  // Decode the JSON data into an array

    // Debugging: Log the received data
    file_put_contents("php://stderr", print_r($data, true)); 

    // Make sure required POST data exists
    if (isset($data['user_id'], $data['item_id'], $data['item_image'], $data['item_name'], $data['item_price'], $data['quantity'], $data['description'])) {
        // Your existing logic here to insert into database
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "restaurant_management";
        $port = 3306;

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname, $port);

        // Check connection
        if ($conn->connect_error) {
            die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
        }

        // Capture POST data
        $userId = $data['user_id'];
        $itemId = $data['item_id'];
        $itemImage = $data['item_image'];
        $itemName = $data['item_name'];
        $itemPrice = $data['item_price'];
        $quantity = $data['quantity'];
        $description = $data['description'];
        $state = 'active';


        $itemImage = preg_replace('#^data:image/\w+;base64,#i', '', $itemImage); // Remove the prefix
        $itemImage = base64_decode($itemImage); // Decode the base64 string

        // Handle the cart addition (assuming you have the necessary database logic here)
        $stmt = $conn->prepare("INSERT INTO cart (user_id, menu_section_id, quantity, price, state, added_at, updated_at, item_name, description, item_image) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?)");
        $stmt->bind_param("iiidssss", $userId, $itemId, $quantity, $itemPrice, $state, $itemName, $description, $itemImage);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Item added to cart']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add item']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing required data']);
    }
}
?>
