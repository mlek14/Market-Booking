<?php

class ConnectDB extends mysqli
{
    private $host = "localhost";
    // private $user = "cpt4yn5718";
    // private $pass = "cpt718";
    private $user = "root";
    private $pass = "";
    private $database = "cpt4yn5718";

    public function __construct()
    {
        parent::__construct($this->host, $this->user, $this->pass, $this->database);
        parent::set_charset("utf8");
        date_default_timezone_set('asia/bangkok');
    }
}
