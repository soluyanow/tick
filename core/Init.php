<?php
require_once($_SERVER["DOCUMENT_ROOT"]."/core/Main.class.php");

$main = new Main();

if ($main->Init()) {
    $main->showSystem();
}
