<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function cme_json(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    cme_json(405, ['ok' => false, 'code' => 'error']);
}

function cme_clean(string $value, int $limit): string
{
    $value = str_replace(["\r", "\n"], ' ', trim($value));
    if (strlen($value) > $limit) {
        $value = substr($value, 0, $limit);
    }
    return $value;
}

/** Form deliveries go here. Not the public business address, and not taken from the visitor. */
const CME_FORM_RECIPIENT = 'fjarmonte@gmail.com';

/** Envelope sender when CME_SMTP_FROM is unset. Public pages still show the business address separately. */
const CME_FORM_SENDER = 'freddy@computingmadeeasy.org';

function cme_config(): array
{
    $cfg = [
        'host' => getenv('CME_SMTP_HOST') ?: '',
        'port' => (int) (getenv('CME_SMTP_PORT') ?: 587),
        'user' => getenv('CME_SMTP_USER') ?: '',
        'password' => getenv('CME_SMTP_PASSWORD') ?: '',
        'from' => getenv('CME_SMTP_FROM') ?: CME_FORM_SENDER,
        'encryption' => getenv('CME_SMTP_ENCRYPTION') ?: 'starttls',
    ];
    $path = getenv('CME_MAIL_CONFIG') ?: (dirname(__DIR__) . '/private/cme-mail.php');
    if (is_file($path)) {
        $loaded = include $path;
        if (is_array($loaded)) {
            unset($loaded['to'], $loaded['recipient'], $loaded['cc'], $loaded['bcc']);
            $cfg = array_merge($cfg, $loaded);
        }
    }
    if (trim((string) $cfg['from']) === '') {
        $cfg['from'] = CME_FORM_SENDER;
    }
    $cfg['to'] = CME_FORM_RECIPIENT;
    return $cfg;
}

function cme_configured(array $cfg): bool
{
    foreach (['host', 'user', 'password', 'from'] as $key) {
        if (!isset($cfg[$key]) || trim((string) $cfg[$key]) === '') {
            return false;
        }
    }
    return $cfg['to'] === CME_FORM_RECIPIENT
        && in_array((string) $cfg['encryption'], ['starttls', 'ssl'], true);
}

