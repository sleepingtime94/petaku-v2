<?php

namespace App\Controllers;

use Verot\Upload\Upload;
use App\Models\FileModel;

class FileController
{

    private $handle;
    private $fileModel;

    public function __construct()
    {
        $this->handle = new Upload($_FILES['file'], 'id_ID');
        $this->fileModel = new FileModel();
    }

    public function uploadSingle()
    {
        $reqbody = (object) $_POST;

        if ($this->handle->uploaded) {
            $this->handle->file_new_name_body = $this->randomString();
            $this->handle->file_max_size = 2097152;
            $this->handle->allowed = array('application/pdf');
            $this->handle->forbidden = array();
            $this->handle->process('../storage/uploads', 'id_ID');
            $this->handle->dir_auto_create = true;

            if ($this->handle->processed) {
                $params = [
                    'status' => 'success',
                    'original_name' => $this->handle->file_src_name,
                    'path_name' => $this->handle->file_dst_name,
                    'message' => 'File berhasil diunggah!'
                ];
                echo json_encode($params);
            } else {
                echo json_encode(
                    [
                        'status' => 'error',
                        'message' => $this->handle->error
                    ]
                );
            }

            $this->handle->clean();
        }
    }

    public function randomString($length = 20)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
