<?php

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    require_once '../connectDB.php';

    $db = new ConnectDB();

    $userId = $_GET["userId"];
    $query = $db->query("update user set status = 'con' where ID = $userId");
    if ($query) {
        echo json_encode(true);
    }
}
