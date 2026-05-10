<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
/*
React (with cookies)
   ↓
PHP (says: allow specifically localhost:5173 + cookies)
   Browser allows it
*/


header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "your-root-password", "act05_user_system");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}
?>