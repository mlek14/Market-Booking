<?php
require_once("connectDB.php");

$db = new ConnectDB();

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "select 
                *
            from staffs
            where (staff_email = '$email' or staff_username = '$email') and staff_password = '$password'
    ";
    $query = $db->query($sql);

    $response = [];
    
    if ($query->num_rows > 0)
    {
        $fetch = $query->fetch_assoc();
        $response = [
            "success" => true,
            "data" => $fetch
        ];
    }
    else
    {
        $response = [
            "success" => false,
            "message" => "Failed login."
        ];
    }
    echo json_encode($response);
}

$db->close();