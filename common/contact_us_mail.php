<?php 
$errors = [];
$myemail = 'hello@spheresearch.com'; // <-----Put Your email address here.
$post = filter_var_array( $_POST, FILTER_SANITIZE_STRING );
$success = false;
if(empty($post['contact_form_message'])  ||
    empty($post['contact_form_name'])  ||
	empty($post['contact_form_email']) || 
	empty($post['contact_form_subject']) )
{
    $errors[] = "Error: all fields are required";
}

$message = $post['contact_form_message']; 
$name = $post['contact_form_name']; 
$email_address = $post['contact_form_email']; 
$subject = $post['contact_form_subject']; 

if ( ! preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $email_address) )
{
    $errors[] = "Error: Invalid email address";
}

if( empty($errors))
{
	$to = $myemail;
	
	$headers = "From: $myemail\n"; 
	$headers .= "Reply-To: $email_address";

	if( ! @mail( $to, $subject, $message, $headers ) )
	{
		$errors[] = "Error: Could not send mail please try again later.";
	}
	else
	{
		$success = true;
	}
	//redirect to the 'thank you' page
	// header('Location: contact-form-thank-you.html');
}
if ( ! empty( $errors ) ) {
	$errors = implode( "<br/>", $errors );
}
echo json_encode( compact( 'success', 'errors' ) );