<div class ="contact-top-banner">
	<div class="meeting-img"></div>
	<div class="meeting-container">
		<div class="row">

			<div id="map"></div>

			<div class="col-sm-9">
				<h3 class="meeting-title">We Are Eager To Hear From You</h3>
				<div class="simple_line contacted"></div>
				<div class="contact-inquiry">You’ve got questions, and we have answers. Just send us a message and one of our knowledgeable support staff will be in contact with you within 48hrs – even on weekends and holidays.</div>
				<form action="#" id="contact-form" method="post">
					<textarea class="col-sm-12 contact-form-message form-control" name="contact-form-message" id="contact-form-message" rows="8" placeholder="Your message"></textarea>
					<input type="text" class="col-sm-4 contact-form-name col-sm-4" name="contact-form-name" id="contact-form-name" placeholder="Name (required)">
					<input type="text" class="col-sm-4 contact-form-email col-sm-4" name="contact-form-email" id="contact-form-email" placeholder="Email (required)">
					<input type="text" class="col-sm-4 contact-form-subject col-sm-4" name="contact-form-subject" id="contact-form-subject" placeholder="Subject">
					<div id="contact-form-submit" class="contact-form-submit1 "><a href="#" data-alt-text="Send Message →" class="btnsub">Send Message →</a></div>
				</form>
				<br/><br/>
			</div>
			<div class="col-sm-3">
				<h3 class="meeting-title">Address</h3>
				<div class="simple_line contacted"></div>
				<div class="address-desc">
					Headquarters for ASIA region:
					Mumbai, Thane, India.
					<br/><br/>
					Headquarters Latin America:
					Satélite, Mexico City, México.
				</div>
				<br/>
				<h3 class="meeting-title">Our email</h3>
				info@agapemr.com
				<br/>
				support@agapemr.com
				<br/><br/><br/><br/><br/>
			</div>
		</div>
	</div>
</div>

<?php include( '../common/newsletter.php' ); ?>
<script>
  function initMap() {
    var uluru = {lat: 19.292320, lng: 72.872778};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBoErqJClLAUt2HQI1--dnLLulnwU1Ov3k&callback=initMap"></script>