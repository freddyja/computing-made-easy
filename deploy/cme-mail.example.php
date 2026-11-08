<?php
/**
 * Example only. Copy outside the web root, or point CME_MAIL_CONFIG at the copy.
 * Leave password empty. Do not put a mailbox password or an IONOS panel login in
 * this file, in git, or in a zip. An empty password keeps contact-submit.php
 * unconfigured, so this example does not send mail.
 *
 * The script always delivers to contactus@computingmadeeasy.org. A `to` value
 * here is ignored. The visitor address is Reply-To only. Pages still show
 * freddy@computingmadeeasy.org as the public business email.
 *
 * Host, port, encryption, username, and From below are the non-secret settings
 * for that existing mailbox. They are not a deployed server config.
 */
return [
    'host' => 'smtp.ionos.com',
    'port' => 587,
    'encryption' => 'starttls',
    'user' => 'contactus@computingmadeeasy.org',
    'password' => '',
    'from' => 'contactus@computingmadeeasy.org',
];
