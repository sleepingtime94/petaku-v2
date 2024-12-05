<?php

namespace App\Databases;

use PDO;

class Mysql
{
    public $connection;

    private function dotenv()
    {
        $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
        $dotenv->load();
    }

    public function __construct()
    {
        $this->dotenv();
        $this->connection = new PDO('mysql:host=' . $_ENV['DB_HOST'] . ';dbname=' . $_ENV['DB_NAME'], $_ENV['DB_USER'], $_ENV['DB_PASS']);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function connect()
    {
        return $this->connection;
    }
}
