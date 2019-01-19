<?php

class ConnectDB extends mysqli
{
    private $host = "localhost";
    private $user = "root";
    private $pass = "";
    private $database = "market_booking";

    public function __construct()
    {
        parent::__construct($this->host, $this->user, $this->pass, $this->database);
        parent::set_charset("utf8");
        date_default_timezone_set('asia/bangkok');
    }
}
