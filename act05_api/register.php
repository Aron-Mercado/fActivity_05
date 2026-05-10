<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


session_start();

include "database.php";

$data = json_decode(file_get_contents("php://input"));

if (!$data || !$data->name || !$data->email || !$data->password) {
    echo json_encode(["error" => "Missing input"]);
    exit();
}

$name = $data->name;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

if ($conn->query($sql)) {
    echo json_encode(["message" => "User registered"]);
} else {
    echo json_encode(["error" => "Registration failed"]);
}
?>