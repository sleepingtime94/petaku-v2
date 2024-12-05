<?php

namespace App\Controllers;

use App\Models\ExportModel;
use Dompdf\Dompdf;
use Dompdf\Options;

class ExportController
{
    private $exportModel;

    public function __construct()
    {
        $this->exportModel = new ExportModel();
    }

    public function export()
    {
        $params = (object) $_POST;

        $data = $this->exportModel->selectBy($params->data, $params->code);

        if (empty($data)) {
            echo "Data tidak ditemukan!";
            return;
        }

        $docTitle = strtoupper($params->data);
        $docTitle = str_replace('_', ' ', $docTitle);
        $areaTitle = strtoupper($params->area);
        $html = $this->generateHtmlFromData($data, $docTitle, $areaTitle);

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isPhpEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('F4', 'portrait');
        $dompdf->render();
        $dompdf->stream('data-export.pdf', array('Attachment' => 1));
    }

    private function generateHtmlFromData($data, $title, $area)
    {
        $html   = '<style>table{border-collapse:collapse;width:100%}td,th{border:1px solid #000;padding:8px;text-align:left}tr:nth-child(even){background-color:#f2f2f2}</style>';
        $html .= '<div style="font-weight: bold;font-size: 30px;">' . $title . '</div>';
        $html .= '<div style="font-size: 30px;margin-bottom: 10px">' . $area . '</div>';
        $html .= '<table>';

        foreach ($data[0] as $key => $value) {
            if ($key != 'KODE' && $key != 'WILAYAH') {
                $html .= '<tr>';
                $html .= '<td>' . htmlspecialchars($key) . '</td>';
                $html .= '<td style="text-align: center">' . htmlspecialchars($value) . '</td>';
                $html .= '</tr>';
            }
        }

        $html .= '</table>';
        return $html;
    }
}
