<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once "../connectDB.php";

    $db = new ConnectDB();

    $name = $_POST["name"];
    $detail = $_POST["detail"];
    $phone_no = $_POST["phone_no"];
    $email = $_POST["email"];
    $line_id = $_POST["line_id"];
    $address = $_POST["address"];
    $userId = $_POST["userId"];

    $sql_insert = "insert into market (name, detail, phone_no, email, line_id, address, userId)
                    values ('$name', '$detail', '$phone_no', '$email', ''$line_id, '$address', '$userId')";
    $query = $db->query($sql_insert);

    if (!$query) {
        echo json_encode(["success" => false]);
        exit();
    }
    echo json_encode(["success" => true]);
}
