<?php
session_start();
// verificar se foi click (POST)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_destroy();
    header('location:../index.php?saiu=ok');
}
?>