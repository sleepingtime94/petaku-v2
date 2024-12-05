<?php

namespace App\Controllers;

use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use App\Models\UserModel;
use App\Models\ProductModel;

class ViewController
{
    private $userModel;
    private $productModel;
    private $twigEngine;
    private $twigLoader;

    public function __construct()
    {
        $this->twigLoader = new FilesystemLoader(dirname(__DIR__, 1) . '/Views');
        $this->twigEngine = new Environment($this->twigLoader);
        $this->userModel = new UserModel();
        $this->productModel = new ProductModel();
    }

    private function withAuthToken(array $data): array
    {
        $data['authToken'] = $_SESSION['authToken'] ?? null;
        $data['userName'] = $_SESSION['userName'] ?? null;
        $data['userLevel'] = $_SESSION['userLevel'] ?? null;
        return $data;
    }

    public function render($view, $data = [])
    {
        echo $this->twigEngine->render($view, $this->withAuthToken($data));
    }

    public function index()
    {
        $params = [
            'title' => 'PETAKU',
        ];

        $this->render('index.twig', $params);
    }

    public function agregat()
    {
        $users = $this->userModel->selectBy($_SESSION['userName'])[0];
        $params = [
            'title' => 'AGREGAT KEPENDUDUKAN - PETAKU',
            'codeArea' => $users['code_area'] ?? null,
        ];

        $this->render('agregat.twig', $params);
    }

    public function register()
    {
        $params = [
            'title' => 'REGISTER - PETAKU'
        ];

        $this->render('register.twig', $params);
    }

    public function login()
    {
        $params = [
            'title' => 'LOGIN - PETAKU'
        ];

        $this->render('login.twig', $params);
    }

    public function dashboard()
    {
        if ($_SESSION['userId'] == 1) {
            $listProduct = $this->productModel->selectAll();
        } else {
            $listProduct = $this->productModel->selectAllByUser($_SESSION['userId']);
        }

        $listUser = $this->userModel->selectAll();

        foreach ($listUser as &$user) {
            $user['user_status'] = $this->userStatus($user['status']);
            $user['user_level'] = $this->userLevel($user['level']);
        }

        foreach ($listProduct as &$product) {
            $product['product_status'] = $this->productStatus($product['status']);
            $product['product_category'] = $this->productCategory($product['category']);
        }

        $params = [
            'title' => 'DASHBOARD - PETAKU',
            'listProduct' => $listProduct,
            'listUser' => $listUser,
            'userId' => $_SESSION['userId']
        ];

        $this->render('dashboard.twig', $params);
    }

    public function profile()
    {
        $params = [
            'title' => 'PROFIL - PETAKU',
            'user' => $this->userModel->selectBy($_SESSION['userName'])[0]
        ];

        $this->render('profile.twig', $params);
    }

    public function userStatus($status)
    {
        return $status == 1 ? 'Aktif' : 'Tidak Aktif';
    }

    public function userLevel($level)
    {
        switch ($level) {
            case 0:
                return 'Umum';
                break;
            case 1:
                return 'Admin';
                break;
            case 2:
                return 'Dinas';
                break;
            case 3:
                return 'Kecamatan';
                break;
            default:
                break;
        }
    }

    public function productStatus($status)
    {
        switch ($status) {
            case 0:
                return '<span class="text-danger">Menunggu Verifikasi</span>';
                break;
            case 1:
                return '<span class="text-primary">Sedang Di Proses</span>';
                break;
            case 2:
                return '<span class="text-success">Dokumen Selesai</span>';
                break;
            case 3:
                return '<span class="text-warning">Dalam Proses</span>';
                break;

            default:
                break;
        }
    }

    public function productCategory($category)
    {
        switch ($category) {
            case 0:
                return 'Permintaan Data';
                break;
            case 1:
                return 'Permintaan Hak Akses';
                break;

            default:
                break;
        }
    }

    public function detail($id)
    {

        $productDetail = $this->productModel->selectByDetail($id);

        if (empty($productDetail)) {
            header('location: /dashboard');
            exit;
        } else {
            foreach ($productDetail as &$product) {
                $product['product_status'] = $this->productStatus($product['status']);
                $product['product_category'] = $this->productCategory($product['category']);
            }

            $params = [
                'title' => 'DETAIL - PETAKU',
                'data' => $productDetail[0],
                'product_id' => $id
            ];
            $this->render('detail.twig', $params);
        }
    }
}
