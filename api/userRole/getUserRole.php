<?php

require_once('../connectDB.php');

$db = new ConnectDB();

$query = $db->query("select * from user_roles");
while ($fetch = $query->fetch_assoc()) 
{
    $userRoles[] = $fetch;
}
$db->close();

if ($query->num_rows > 0)
{
    echo json_encode($userRoles);
}