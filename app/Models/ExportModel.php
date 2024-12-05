<?php

namespace App\Models;

use PDO;
use App\Databases\Mysql;

class ExportModel
{
    private $mysql;
    private $connection;

    public function __construct()
    {
        $this->mysql = new Mysql();
        $this->connection = $this->mysql->connect();
    }

    public function selectBy($table, $area)
    {
        try {
            $areaWithWildcards = "%" . $area . "%";
            $stmt = $this->connection->prepare("SELECT * FROM $table WHERE KODE LIKE :area");
            $stmt->bindParam(":area", $areaWithWildcards, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }
}
