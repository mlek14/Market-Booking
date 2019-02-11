<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    require_once '../connectDB.php';

    $db = new ConnectDB();

    $query = $db->query("select * from user_type");
    if ($query->num_rows > 0) {
        while ($fetch = $query->fetch_assoc()) {
            $userRoles[] = [
                "ID" => $fetch["ID"],
                "name" => $fetch["name"],
            ];
        }
        echo json_encode($userRoles);
    }
}
