<?php

function getPdo() {
    try {
        $db = new PDO('mysql:host=localhost;dbname=geury;', 'geury', 'Snm2R19K');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die('connection error : ' . $e->getMessage());
    }

    return $db;
}
$date =date ("y.m.d");

print_r($_POST);
$db = getPdo();
    try {
        $request = 'INSERT INTO `score` (`pseudo`,`score`,`chrono`,`date`) VALUES (:pseudo, :score, :chrono, :date)';
        $insert = $db->prepare($request);
        $insert->execute(['pseudo' => $_POST['pseudo'], 'score' => $_POST['score'], 'chrono' => $_POST['chrono'], 'date' => $date]);
    } catch (PDOException $e) {
        die($e->getMessage());
    }




