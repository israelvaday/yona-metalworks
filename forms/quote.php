<?php
  /**
  * Quote Request Form Handler
  * מסגריית יונה - טופס בקשת הצעת מחיר
  */

  // Email address to receive quote requests
  $receiving_email_address = '0542666568vc@gmail.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = isset($_POST['email']) && !empty($_POST['email']) ? $_POST['email'] : 'noreply@masgeriya-yona.co.il';
  $contact->subject = 'בקשת הצעת מחיר - ' . (isset($_POST['service']) ? $_POST['service'] : 'כללי');

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( $_POST['name'], 'שם');
  $contact->add_message( $_POST['phone'], 'טלפון');
  $contact->add_message( isset($_POST['email']) ? $_POST['email'] : 'לא צוין', 'אימייל');
  $contact->add_message( isset($_POST['service']) ? $_POST['service'] : '', 'סוג שירות');
  $contact->add_message( isset($_POST['details']) ? $_POST['details'] : '', 'פרטים נוספים', 10);

  echo $contact->send();
?>
