<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// ✅ HANDLE PREFLIGHT REQUEST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Not logged in"]);
    exit();
}

include "database.php";

$data = json_decode(file_get_contents("php://input"));


// Check if data exists
if (!$data) {
    echo json_encode(["error" => "No data received"]);
    exit();
}

// Safe values
$id = $data->id ?? null;
$name = $data->name ?? "";
$email = $data->email ?? "";

// Check required field
if (!$id) {
    echo json_encode(["error" => "Missing user ID"]);
    exit();
}


$sql = "UPDATE users SET name='$name', email='$email' WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["message" => "User updated"]);
} else {
    echo json_encode(["error" => "Update failed"]);
}
?>