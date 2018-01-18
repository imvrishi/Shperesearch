var slideoutRight,
	directory = 'page/', //directory of the content we want to ajax in
	queryString,
	previousType;

function scrollTo( el )
{
	if( el == '' || el == "#" || typeof el === undefined )
		return;
	$el = $(el);
	if( $el.length == 0 )
		return;
	
	$('html, body')
		.stop(true, true)
		.animate(
			{ scrollTop: $el.offset().top },
			1000,
			'easeInQuart',
			function() {
				// console.log( el + ' finished animating' );
			}
		);
}

function readyTree() {
	
	var $window = $(window),
		$fixHeaderNav = $('.fix_header_nav')
		height = 0;
	$window.scroll(function() {
		
		height = $(this).scrollTop() - 200;
		height = Math.min( Math.max( height, 0 ), 60 );
		$fixHeaderNav.css('height', height);
	}).trigger('scroll');
}

function loadHome() {
	
	$('.home-banner-logo').viewportChecker({
		classToAdd: 'animated bounceInDown',
		classToRemove: 'hidden',
		offset: 0,
		callbackFunction: function(elem, action) {
			$('.welcome-text')
				.removeClass('hidden')
				.addClass('animated bounceInUp');
		}
	});
	
	$('.service-welcome-text').viewportChecker({
		classToAdd: 'animated fadeInUp',
		classToRemove: 'hidden',
		offset: 100
	});
}

function readySlick() {
	
	$('.why-choose-us-slider').slick({
		lazyLoad: 'ondemand',
		arrows: false,
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		fade: true,
		customPaging : function(slider, i) {
			return '<a href="#"><span class="slider-custom-dots"></span><span  class="slider-custom-dots active"></span></a>';
		},
	});
	
	var slideIndex, $slick_dots_li_a = $(".slick-dots li a");
	$slick_dots_li_a.click(function(e){
        e.preventDefault();
        slideIndex = $slick_dots_li_a.index( this );
        $( '.why-choose-us-slider' ).slick('slickGoTo', parseInt(slideIndex) );
    });
}

function readySidebar() {
	
	$services = $('div[data-parent="services"]');
	$('[id="services"]').on( 'click', function( e ) {
		$services.slideToggle();
	} ).on('mouseenter', function(event) {
		$services.slideDown();
	} ).on('mouseleave', function(event) {
		$services.slideUp();
	} );
	
	// ================================ //
    // Slideout Right Menu              //
    // ================================ //

    // Slideout Variable
    slideoutRight = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('right-menu'),
		'easing': 'cubic-bezier(.32,2,.55,.27)',
        'side': 'right'
    });

    // Toggle button
    $('#right-nav').click(function() {
        slideoutRight.toggle();
    });
	
	function close(eve) {
		eve.preventDefault();
		slideoutRight.close();
	}

	slideoutRight
		.on('beforeopen', function() {
			this.panel.classList.add('panel-open');
			document.querySelector('.fixed').classList.add('fixed-open-right');
		})
		.on('open', function() {
			this.panel.addEventListener('click', close);
		})
		.on('beforeclose', function() {
			this.panel.classList.remove('panel-open');
			this.panel.removeEventListener('click', close);
			document.querySelector('.fixed').classList.remove('fixed-open-right');
		});
}

function readyPortChecker() {
	
	$('.ch-item').removeClass('hidden').viewportChecker({
		classToAdd: 'animated zoomIn',
		offset: 100
	});
	
	$('.home-about-us').viewportChecker({
		classToAdd: 'animated fadeInUp',
		classToRemove: 'hidden',
		offset: 100
	});
	
	// :nth-child(1n)
	var minIndex,
		windowWidth = $(window).width(),
		serviceCount = 3;
	if( windowWidth <= 1024 )
		serviceCount = 2;
	if( windowWidth <= 560 )
		serviceCount = 1;
	
	$('.single-service').each(function( index, el ) {
		
		minIndex = index % serviceCount;
		$(this).viewportChecker({
			classToAdd: 'animated fadeInUp',
			classToRemove: 'hidden',
			offset: minIndex * 100
		});
	});
	
	$('.why-choose-us > h2, .why-choose-us > .why-choose-us-slider, .home-client-showcase > h2, .home-client-showcase .home-clients-list, .main_foot_div .col-md-4').viewportChecker({
		classToAdd: 'animated fadeInUp',
		classToRemove: 'hidden',
		offset: 100
	});
}

function getCurrentPage( param ) {
	
	var value = 'home';
	if( ! queryString ) queryString = window.location.href.split('?')[1];
	if( queryString ) {
		queryString
			.split('&')
			.some(function(item) {
				return item.split("=")[0] == param && ( value = item.split("=")[1] );
			});
	}
	return value;
}

function ready( window ) {
	
	readySidebar();
	readyHeader();
	callAjax( directory, getCurrentPage( 'route' ), 'statechange' );
}

function load() {
	
}

function callAjax( directory, href, type ) {
	
	if( previousType == 'click' && type == 'statechange' ) {
		previousType = null;
		return false;
	}
	previousType = type;
	
	var jq = $.ajax({
		url: directory + href + '.php', // create the necessary path for our ajax request
		dataType: 'html',
		beforeSend: function() {
			scrollTo('body');
			slideoutRight.close();
			// $('.lds-hourglass').show();
			$('#body-container').html('<div class="lds-hourglass"></div>');
		},
		success: function(data) {
			$('#body-container').append(data); // place our ajaxed content into our content area
			if( type == 'click' ) {
				History.pushState(null, href, 'index.php?route=' + href); // change the url and add our ajax request to our history
			}
			readySlick();
			readyTree();
			readyPortChecker();
			loadHome();
			if ( href == 'home' ) {
				let video = document.querySelector('.home-video');
				let b = setInterval(() => {
					if( video.readyState === 4 ) {
						$('.lds-hourglass').remove();
						clearInterval(b);
						video.addEventListener('ended', function() {
							video.getElementsByTagName('source')[0].src = 'videos/Homepage_Video_002.mp4';
							video.play();
						}, false);
					}
				}, 500);
			} else {
				$('.lds-hourglass').remove();
			}
		}
	});
}

function ajaxifyApp() {
	
	var state = History.getState();
	
	//for when they click on an ajax link
	$(document.body).on('click', 'a:not([href^="#"])', function(e) {
		var $this = $(this);
		var href = $this.attr('href'); // use the href value to determine what content to ajax in
		callAjax( directory, href, 'click' );
		e.preventDefault(); // we don't want the anchor tag to perform its native function
	});

	//for when they hit the back button
	History.Adapter.bind(window, 'statechange', function() {
		state = History.getState(); // find out what we previously ajaxed in
		callAjax( directory, state.title, 'statechange' );
	});
}

function readyHeader() {
	
	$(document.body).on('click', 'a[href^="#"]', function( e ) {
		e.preventDefault();
		scrollTo( $(this).attr('href') );
	} );
	
	ajaxifyApp();
}

( ready )(window);
window.onload = load;