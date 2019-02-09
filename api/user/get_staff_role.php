<?php
require_once '../connectDB.php';

$db = new ConnectDB();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "select * from staff_roles";
    $query = $db->query($sql);

    if ($query->num_rows > 0) {
        while ($fetch = $query->fetch_assoc()) {
            $response[] = $fetch;
        }
        echo json_encode($response);
    } else {
        echo json_encode(null);
    }
}
