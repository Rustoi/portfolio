<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Подключаем PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Включаем отображение ошибок для отладки
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Проверяем, что запрос пришел методом POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');

    // Проверяем, что поля заполнены
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo "Все поля обязательны для заполнения.";
        exit;
    }

    // Создаем объект PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Настройки SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.yandex.com'; // SMTP-сервер
        $mail->SMTPAuth = true;
        $mail->Username = 'rustoi2015@yandex.ru'; // Ваш email
        $mail->Password = 'keqysddxzpzuinwu'; // Ваш пароль от почты
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Получатель
        $mail->setFrom('rustoi2015@yandex.ru', 'Ваше Имя');
        $mail->addAddress('rustoi2015@yandex.ru'); // Ваш email для получения письма

        // Содержимое письма
        $mail->isHTML(false);
        $mail->Subject = 'Новое сообщение с сайта';
        $mail->Body = "Имя: $name\nEmail: $email\nСообщение:\n$message";

        // Отправка письма
        $mail->send();
        echo "Сообщение успешно отправлено!";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Ошибка при отправке письма: {$mail->ErrorInfo}";
    }
} else {
    http_response_code(405);
    echo "Метод запроса не поддерживается.";
}



