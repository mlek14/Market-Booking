<?php

class ConnectDB extends mysqli
{
    public $mysqli;

    public function __construct()
    {
        $this->mysqli = new mysqli("localhost", "root", "", "cpt4yn5718");
        if ($this->mysqli->connect_error) {
            return "Connection failed: " . $this->mysqli->connect_error;
        }
        $this->mysqli->set_charset("utf8");
        date_default_timezone_set('asia/bangkok');
    }
}