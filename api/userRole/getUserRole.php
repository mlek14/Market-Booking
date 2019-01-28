<?php
require_once('../connectDB.php');

$db = new ConnectDB();

if ($_SERVER["REQUEST_METHOD"] == "GET")
{
    $query = $db->query("select * from user_roles");
    while ($fetch = $query->fetch_assoc()) 
    {
        $userRoles[] = $fetch;
    }

    if ($query->num_rows > 0)
    {
        echo json_encode($userRoles);
    }
}

$db->close();