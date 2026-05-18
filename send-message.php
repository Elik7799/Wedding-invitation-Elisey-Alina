<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Замените на свои данные
$BOT_TOKEN = 8732232215:AAECYq8ZNtUNgfhA-_PXwNgUnG9hNEasSlY;
$CHAT_ID = 743278555;

$message = "🎉 НОВАЯ АНКЕТА 🎉

👤 Имя: {$input['name']}
📅 Присутствие: {$input['attendance']}
🍷 Напитки: {$input['drinks']}
👥 Гость: {$input['guest']}

⏰ Отправлено: " . date('d.m.Y H:i:s');

$url = "https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage";
$data = [
    'chat_id' => $CHAT_ID,
    'text' => $message
];

$options = [
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result !== false) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка отправки']);
}
?>