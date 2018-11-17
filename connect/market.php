<?php

class Market
{
    private $connect;
    private $name;
    private $description;
    private $status;
    private $address;
    private $provinceId;
    private $userId;

    public function __construct(ConnectDB $db)
    {
        $this->connect = $db->mysqli;
    }

    public function getData($val)
    {
        $this->name = $val['name'] ?? null;
        $this->description = $val['description'] ?? null;
        $this->status = $val['status'] ?? 'new';
        $this->address = $val['address'] ?? null;
        $this->provinceId = $val['provinceId'] ?? null;
        $this->userId = $val['userId'] ?? null;
    }

    public function addMarket($val)
    {
        $this->getData($val);
        $result = $this->connect->query("insert into market (market_name, market_desc, market_status, market_address, provinceId, userId) values ('$this->name', '$this->description', '$this->status', '$this->address', '$this->provinceId', '$this->userId')");
        return $result == true ? true : false;
    }

    public function editMarket($marketId, $val)
    {
        $this->getData($val);
        $result = $this->connect->query("update market set market_name = '$this->name', market_desc = '$this->description', market_address = '$this->address', provinceId = '$this->provinceId' where Id = '$marketId'");
        return $result == true ? true : false;
    }

    public function getMarkets()
    {
        $result = $this->connect->query("
            select m.*, concat(u.user_firstname, ' ', u.user_lastname) as user_fullname, p.province_name
            from market as m
            join users as u on u.Id = m.userId
            join provinces as p on p.Id = m.provinceId
            where m.market_status != 'rmv'
        ");
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        return $response;
    }

    public function getMarket($marketId)
    {
        $result = $this->connect->query("
            select m.*, concat(u.user_firstname, ' ', u.user_lastname) as user_fullname, p.province_name
            from market as m
            join users as u on m.userId = u.Id
            join provinces as p on m.provinceId = p.Id
            where m.Id = '$marketId'
        ");
        return $result->fetch_assoc();
    }

    public function deleteMarket($marketId)
    {
        $result = $this->connect->query("update market set market_status = 'rmv' where Id = $marketId");
        return $result == true ? true : false;
    }

    public function __destruct()
    {
        $this->connect->close();
    }
}
