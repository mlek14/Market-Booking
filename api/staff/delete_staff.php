<?php
require_once('../connectDB.php');

$db = new ConnectDB();

if ($_SERVER["REQUEST_METHOD"] == "GET")
{
    $staffId = $_GET["staffId"];
    $query = $db->query("update staffs set staff_status = 'rmv' where Id = $staffId");
    if ($query)
    {
        echo json_encode(true);
    }

    $db->close();
}