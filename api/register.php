<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once "connectDB.php";

    $db = new ConnectDB();

    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $phone_no = $_POST["phone_no"];
    $username = $_POST["username"];
    $password = $_POST["password"];
    $type = $_POST["type"];

    $sql = "insert into user (user_typeId, firstname, lastname, email, phone_no, username, password) values ($type, '$firstname', '$lastname', '$email', '$phone_no', '$username', '$password')";
    $query = $db->query($sql);

    if ($query) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }

    $db->close();
}
