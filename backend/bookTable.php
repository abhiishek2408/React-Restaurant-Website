



<?php
// Allow all origins, or specify your React app's origin to limit access
header("Access-Control-Allow-Origin: http://localhost:3000");  // Allow requests from your React app
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  // Allow methods for CORS
header("Access-Control-Allow-Headers: Content-Type");  // Allow specific headers, like Content-Type for JSON

// If it's a pre-flight OPTIONS request, return an HTTP 200 response with the appropriate headers
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


session_start();
header('Content-Type: application/json'); // Ensure response is in JSON format

include('db.php');

$first_name = $last_name = $email = $phone = $event_type = $event_date = $message = '';
$error_message = '';
$success_message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true); // Get JSON data from the request body

    // Retrieve data from JSON payload
    $user_id = $data['user_id'] ?? null;
    $first_name = $data['first_name'] ?? '';
    $last_name = $data['last_name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $event_type = $data['event_type'] ?? '';
    $event_date = $data['event_date'] ?? '';
    $message = $data['message'] ?? '';
    $state = 'active';

    if (!$user_id) {
        $error_message = "User ID is missing.";
        echo json_encode(["status" => "error", "message" => $error_message]);
        exit();
    }

    // Prepare and execute the insert query
    $stmt = $conn->prepare("INSERT INTO occasion (user_id, first_name, last_name, email, phone, event_type, event_date, message, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if ($stmt === false) {
        die('Prepare failed: ' . htmlspecialchars($conn->error));
    }

    // Bind parameters and execute the statement
    $stmt->bind_param("issssssss", $user_id, $first_name, $last_name, $email, $phone, $event_type, $event_date, $message, $state);

    if ($stmt->execute()) {
        $success_message = "New occasion recorded successfully.";
        echo json_encode(["status" => "success", "message" => $success_message]);
    } else {
        $error_message = "Error: " . $stmt->error;
        echo json_encode(["status" => "error", "message" => $error_message]);
    }

    $stmt->close();
    $conn->close();
}
?>
