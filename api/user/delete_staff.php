<?php
require_once '../connectDB.php';

$db = new ConnectDB();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $staffId = $_GET["staffId"];
    $staffRoleId = $db->query("select staff_roleId from staffs where Id = $staffId")->fetch_assoc()["staff_roleId"];
    if ($staffRoleId != 1) {
        $query = $db->query("update staffs set staff_status = 'rmv' where Id = $staffId");
        if ($query) {
            echo json_encode(true);
        }
    }
}
