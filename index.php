<?php

require_once 'lib/framework/dispatcher.php';

// BaseAutoLoader::register_base_lib('mysql');

$dispatcher = new Dispatcher(
    new ConfigIni('webplay/settings.ini', null)
  , 'webplay'
);
$dispatcher->dispatch($_SERVER['REQUEST_URI']);
