<?php
/**
 * Example only. Copy to a path outside the web root, for example ../private/cme-mail.php,
 * or set CME_MAIL_CONFIG to that file. Leave the real password off this example and out of git.
 * An empty user or password keeps contact-submit.php in the unconfigured state.
 *
 * The script always delivers to fjarmonte@gmail.com. A `to` value in this file is ignored.
 * The visitor's address is Reply-To only. freddy@computingmadeeasy.org remains the public
 * business address and the default envelope sender.
 */
return [
    'host' => 'smtp.example.com',
    'port' => 587,
    'encryption' => 'starttls',
    'user' => '',
    'password' => '',
    'from' => 'freddy@computingmadeeasy.org',
];
