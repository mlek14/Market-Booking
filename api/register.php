<?php
require_once("connectDB.php");

$db = new ConnectDB();

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $phone_no = $_POST["phone_no"];
    $username = $_POST["username"];
    $password = $_POST["password"];
    $role = $_POST["role"];

    $sql = "insert into users (user_roleId, user_firstname, user_lastname, user_email, user_phone_no, user_username, user_password) values ($role, '$firstname', '$lastname', '$email', '$phone_no', '$username', '$password')";
    $query = $db->query($sql);

    if ($query)
    {
        $response = [
            "success" => true
        ];
    }
    else
    {
        $response = [
            "success" => false,
            "message" => "Registration Failed!"
        ];
    }
    echo json_encode($response);
}

$db->close();