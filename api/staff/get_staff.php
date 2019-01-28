<?php
require_once('../connectDB.php');

$db = new ConnectDB();

$sql = "select * from staffs where staff_status != 'rmv'";
$query = $db->query($sql);

while ($fetch = $query->fetch_assoc()) {
    $response[] = $fetch;
}

echo json_encode($response);

$db->close();