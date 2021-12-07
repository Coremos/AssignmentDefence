<?php
    $host = 'localhost';
    $user = 'kyunho';
    $pw = '1234';
    $dbName = 'Defence';
    $mysqli = new mysqli($host, $user, $pw, $dbName);

    $id = $_POST['id'];
    $unitTypeList = $_POST['unitTypeList'];
    $diamond = $_POST['diamond'];
    $highScore = $_POST['highScore'];

    $query = "update user set selectunit='$unitTypeList', diamond='$diamond', highscore='$highScore' where id='$id'";
    mysqli_query($mysqli, $query);

    mysqli_close($mysqli);
?>