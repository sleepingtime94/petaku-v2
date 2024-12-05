<?php

namespace App\Models;

use PDO;
use App\Databases\Mysql;

class ProductModel
{
    private $mysql;
    private $connection;

    public function __construct()
    {
        $this->mysql = new Mysql();
        $this->connection = $this->mysql->connect();
    }

    public function selectAll()
    {
        try {
            $stmt = $this->connection->prepare("SELECT * FROM permohonan ORDER BY id DESC");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function selectAllByUser($userid)
    {
        try {
            $stmt = $this->connection->prepare("SELECT * FROM permohonan WHERE user_id = :user_id ORDER BY id DESC");
            $stmt->bindParam(":user_id", $userid, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function selectBy($id)
    {
        try {
            $stmt = $this->connection->prepare("SELECT * FROM permohonan WHERE id = :id");
            $stmt->bindParam(":id", $id, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function updateById($id, $params)
    {
        try {
            $setClause = [];
            foreach ($params as $key => $value) {
                $setClause[] = "$key = :$key";
            }

            $sql = "UPDATE permohonan SET " . implode(", ", $setClause) . " WHERE id = :id";

            $stmt = $this->connection->prepare($sql);

            foreach ($params as $key => $value) {
                $stmt->bindValue(":$key", $value, PDO::PARAM_STR);
            }
            $stmt->bindValue(":id", $id, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function selectByDetail(int $id)
    {
        try {
            $stmt = $this->connection->prepare("SELECT permohonan.*, users.gov_name FROM permohonan JOIN users ON permohonan.user_id = users.id WHERE permohonan.id = :id");
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function createOne($params)
    {
        try {
            $stmt = $this->connection->prepare("INSERT INTO permohonan (user_id, category, file, purpose, about) VALUES (:user_id, :category, :file, :purpose, :about)");
            $stmt->bindParam(":user_id", $params->user_id, PDO::PARAM_STR);
            $stmt->bindParam(":category", $params->category, PDO::PARAM_STR);
            $stmt->bindParam(":file", $params->file, PDO::PARAM_STR);
            $stmt->bindParam(":purpose", $params->purpose, PDO::PARAM_STR);
            $stmt->bindParam(":about", $params->about, PDO::PARAM_STR);
            $stmt->execute();
            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function deleteOne(int $id)
    {
        try {
            $stmt = $this->connection->prepare("DELETE FROM permohonan WHERE id = :id");
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }
}
