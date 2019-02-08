<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once "connectDB.php";

    $db = new ConnectDB();

    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "select * from user where (email = '$email' || username = '$email') && password = '$password' && status = 'con'";
    $query = $db->query($sql);
    $num_row = $query->num_rows;

    if ($query && $num_row > 0) {
        $fetch = $query->fetch_assoc();
        echo json_encode([
            "success" => true,
            "data" => [
                "ID" => $fetch["ID"],
                "email" => $fetch["email"],
                "username" => $fetch["username"],
                "user_typeId" => $fetch["user_typeId"],
            ],
        ]);
    } else {
        echo json_encode(["success" => false]);
    }
    $db->close();
}
