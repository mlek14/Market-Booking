<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once "connectDB.php";

    $db = new ConnectDB();

    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "select * from admin where (email = '$email' || username = '$email') && password = '$password'";
    $query = $db->query($sql);
    if (!$query) {
        echo json_encode([
            "success" => false,
        ]);
        exit();
    }
    if ($query->num_rows == 0) {
        echo json_encode([
            "success" => false,
        ]);
        exit();
    }
    $fetch = $query->fetch_assoc();
    echo json_encode([
        "success" => true,
        "data" => [
            "email" => $fetch["email"],
            "username" => $fetch["username"],
            "admin" => true
        ]]);
}
