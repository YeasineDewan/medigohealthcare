<?php
$context = stream_context_create([
    'ssl' => [
        'verify_peer' => true,
        'verify_peer_name' => true,
        'cafile' => 'e:\cacert.pem'
    ]
]);

$result = file_get_contents('https://repo.packagist.org/packages.json', false, $context);
echo $result ? 'SUCCESS' : 'FAILED';
echo PHP_EOL;
?>
