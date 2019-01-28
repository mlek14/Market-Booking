<?php
require_once("connectDB.php");

$db = new ConnectDB();

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "select 
                u.Id, u.user_firstname, u.user_lastname, u.user_email, u.user_username, 
                r.role_name 
            from users as u
            join user_roles as r on r.Id = u.user_roleId
            where (u.user_email = '$email' or u.user_username = '$email') and u.user_password = '$password'
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