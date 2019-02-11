<?php

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    require_once '../connectDB.php';

    $db = new ConnectDB();

    $marketId = $_GET["marketId"];
    $query = $db->query("update market set status = 'con' where ID = $marketId");
    if ($query) {
        echo json_encode(true);
    }
}
