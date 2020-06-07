<?php
use PHPMailer\PHPMailer\PHPMailer;
$to = 'ek@sunway.ua';
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
$comment = isset($_POST['comment']) ? htmlspecialchars($_POST['comment']) : '';
$city = isset($_POST['city']) ? htmlspecialchars($_POST['city']) : '';
$tname = isset($_POST['tname']) ? htmlspecialchars($_POST['tname']) : '';
$tprice = isset($_POST['tprice']) ? htmlspecialchars($_POST['tprice']) : '';
$response = [];
    if ($name) {
        if ($phone) {
            if ($comment) {
                require 'vendor/autoload.php';
                $mail = new PHPMailer;
				$mail->CharSet = 'UTF-8';
                $mail->isSendmail();
                $mail->setFrom($to, $to);
                $mail->addAddress($to, $to);
                $mail->Subject = 'Заявка';
                $res = <<<HTML
Имя: {$name}<br>
Телефон: {$phone}<br>
Сообщение: {$comment}
HTML;
if($city) $res .= <<<HTML
<br>Город: {$city}
<br>Товар: {$tname}
<br>Цена: {$tprice}
HTML;
				$mail->msgHTML($res);
                if ($mail->send()) $response['success'] = 'Сообщение отправлено';
                else $response['error'] = 'Error';
            } else $response['error'] = 'Bad comment';
        } else $response['error'] = 'Bad phone';
    } else $response['error'] = 'Bad name';
echo json_encode($response);
?>