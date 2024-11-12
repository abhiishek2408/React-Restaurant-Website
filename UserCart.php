<?php
// Enable CORS
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin (for development purposes)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header

// If the request is OPTIONS, just return a 200 response (preflight request)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Continue with your existing database connection and logic
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "restaurant_management";
$port = 3307;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch user_id from the POST request
$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id']; // Assuming user_id is sent from frontend


// SQL query to fetch cart details, including the item_image (stored as LONGBLOB)
$sql = "SELECT cart_id, menu_section_id, user_id, quantity, price, item_name, state, added_at, updated_at, item_image 
        FROM cart 
        WHERE user_id = ?"; // Prepared statement to prevent SQL injection

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $user_id);  // "s" denotes the parameter is a string (user_id)
$stmt->execute();
$result = $stmt->get_result();

// Check if any cart data is found
if ($result->num_rows > 0) {
    // Prepare the data to send back to the frontend
    $cartData = [];
    while ($row = $result->fetch_assoc()) {
        // If the item_image exists, convert it to Base64
        if ($row['item_image']) {
            // Encode the binary image data to Base64
            $row['item_image'] = 'data:image/jpeg;base64,' . base64_encode($row['item_image']);
        }
        $cartData[] = $row; // Collect each row of data
    }
    echo json_encode(["status" => "success", "data" => $cartData]);
} else {
    echo json_encode(["status" => "error", "message" => "No cart data found."]);
}

$stmt->close();
$conn->close();
?>
