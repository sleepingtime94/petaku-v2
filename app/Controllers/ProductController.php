<?php

namespace App\Controllers;

use App\Models\ProductModel;

class ProductController
{

    private $productModel;

    public function __construct()
    {
        $this->productModel = new ProductModel();
    }

    public function createProduct()
    {
        $params = (object) array_merge($_POST, [
            'user_id' => $_SESSION['userId'],
        ]);


        $result = $this->productModel->createOne((object) $params);

        if ($result === true) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Permohonan anda sedang diproses.'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Gagal membuat permohonan.'
            ]);
        }
    }

    public function deleteProduct($id)
    {

        $result = $this->productModel->deleteOne($id);
        if ($result === true) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Permohonan dihapus.'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Gagal menghapus permohonan.'
            ]);
        }
    }

    public function updateProduct()
    {

        $id = $_POST['id'];
        $params = $_POST;
        unset($params['id']);

        $result = $this->productModel->updateById($id, $params);

        if ($result === true) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Permohonan anda sedang diproses.'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Gagal membuat permohonan.'
            ]);
        }
    }
}
