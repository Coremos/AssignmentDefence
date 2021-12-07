<?php

    $host = 'localhost';
    $user = 'kyunho';
    $pw = '1234';
    $dbName = 'Defence';
    $mysqli = new mysqli($host, $user, $pw, $dbName);

    $id = $_POST['id'];
    $password = $_POST['password'];

    $sql = "insert into user (
            id,
            password
    )";
    
    $sql = $sql. "values (
            '$id',
            '$password'
    )";

    $check = "select * from user where id='$id'";
    if(($mysqli->query($check))->num_rows==1) // 아이디 이미 있을 때
    {
        echo 'duplicated_id';
    }
    else
    {
        if($mysqli->query($sql))
        { 
            echo 'success';
        }
        else
        { 
            echo 'failed';
        }
    }
    
    mysqli_close($mysqli);
?>