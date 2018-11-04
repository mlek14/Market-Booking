<?php

$conn = new mysqli("localhost", "root", "", "cpt4yn5718");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8");
date_default_timezone_set('asia/bangkok');