function cme_limited(string $ip): bool
{
    $file = sys_get_temp_dir() . '/cme-contact-rate.json';
    $now = time();
    $window = 600;
    $max = 5;
    $data = [];
    if (is_file($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }
    $hits = array_values(array_filter($data[$ip] ?? [], static fn ($stamp) => is_int($stamp) && $stamp > $now - $window));
    if (count($hits) >= $max) {
        return true;
    }
    $hits[] = $now;
    $data[$ip] = $hits;
    file_put_contents($file, json_encode($data), LOCK_EX);
    return false;
}

function cme_smtp(array $cfg, string $replyTo, string $subject, string $body): bool
{
    $encryption = (string) $cfg['encryption'];
    $remote = ($encryption === 'ssl' ? 'ssl://' : 'tcp://') . $cfg['host'] . ':' . (int) $cfg['port'];
    $socket = stream_socket_client($remote, $errno, $errstr, 20, STREAM_CLIENT_CONNECT);
    if (!$socket) {
        return false;
    }
    stream_set_timeout($socket, 20);
    $read = static function () use ($socket): string {
        $data = '';
        while (($line = fgets($socket, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };
    $cmd = static function (string $command) use ($socket, $read): string {
        fwrite($socket, $command . "\r\n");
        return $read();
    };
    $greet = $read();
    if (!str_starts_with($greet, '220')) {
        fclose($socket);
        return false;
    }
    $ehlo = $cmd('EHLO computingmadeeasy.org');
    if (!str_starts_with($ehlo, '250')) {
        fclose($socket);
        return false;
    }
    if ($encryption === 'starttls') {
        $start = $cmd('STARTTLS');
        if (!str_starts_with($start, '220')) {
            fclose($socket);
            return false;
        }
        $crypto = STREAM_CRYPTO_METHOD_TLS_CLIENT;
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) {
            $crypto |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
        }
        if (!stream_socket_enable_crypto($socket, true, $crypto)) {
            fclose($socket);
            return false;
        }
        $ehlo = $cmd('EHLO computingmadeeasy.org');
        if (!str_starts_with($ehlo, '250')) {
            fclose($socket);
            return false;
        }
    }
    if (!str_starts_with($cmd('AUTH LOGIN'), '334')) {
        fclose($socket);
        return false;
    }
    if (!str_starts_with($cmd(base64_encode((string) $cfg['user'])), '334')) {
        fclose($socket);
        return false;
    }
    if (!str_starts_with($cmd(base64_encode((string) $cfg['password'])), '235')) {
        fclose($socket);
        return false;
    }
    if (!str_starts_with($cmd('MAIL FROM:<' . $cfg['from'] . '>'), '250')) {
        fclose($socket);
        return false;
    }
    $rcpt = $cmd('RCPT TO:<' . $cfg['to'] . '>');
    if (!str_starts_with($rcpt, '250') && !str_starts_with($rcpt, '251')) {
        fclose($socket);
        return false;
    }
    if (!str_starts_with($cmd('DATA'), '354')) {
        fclose($socket);
        return false;
    }
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers = [
        'From: <' . $cfg['from'] . '>',
        'To: <' . $cfg['to'] . '>',
        'Reply-To: <' . $replyTo . '>',
        'Subject: ' . $encodedSubject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'Date: ' . date(DATE_RFC2822),
    ];
    $safeBody = preg_replace('/^\./m', '..', str_replace(["\r\n", "\r"], "\n", $body));
    $safeBody = str_replace("\n", "\r\n", (string) $safeBody);
    fwrite($socket, implode("\r\n", $headers) . "\r\n\r\n" . $safeBody . "\r\n.\r\n");
    $sent = $read();
    $cmd('QUIT');
    fclose($socket);
    return str_starts_with($sent, '250');
}

$raw = file_get_contents('php://input') ?: '';
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    $payload = $_POST;
}
unset($payload['to'], $payload['recipient'], $payload['cc'], $payload['bcc'], $payload['from']);

$honeypot = trim((string) ($payload['company_website'] ?? ''));
if ($honeypot !== '') {
    cme_json(400, ['ok' => false, 'code' => 'rejected']);
}

$name = cme_clean((string) ($payload['name'] ?? ''), 120);
$email = cme_clean((string) ($payload['email'] ?? ''), 200);
$phone = cme_clean((string) ($payload['phone'] ?? ''), 40);
$interest = cme_clean((string) ($payload['interest'] ?? ''), 40);
$message = trim((string) ($payload['message'] ?? ''));
$message = str_replace("\r\n", "\n", $message);
$message = str_replace("\r", "\n", $message);
if (strlen($message) > 5000) {
    $message = substr($message, 0, 5000);
}

$allowed = ['business-it', 'smart-home', 'security', 'general', 'ai'];
if (!in_array($interest, $allowed, true)) {
    $interest = 'general';
}
$errors = [];
if ($name === '') {
    $errors['name'] = 'Enter your name.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Enter a valid email address.';
}
if (trim($message) === '') {
    $errors['message'] = 'Enter a message.';
}
if ($errors) {
    cme_json(400, ['ok' => false, 'code' => 'invalid', 'errors' => $errors]);
}

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (cme_limited($ip)) {
    cme_json(429, ['ok' => false, 'code' => 'rejected']);
}

$cfg = cme_config();
if (!cme_configured($cfg)) {
    cme_json(503, ['ok' => false, 'code' => 'unconfigured']);
}

$subjects = [
    'business-it' => 'Business IT',
    'smart-home' => 'Smart Home',
    'security' => 'Security',
    'general' => 'General question',
    'ai' => 'AI',
];
$subject = 'Website inquiry — ' . $subjects[$interest] . ' — ' . $name;
$body = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nInterest: {$subjects[$interest]}\n\n{$message}\n";
if (!cme_smtp($cfg, $email, $subject, $body)) {
    cme_json(502, ['ok' => false, 'code' => 'error']);
}

cme_json(200, ['ok' => true, 'delivered' => true]);
