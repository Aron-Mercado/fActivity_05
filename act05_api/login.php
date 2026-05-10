<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");



include "database.php";

// PHP receives data and request from React 
$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

// PHP Checks Database
$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // PHP decides results
    if (password_verify($password, $user['password'])) {

        // CREATE SESSION
        $_SESSION['user_id'] = $user['id'];

        // PHP SENDS RESPONSES
        echo json_encode(["message" => "Login successful"]);

    } else {
        // PHP SENDS RESPONSES
        echo json_encode(["error" => "Wrong password"]);
    }
} else {
    // PHP SENDS RESPONSES
    echo json_encode(["error" => "User not found"]);
}
