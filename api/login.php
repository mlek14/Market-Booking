<?php

$email = $_POST["email"];
$password = $_POST["password"];
$token = "asdasds";

$response = [
    "email" => $email,
    "token" => $token
];

echo json_encode($response);