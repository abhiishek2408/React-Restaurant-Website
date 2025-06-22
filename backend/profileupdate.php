<?php
session_start();
header("Content-Type: application/json");

if (isset($_SESSION['user'])) {
    // Return the user data from the session
    echo json_encode($_SESSION['user']);
} else {
    echo json_encode(["error" => "User not logged in"]);
}
?>
