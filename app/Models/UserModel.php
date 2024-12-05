<?php

namespace App\Models;

use PDO;
use App\Databases\Mysql;

class UserModel
{
    private $mysql;
    private $connection;
    private $tableName = 'users';

    public function __construct()
    {
        $this->mysql = new Mysql();
        $this->connection = $this->mysql->connect();
    }

    public function selectAll()
    {
        try {
            $stmt = $this->connection->prepare("SELECT * FROM $this->tableName ORDER BY id DESC");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function selectBy($username)
    {
        try {
            $stmt = $this->connection->prepare("SELECT * FROM $this->tableName WHERE username = :username");
            $stmt->bindParam(":username", $username, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function selectById($id)
    {
        try {
            $stmt = $this->connection->prepare("SELECT username, status, level FROM $this->tableName WHERE id = :id");
            $stmt->bindParam(":id", $id, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function createOne($params)
    {
        try {
            $hashedPassword = password_hash($params->password, PASSWORD_BCRYPT);

            $stmt = $this->connection->prepare("INSERT INTO $this->tableName (username, password, email, phone, document, gov_name, gov_leader, gov_position, gov_contact, gov_phone, gov_address) VALUES (:username, :password, :email, :phone, :document, :gov_name, :gov_leader, :gov_position, :gov_contact, :gov_phone, :gov_address)");
            $stmt->bindParam(":username", $params->username, PDO::PARAM_STR);
            $stmt->bindParam(":password", $hashedPassword, PDO::PARAM_STR);
            $stmt->bindParam(":email", $params->email, PDO::PARAM_STR);
            $stmt->bindParam(":phone", $params->phone, PDO::PARAM_STR);
            $stmt->bindParam(":document", $params->document, PDO::PARAM_STR);
            $stmt->bindParam(":gov_name", $params->gov_name, PDO::PARAM_STR);
            $stmt->bindParam(":gov_leader", $params->gov_leader, PDO::PARAM_STR);
            $stmt->bindParam(":gov_position", $params->gov_position, PDO::PARAM_STR);
            $stmt->bindParam(":gov_contact", $params->gov_contact, PDO::PARAM_STR);
            $stmt->bindParam(":gov_phone", $params->gov_phone, PDO::PARAM_STR);
            $stmt->bindParam(":gov_address", $params->gov_address, PDO::PARAM_STR);
            $stmt->execute();
            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function updateBy($params)
    {
        try {
            $params = (object) $params;
            $username = $_SESSION['userName'];
            $stmt = $this->connection->prepare("UPDATE $this->tableName SET gov_name = :gov_name, gov_leader = :gov_leader, gov_position = :gov_position, gov_contact = :gov_contact, gov_phone = :gov_phone, gov_address = :gov_address WHERE username = :username");
            $stmt->bindParam(":username", $username, PDO::PARAM_STR);
            $stmt->bindParam(":gov_name", $params->gov_name, PDO::PARAM_STR);
            $stmt->bindParam(":gov_leader", $params->gov_leader, PDO::PARAM_STR);
            $stmt->bindParam(":gov_position", $params->gov_position, PDO::PARAM_STR);
            $stmt->bindParam(":gov_contact", $params->gov_contact, PDO::PARAM_STR);
            $stmt->bindParam(":gov_phone", $params->gov_phone, PDO::PARAM_STR);
            $stmt->bindParam(":gov_address", $params->gov_address, PDO::PARAM_STR);
            $stmt->execute();
            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function statusLevelBy($params)
    {
        try {
            $params = (object) $params;
            $stmt = $this->connection->prepare("UPDATE $this->tableName SET status = :status, level = :level WHERE username = :username");
            $stmt->bindParam(":username", $params->username, PDO::PARAM_STR);
            $stmt->bindParam(":status", $params->status, PDO::PARAM_INT);
            $stmt->bindParam(":level", $params->level, PDO::PARAM_INT);
            $stmt->execute();
            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function deleteBy(int $id)
    {
        try {
            $stmt = $this->connection->prepare("DELETE FROM $this->tableName WHERE id = :id");
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }
}
