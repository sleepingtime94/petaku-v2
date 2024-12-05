<?php

namespace App\Controllers;

use App\Models\AgrModel;

class AgrController
{
    private $model;

    public function __construct()
    {
        $this->model = new AgrModel();
    }

    public function getData()
    {
        $params = (object) $_POST;
        $pid = $this->sanitizeIn($params->pid);

        switch ($params->req) {
            case 'jumlah_penduduk_by_id':
                echo json_encode($this->model->selectById('jumlah_penduduk', 'KODE', $pid));
                break;
            case 'jumlah_penduduk_by_all':
                echo json_encode($this->model->selectByAll('jumlah_penduduk', 'KODE', $pid));
                break;
            case 'akta_kelahiran_by_id':
                echo json_encode($this->model->selectById('akta_kelahiran', 'KODE', $pid));
                break;
            case 'akta_kelahiran_by_all':
                echo json_encode($this->model->selectByAll('akta_kelahiran', 'KODE', $pid));
                break;
            case 'golongan_darah_by_id':
                echo json_encode($this->model->selectById('golongan_darah', 'KODE', $pid));
                break;
            case 'golongan_darah_by_all':
                echo json_encode($this->model->selectByAll('golongan_darah', 'KODE', $pid));
                break;
            case 'kelompok_umur_by_id':
                echo json_encode($this->model->selectById('kelompok_umur', 'KODE', $pid));
                break;
            case 'kelompok_umur_by_all':
                echo json_encode($this->model->selectByAll('kelompok_umur', 'KODE', $pid));
                break;
            case 'kepala_keluarga_by_id':
                echo json_encode($this->model->selectById('kepala_keluarga', 'KODE', $pid));
                break;
            case 'kepala_keluarga_by_all':
                echo json_encode($this->model->selectByAll('kepala_keluarga', 'KODE', $pid));
                break;
            case 'status_kawin_by_id':
                echo json_encode($this->model->selectById('status_kawin', 'KODE', $pid));
                break;
            case 'status_kawin_by_all':
                echo json_encode($this->model->selectByAll('status_kawin', 'KODE', $pid));
                break;
            case 'agama_by_id':
                echo json_encode($this->model->selectById('agama', 'KODE', $pid));
                break;
            case 'agama_by_all':
                echo json_encode($this->model->selectByAll('agama', 'KODE', $pid));
                break;
            case 'disabilitas_by_id':
                echo json_encode($this->model->selectById('disabilitas', 'KODE', $pid));
                break;
            case 'disabilitas_by_all':
                echo json_encode($this->model->selectByAll('disabilitas', 'KODE', $pid));
                break;
            case 'kia_by_id':
                echo json_encode($this->model->selectById('kia', 'KODE', $pid));
                break;
            case 'kia_by_all':
                echo json_encode($this->model->selectByAll('kia', 'KODE', $pid));
                break;
            case 'ktp_by_id':
                echo json_encode($this->model->selectById('ktp', 'KODE', $pid));
                break;
            case 'ktp_by_all':
                echo json_encode($this->model->selectByAll('ktp', 'KODE', $pid));
                break;
            case 'pekerjaan_by_id':
                echo json_encode($this->model->selectById('pekerjaan', 'KODE', $pid));
                break;
            case 'pekerjaan_by_all':
                echo json_encode($this->model->selectByAll('pekerjaan', 'KODE', $pid));
                break;
            case 'pendidikan_by_id':
                echo json_encode($this->model->selectById('pendidikan', 'KODE', $pid));
                break;
            case 'pendidikan_by_all':
                echo json_encode($this->model->selectByAll('pendidikan', 'KODE', $pid));
                break;
            case 'shbkel_by_id':
                echo json_encode($this->model->selectById('shbkel', 'KODE', $pid));
                break;
            case 'shbkel_by_all':
                echo json_encode($this->model->selectByAll('shbkel', 'KODE', $pid));
                break;
            default:
                echo json_encode($this->model->selectByAll('jumlah_penduduk', 'KODE', 6305));
                break;
        }
    }

    public function getMaps()
    {
        $params = (object) $_POST;
        echo json_encode($this->model->selectByMaps('jumlah_penduduk', $this->sanitizeIn($params->location)));
    }

    public function storeAll()
    {
        $params = (object) $_POST;
        echo json_encode($this->model->storeAll($this->sanitizeIn($params->code)));
    }

    public function getArea()
    {
        echo json_encode($this->model->selectAll('wilayah'));
    }

    function sanitizeIn($inputString)
    {
        $resultString = preg_replace('/[^a-zA-Z0-9\s]/', '', $inputString);
        return $resultString;
    }
}
