<?php
// Server configuration check
echo "<h1>Server Configuration Check</h1>";

echo "<h2>Apache Modules</h2>";
$modules = apache_get_modules();
echo "<ul>";
foreach ($modules as $module) {
    echo "<li>$module</li>";
}
echo "</ul>";

echo "<h2>MIME Types</h2>";
if (function_exists('mime_content_type')) {
    $jsFile = 'assets/index-LgE8YPdE.js';
    if (file_exists($jsFile)) {
        $mime = mime_content_type($jsFile);
        echo "<p>JavaScript file MIME type: $mime</p>";
    }
}

echo "<h2>.htaccess Test</h2>";
if (file_exists('.htaccess')) {
    echo "<p>.htaccess file exists</p>";
    echo "<pre>" . htmlspecialchars(file_get_contents('.htaccess')) . "</pre>";
}

echo "<h2>Headers Test</h2>";
$headers = get_headers('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
echo "<pre>";
print_r($headers);
echo "</pre>";

echo "<h2>PHP Info</h2>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
echo "<p>Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "</p>";
?>
