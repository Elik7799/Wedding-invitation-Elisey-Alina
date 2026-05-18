<?php
echo "PHP работает!";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo " и POST-запросы разрешены!";
}
?>