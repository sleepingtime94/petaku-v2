<?php

namespace App\Controllers;

use App\Models\UserModel;

class AuthController
{

    private $userModel;

    private function dotenv()
    {
        $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
        $dotenv->load();
    }

    public function __construct()
    {
        $this->dotenv();
        $this->userModel = new UserModel();
    }

    public function logout()
    {
        session_destroy();
        header('location: /');
        exit();
    }

    public function authenticate()
    {
        if (!isset($_SESSION['authToken'])) {
            header('location: /login');
            exit();
        }
    }

    public function logged()
    {
        if (isset($_SESSION['authToken'])) {
            header('location: /dashboard');
            exit();
        }
    }

    public function login()
    {
        $req = (object) $_POST;
        $username = $this->sanitizeIn(strtolower($req->username));
        $password = $req->password;
        // $turnstileResponse = $_POST['turnstileToken'];
        // $secretKey = $_ENV['CF_TURNSTILE_SECRET_KEY'];

        // $verifyURL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        // $data = [
        //     'secret' => $secretKey,
        //     'response' => $turnstileResponse,
        //     'remoteip' => $_SERVER['REMOTE_ADDR']
        // ];

        // $options = [
        //     'http' => [
        //         'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        //         'method'  => 'POST',
        //         'content' => http_build_query($data)
        //     ]
        // ];

        // $context  = stream_context_create($options);
        // $result = file_get_contents($verifyURL, false, $context);
        // $resultData = json_decode($result, true);

        // if ($resultData['success']) {
        $users = (object) $this->userModel->selectBy($username)[0];

        if ($users->status !== 0) {
            if (password_verify($password, $users->password)) {
                $_SESSION['authToken'] = base64_encode(date('dmyhis'));
                $_SESSION['userName'] = $username;
                $_SESSION['userId'] = $users->id;
                $_SESSION['userLevel'] = $users->level;
                session_regenerate_id(true);
                echo json_encode(['status' => 'success', 'message' => 'Mengalihkan ke halaman menu utama.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Silahkan periksa kembali nama pengguna / kata sandi.']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Akun anda belum aktif.']);
        }
        // } else {
        //     echo json_encode(['status' => 'error', 'message' => 'Captcha tidak valid, silahkan coba lagi.']);
        // }
    }

    public function register()
    {
        $req = (object) $_POST;
        $params = [];

        foreach ($req as $key => $value) {
            if (!empty($value)) {
                $params[$key] = $value;
            } else {
                $params[$key] = null;
            }
        }

        $result = $this->checkForNull($params);
        $isTaken = $this->checkUsername($req->username);

        if ($isTaken === false) {
            if ($result === false) {
                echo json_encode(['status' => 'error', 'message' => 'Silahkan cek kembali dan pastikan semua data sudah diisi dengan benar.']);
            } else {
                $this->userModel->createOne($req);
                echo json_encode(['status' => 'success', 'message' => 'Pendaftaran berhasil, menunggu verifikasi dan persetujuan dari admin.']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Nama pengguna sudah terdaftar.']);
        }
    }

    function sanitizeIn($inputString)
    {
        $resultString = preg_replace('/[^a-zA-Z0-9\s]/', '', $inputString);
        return $resultString;
    }

    function checkForNull($params)
    {
        foreach ($params as $key => $value) {
            if (is_null($value)) {
                return false;
            }
        }
        return true;
    }

    function checkUsername($username)
    {
        $users = (object) $this->userModel->selectBy($username)[0];
        if ($users->username == null) {
            return false;
        } else {
            return true;
        }
    }

    public function deleteUser($id)
    {

        $result = $this->userModel->deleteBy($id);
        if ($result === true) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Akun dihapus.'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Gagal menghapus akun.'
            ]);
        }
    }
}
