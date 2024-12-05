<?php

namespace App\Controllers;

use App\Models\UserModel;

class ProfileController
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    public function updateProfile()
    {
        $params = $_POST;
        $result = $this->userModel->updateBy($params);
        if ($result === true) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Profil berhasil diubah.'
            ]);
        }
    }

    public function updateStatusLevel()
    {
        $params = $_POST;
        $result = $this->userModel->statusLevelBy($params);
        if ($result === true) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Status akun berhasil diubah.'
            ]);
        }
    }
}
