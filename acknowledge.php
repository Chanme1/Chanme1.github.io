<?php
if(isset($_POST['send'])){
        $to='melissa.chan.1998@gmail.com';
        $subject='Feedback from my site';
}

$message='Name: ' . $_POST['name'] . "\r\n\r\n";
$message .= 'Email: ' . $_POST['email'] . "\r\n\r\n";
$message .= 'Comments: ' . $_POST['comments'];

$success= mail($to, $subject, $message, $headers);
?>

<body>
<?php if (isset($success) && $success) { ?>
<h1>Thank you</h1>
<?php } else { ?>
<h1> Opps! </h1>
<?php } ?>
</body>
