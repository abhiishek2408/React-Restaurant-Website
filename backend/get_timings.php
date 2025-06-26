<?php
require_once "db.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$sql = "SELECT day, open_time, close_time, is_closed, break_start, break_end, notes FROM timings ORDER BY FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')";
$result = $conn->query($sql);

$timings = [];

while ($row = $result->fetch_assoc()) {
    $timings[] = $row;
}

echo json_encode(["timings" => $timings]);
