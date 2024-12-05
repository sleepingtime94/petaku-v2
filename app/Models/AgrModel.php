<?php

namespace App\Models;

use PDO;
use App\Databases\Mysql;

class AgrModel
{
    private $mysql;
    private $connection;

    public function __construct()
    {
        $this->mysql = new Mysql();
        $this->connection = $this->mysql->connect();
    }

    public function selectAll(string $table)
    {
        try {
            $stmt = $this->connection->query("SELECT * FROM $table");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function selectById(string $table, string $where, int $key)
    {
        try {
            $stmt = $this->connection->prepare("SELECT * FROM $table WHERE $where = :key");
            $stmt->bindParam(":key", $key, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function selectByAll(string $table, string $where, string $key)
    {
        try {
            $stmt = $this->connection->prepare("SELECT * FROM $table WHERE $where LIKE '%:key%'");
            $stmt->bindParam(":key", $key, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function selectByMaps(string $table, string $key)
    {
        try {
            $stmt = $this->connection->prepare("SELECT * FROM $table WHERE WILAYAH = :key");
            $stmt->bindParam(":key", $key, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function storeAll(int $code)
    {
        try {
            $stmt = $this->connection->prepare("SELECT t1.*, t2.*, t3.*, t4.*, t5.*, t6.*, t7.*, t8.*, t9.*, t10.*, t11.*, t12.*, t13.*
            FROM jumlah_penduduk t1
            JOIN kepala_keluarga t2 ON t1.KODE = t2.KODE
            JOIN ktp t3 ON t1.KODE = t3.KODE
            JOIN kia t4 ON t1.KODE = t4.KODE
            JOIN akta_kelahiran t5 ON t1.KODE = t5.KODE
            JOIN pendidikan t6 ON t1.KODE = t6.KODE
            JOIN pekerjaan t7 ON t1.KODE = t7.KODE
            JOIN golongan_darah t8 ON t1.KODE = t8.KODE
            JOIN status_kawin t9 ON t1.KODE = t9.KODE
            JOIN shbkel t10 ON t1.KODE = t10.KODE
            JOIN agama t11 ON t1.KODE = t11.KODE
            JOIN kelompok_umur t12 ON t1.KODE = t12.KODE
            JOIN disabilitas t13 ON t1.KODE = t13.KODE
            WHERE t1.KODE = :kode");
            $stmt->bindParam(":kode", $code, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return $e;
        }
    }
}
