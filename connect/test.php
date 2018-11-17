<?php
require 'connect_db.php';
require 'user.php';
require 'market.php';

$user = new User(new ConnectDB);
$market = new Market(new ConnectDB);

$udata = [
    'roleId' => 2,
    'firstname' => 'Store5',
    'lastname' => 'Owner',
    'email' => 'store5@mail.com',
    'username' => 'store5',
    'password' => '1234',
    'status' => 'con',
];

$mData = [
    "name" => "Market2",
    "description" => "Test create market.",
    "address" => "1 M.1 Nai Mueang Mueang",
    "provinceId" => 50,
    "userId" => 7,
];

$add = $market->deleteMarket(1);
echo json_encode($add);

// $aaa = new ConnectDB();
// $bbb = $aaa->mysqli->query("select * from provinces");
// while ($r = $bbb->fetch_assoc()) {
//     $c = trim($r['province_name']);
//     $aaa->mysqli->query("update provinces set province_name = '$c' where Id = '$r[Id]'");
// }
