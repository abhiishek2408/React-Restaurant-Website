<?php

// Allow cross-origin requests from all origins (or specify your frontend's domain, e.g., http://localhost:3000)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json"); // Set response content type to JSON

// For preflight requests (OPTIONS request), simply exit
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

session_start();
include('db.php'); 

$response = [
    'success' => false,
    'message' => '',
    'errors' => [],
];

// Check if the database connection is established
if (!$conn) {
    $response['errors'][] = "Database connection failed: " . mysqli_connect_error();
    echo json_encode($response);
    exit;
}

// Check if form data is posted
if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Sanitize the username to prevent SQL injection
    $username = $conn->real_escape_string($username);
    
    // Log the received username for debugging
    error_log("Received Username: $username");

    // Fetch the user record based on the sanitized username
    $sql = "SELECT * FROM users WHERE username = '$username'";
    
    // Log the SQL query for debugging
    error_log("SQL Query: $sql");
    
    $result = $conn->query($sql);

    if ($result) {
        error_log("SQL query successful. Rows found: " . $result->num_rows);
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();

            // Verify the password using password_verify
            if (password_verify($password, $user['password'])) {
                // Set session variables for the user
                $_SESSION['user'] = $user;
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['bio'] = $user['bio'];
                $_SESSION['phone'] = $user['phone'];
                $_SESSION['address'] = $user['address'];
               

                // Indicate success and user role
                $response['success'] = true;
                $response['message'] = "Login successful!";
                $response['role'] = $user['role'];
                $response['user_id'] = $user['user_id'];
                $response['username'] = $user['username'];
                $response['bio'] = $user['bio'];
                $response['phone'] = $user['phone'];
                $response['email'] = $user['email'];
                // $response['created_at'] = $user['created_at'];
                $response['address'] = $user['address'];
                // $response['profile_img'] = $user['profile_img'];

                // Customize message based on role
                $response['message'] = $user['role'] === 'admin' ? "Welcome Admin!" : "Welcome Customer!";
            } else {
                $response['errors'][] = "Invalid password.";
            }
        } else {
            error_log("No user found with username: $username");
            $response['errors'][] = "No user found with that username.";
        }
    } else {
        error_log("SQL query error: " . $conn->error); // Log actual SQL error
        $response['errors'][] = "Database query failed: " . $conn->error;
    }
} else {
    $response['errors'][] = "Username and password are required.";
}

// Return the response as JSON and exit
echo json_encode($response);
$conn->close();
exit;
?>
