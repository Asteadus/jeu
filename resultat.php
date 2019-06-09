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
$db = getPdo();
showAllScores($db);

function showAllScores(PDO $db){
    try{
        $reponse = $db->prepare('SELECT pseudo, score, chrono, date FROM `score` ORDER BY score DESC');
        $reponse->execute();
    } catch (Exception $ex) {
        die($ex->getMessage());
    }
    
    $i=1;
    $lines = $reponse->fetchAll();
    echo '<table>';
    echo '<thead>';
    echo '<td>Classement</td>';
    echo '<td>Score</td>';
    echo '<td>Pseudo</td>';
    echo '<td>Temps</td>';
    echo '<td>Date</td>';
    echo '</thead>';
    echo '<tbody>';
    foreach ($lines as $line){
        echo '<tr>';
            echo '<td>'.$i.'</td>';
            echo '<td>'.$line['score'].'</td>';
            echo '<td>'.$line['pseudo'].'</td>';
            echo '<td>'.$line['chrono'].'</td>';
            echo '<td>'.$line['date'].'</td>';
            $i++;

        echo '</tr>';
    }
    echo '<tbody>';
    echo '</table>';
}

