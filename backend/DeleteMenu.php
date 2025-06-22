<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('db.php');

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents("php://input"), $data);
    $id = $data['id'] ?? null;

    if ($id) {
        $query = "DELETE FROM menu_sections WHERE Id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Item deleted successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to delete item."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid ID."]);
    }

    $conn->close();
    exit();
}
?>
