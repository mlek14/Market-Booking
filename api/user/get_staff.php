<?php
require_once '../connectDB.php';

$db = new ConnectDB();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $page = $_GET["page"];
    $limit = $_GET["limit"];
    $startRecord = ($page - 1) * $limit;
    $sql = "select
            s.*, r.role_name
        from staffs as s
        join staff_roles as r on r.Id = s.staff_roleId
        where s.staff_status != 'rmv'
        limit $startRecord, $limit ";
    $query = $db->query($sql);

    // get num rows
    $num_rows = $db->query("select count(*) as num_rows from staffs where staff_status != 'rmv'")->fetch_assoc()["num_rows"];

    if ($query->num_rows > 0) {
        while ($fetch = $query->fetch_assoc()) {
            $staff_info[] = $fetch;
        }
        $response = [
            'data' => $staff_info,
            'num_rows' => $num_rows,
            'page' => $page,
            'limit' => $limit,
        ];
        echo json_encode($response);
    } else {
        echo json_encode(null);
    }
}
