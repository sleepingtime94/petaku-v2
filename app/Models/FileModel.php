<?php

namespace App\Models;

use PDO;
use App\Databases\Mysql;

class FileModel
{
    private $mysql;
    private $connection;

    public function __construct()
    {
        $this->mysql = new Mysql();
        $this->connection = $this->mysql->connect();
    }

    public function selectBy($pid)
    {
        try {
            $stmt = $this->connection->prepare("SELECT * FROM files WHERE pid = :pid");
            $stmt->bindParam(":pid", $pid, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function createOne($params)
    {
        try {
            $stmt = $this->connection->prepare("INSERT INTO files (pid, original_name, path_name) VALUES (:pid, :original_name, :path_name)");
            $stmt->bindParam(":pid", $params->pid, PDO::PARAM_STR);
            $stmt->bindParam(":original_name", $params->original_name, PDO::PARAM_STR);
            $stmt->bindParam(":path_name", $params->path_name, PDO::PARAM_STR);
            $stmt->execute();
            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }
}
