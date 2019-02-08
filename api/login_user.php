<?php
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    require_once("connectDB.php");

    $db = new ConnectDB();

    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "select * from users where (user_email = '$email' || user_username = '$email') && user_password = '$password' && user_status = 'con'";
    $query = $db->query($sql);
    $num_row = $query->num_rows;
    
    if (!$query || $num_row == 0)
    {
        echo json_encode(["success" => false]);
        $db->close();
        exit();
    }
    $fetch = $query->fetch_assoc();
    $response = [
        "success" => true,
        "data" => [
            "Id" => $fetch["Id"],
            "email" => $fetch["user_email"],
            "username" => $fetch["user_username"],
            "roleId" => $fetch["user_roleId"]
        ]
    ];
    echo json_encode($response);
    $db->close();
}