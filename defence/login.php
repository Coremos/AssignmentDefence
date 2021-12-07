<?php
    $host = 'localhost';
    $user = 'kyunho';
    $pw = '1234';
    $dbName = 'Defence';
    $mysqli = new mysqli($host, $user, $pw, $dbName);

    $id = $_POST['id'];
    $password = $_POST['password'];

    $query = "select * from user where id='$id' and password='$password'";
    $result = mysqli_query($mysqli, $query);
    $row = mysqli_fetch_array($result);

    if ($id == $row['id'] && $password == $row['password'])
    {
        echo $row['id']." ".$row['selectunit']." ".$row["haveunit"]." ".$row["diamond"]." ".$row["highscore"];
    }
    else
    {
       echo 'failed';
    }

    mysqli_close($mysqli);
?>