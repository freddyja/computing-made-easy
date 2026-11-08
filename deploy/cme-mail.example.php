<?php
/**
 * Example only. Copy to a path outside the web root, for example ../private/cme-mail.php,
 * or set CME_MAIL_CONFIG to that file. Leave the real password off this example and out of git.
 * An empty user or password keeps contact-submit.php in the unconfigured state.
 */
return [
    'host' => 'smtp.example.com',
    'port' => 587,
    'encryption' => 'starttls',
    'user' => '',
    'password' => '',
    'from' => 'freddy@computingmadeeasy.org',
    'to' => 'freddy@computingmadeeasy.org',
];
