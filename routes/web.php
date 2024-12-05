<?php

use Bramus\Router\Router;

$router = new Router();
$router->setNamespace('\App\Controllers');

$router->before('GET', '/', 'AuthController@logged');
$router->before('GET', '/login', 'AuthController@logged');
$router->before('GET', '/register', 'AuthController@logged');
$router->before('GET', '/dashboard', 'AuthController@authenticate');
$router->before('GET', '/profile', 'AuthController@authenticate');
$router->before('POST', '/profile', 'AuthController@authenticate');
$router->before('POST', '/register', 'AuthController@authenticate');

$router->before('POST', '/user/update', 'AuthController@authenticate');
$router->before('DELETE', '/user/(\d+)', 'AuthController@authenticate');

$router->before('POST', '/product', 'AuthController@authenticate');
$router->before('DELETE', '/product/(\d+)', 'AuthController@authenticate');
$router->before('POST', '/product/update', 'AuthController@authenticate');

$router->before('GET', '/detail/(\d+)', 'AuthController@authenticate');
$router->before('GET', '/files/([a-zA-Z0-9\-_]+)', 'AuthController@authenticate');

$router->before('POST', '/export', 'AuthController@authenticate');

$router->get('/', 'ViewController@index');
$router->get('/dashboard', 'ViewController@dashboard');
$router->get('/profile', 'ViewController@profile');
$router->get('/agregat-kependudukan', 'ViewController@agregat');
$router->get('/login', 'ViewController@login');
$router->get('/register', 'ViewController@register');
$router->get('/detail/(\d+)', 'ViewController@detail');

$router->post('/register', 'AuthController@register');
$router->post('/profile', 'ProfileController@updateProfile');

$router->post('/user/update', 'ProfileController@updateStatusLevel');
$router->delete('/user/(\d+)', 'AuthController@deleteUser');

$router->post('/agregat', 'AgrController@getData');
$router->post('/maps', 'AgrController@getMaps');
$router->post('/store', 'AgrController@storeAll');
$router->get('/area', 'AgrController@getArea');

$router->post('/login', 'AuthController@login');
$router->get('/logout', 'AuthController@logout');

$router->post('/upload', 'FileController@uploadSingle');

$router->post('/product', 'ProductController@createProduct');
$router->delete('/product/(\d+)', 'ProductController@deleteProduct');
$router->post('/product/update', 'ProductController@updateProduct');

$router->post('/export', 'ExportController@export');

$router->get('/files/([a-zA-Z0-9\-_]+)', function ($files) {
    $filename = $files . '.pdf';
    $originalFilePath = (dirname(__DIR__, 1) . '/storage/uploads/' . $filename);

    if (file_exists($originalFilePath)) {
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="' . rawurlencode(basename($filename)) . '"');
        readfile($originalFilePath);
        exit;
    } else {
        http_response_code(404);
        echo "Dokumen tidak ditemukan.";
    }
});


$router->set404(function () {
    header('HTTP/1.1 404 Not Found');
    header("Status: 404 Not Found");
    header('Location: /');
});

$router->run();
