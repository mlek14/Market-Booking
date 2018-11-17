<?php

class User
{
    private $connect;
    private $roleId;
    private $firstname;
    private $lastname;
    private $email;
    private $username;
    private $password;
    private $status;

    public function __construct(ConnectDB $db)
    {
        $this->connect = $db->mysqli;
    }

    public function getData($val)
    {
        $this->roleId = $val['roleId'] ?? null;
        $this->firstname = $val['firstname'] ?? null;
        $this->lastname = $val['lastname'] ?? null;
        $this->email = $val['email'] ?? null;
        $this->username = $val['username'] ?? null;
        $this->password = $val['password'] ?? null;
        $this->status = $val['status'] ?? 'new';
    }

    public function addUser($val)
    {
        $this->getData($val);
        $result = $this->connect->query("insert into users (user_roleId, user_firstname, user_lastname, user_email, user_username, user_password, user_status) values ('$this->roleId','$this->firstname','$this->lastname','$this->email','$this->username','$this->password','$this->status')");
        return $result == true ? true : false;
    }

    public function getUsers()
    {
        $result = $this->connect->query("
            select u.*, r.role_name
            from users as u
            join user_roles as r on r.Id = u.user_roleId
            where u.user_status != 'rmv'
        ");
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        return $response;
    }

    public function getUser($userId)
    {
        $result = $this->connect->query("
            select u.*, r.role_name
            from users as u
            join user_roles as r on r.Id = u.user_roleId
            where u.Id = $userId
        ");
        return $result->fetch_assoc();
    }

    public function editUser($userId, $val)
    {
        $this->getData($val);
        $result = $this->connect->query("update users set user_firstname = $this->firstname, user_lastname = $this->lastname, user_email = $this->email, user_username = $this->username where Id = $userId");
        return $result == true ? true : false;
    }

    public function deleteUser($userId)
    {
        $result = $this->connect->query("update users set user_status = 'rmv' where Id = $userId");
        return $result == true ? true : false;
    }

    public function __destruct()
    {
        $this->connect->close();
    }
}
