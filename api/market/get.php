<?php

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    require_once '../connectDB.php';

    $db = new ConnectDB();

    $page = $_GET["page"];
    $limit = $_GET["limit"];
    $startRecord = ($page - 1) * $limit;

    $sql = "select
            m.*, concat(u.firstname, ' ', u.lastname) as owner
        from market as m
        join user as u on u.ID = m.userId
        where m.status != 'rmv'
        limit $startRecord, $limit ";
    $query = $db->query($sql);

    // get num rows
    $num_rows = $db->query("select count(*) as num_rows from market where status != 'rmv'")->fetch_assoc()["num_rows"];

    if ($query->num_rows > 0) {
        while ($fetch = $query->fetch_assoc()) {
            $market[] = $fetch;
        }
        $response = [
            'data' => $market,
            'num_rows' => $num_rows,
            'page' => $page,
            'limit' => $limit,
        ];
        echo json_encode($response);
    } else {
        echo json_encode(null);
    }
}
