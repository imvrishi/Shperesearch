var slideoutRight,
    directory = 'page/', //directory of the content we want to ajax in
    queryString,
    previousType;

function scrollTo(el) {
    if (el === '' || el === "#" || typeof el === undefined)
        return;
    $el = $(el);
    if ($el.length === 0)
        return;

    $('html, body')
        .stop(true, true)
        .animate(
            {scrollTop: $el.offset().top},
            1000,
            'easeInQuart',
            function () {
                // console.log( el + ' finished animating' );
            }
        );
}

function loadHome() {

    $('.home-banner-logo').viewportChecker({
        classToAdd: 'animated bounceInDown',
        classToRemove: 'hidden',
        offset: 0,
        callbackFunction: function (elem, action) {
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

function readyCarousel() {

    $('.owl-carousel').owlCarousel({
        animateOut: 'zoomOutLeft',
        animateIn: 'zoomInRight',
        items: 1,
        margin: 30,
        stagePadding: 30,
        smartSpeed: 450,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        touchDrag: false,
        mouseDrag: false
    });
}

function readySidebar() {

    /*$services = $('div[data-parent="services"]');
    $('[id="services"]').on( 'click', function( e ) {
        $services.slideToggle();
    } ).on('mouseenter', function(event) {
        $services.slideDown();
    } ).on('mouseleave', function(event) {
        $services.slideUp();
    } );*/

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
    $('#right-nav').click(function () {
        slideoutRight.toggle();
    });

    function close(eve) {
        eve.preventDefault();
        slideoutRight.close();
    }

    slideoutRight
        .on('beforeopen', function () {
            this.panel.classList.add('panel-open');
            document.querySelector('.fixed').classList.add('fixed-open-right');
        })
        .on('open', function () {
            this.panel.addEventListener('click', close);
        })
        .on('beforeclose', function () {
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
    if (windowWidth <= 1024)
        serviceCount = 2;
    if (windowWidth <= 560)
        serviceCount = 1;
    let animation;

    $('.quantitative .single-service, .qualitative .single-service').each(function (index, el) {

        minIndex = index % serviceCount;
        if (minIndex == 0) {
            animation = 'fadeInLeft';
        } else if (minIndex + 1 == serviceCount) {
            animation = 'fadeInRight';
        } else {
            animation = 'fadeInUp';
        }
        $(this).viewportChecker({
            classToAdd: `animated20 ${animation}`,
            classToRemove: 'hidden',
            offset: 100
        });
    });

    $('.main_foot_div .col-md-6, .home-expertise').each(function (index, el) {

        $(this).viewportChecker({
            classToAdd: 'animated15 fadeIn',
            classToRemove: 'hidden',
            offset: 300
        });
    });

    $('.why-choose-us h2, .why-choose-us .why-choose-us-slider, .home-client-showcase > h2, .home-client-showcase .home-clients-list, .home-about-us h1, .home-about-us .home-about-us-info').viewportChecker({
        classToAdd: 'animated fadeInUp',
        classToRemove: 'hidden',
        offset: 300
    });
}

function getCurrentPage(param) {

    var value = 'home';
    queryString = window.location.href.split('?')[1];
    if (queryString) {
        queryString
            .split('&')
            .some(function (item) {
                return item.split("=")[0] == param && (value = item.split("=")[1]);
            });
    }
    return value;
}

function ready(window) {

    readySidebar();
    readyHeader();
    callAjax(directory, getCurrentPage('route'), 'statechange');
}

function attachHeader() {

    var $window = $(window),
        $sidebar = $('#sidebar'),
        $footer = $('.footer');

    let $fixedSidebar = $sidebar.clone();
    $fixedSidebar.addClass('hidden fixed');
    $sidebar.after($fixedSidebar);

    $window.scroll(function () {

        if ($window.scrollTop() >= 50) {
            $fixedSidebar.removeClass('hidden none');
            $fixedSidebar.addClass('animated15 fadeInDown');
            $footer.removeClass('hidden none');
            $footer.addClass('animated15 fadeInUp');
        } else {
            $fixedSidebar.removeClass('animated15 fadeInDown');
            $fixedSidebar.addClass('hidden none');
            $footer.addClass('hidden none');
            $footer.removeClass('animated15 fadeInUp');
        }
    }).trigger('scroll');
}

function readyTabs() {

    $(".home-expertise-info").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $(".home-expertise-info li").removeClass("ui-corner-top").addClass("ui-corner-left");

    $('.table-tab-a').click(function (event) {

        let target = $(this).attr('data-target');
        $(this).siblings('a').each(function (index, el) {
            let starget = $(this).attr('data-target');
            $(starget).hide();
        });
        $(target).show();
    });
    $('[data-target=".india"]').trigger('click');
}

function load() {
    attachHeader();
}

function alignElements() {

    let screenWidth = $(window).width();
    let containerWidth = 1200;
    let left = (containerWidth - screenWidth) / 2;
    $('.home-banner video').css('left', left).css('width', screenWidth);

    $('.customZoom').css('transform', 'scale(1.6)');
    setTimeout(() => {
        $('.intro').addClass('go');
    }, 500);

    var app = document.querySelector('.typewriter');
    if ( app ) {
        let text = app.innerHTML;
        var typewriter = new Typewriter(app, {loop: false});
        typewriter.typeString(text).start();
    }
}

function highlightMenu(href) {

    $('.sidenav .menu-list').removeClass('active');
    $('a[href="' + href + '"] .menu-list').addClass('active');
}

function changeDescription(href) {

    let title = 'Spheresearch | Market Research | Management Consultancy';
    let description = 'Spheresearch is a research and management consultancy to some of the leading research, data and insights businesses in worldwide markets. We undertake any specific stage of the market research process.';
    let keywords = 'market research companies,fieldwork,customer survey,survey sampling,paid surveys,market survey,online market research,market research participant,niche field,healthcare online research,healthcare survey,healthcare field research,healthcare research recruitment,healthcare market,qualitative research,recruitment agencies,market research london,market researcher,nielsen survey,ipsos,gfk,tns,kantar,millward brown,dunnhumby,tkl research';
    switch( href ) {

        case 'home':
            title = 'Spheresearch | Market Research | Management Consultancy';
            description = 'Spheresearch is a research and management consultancy to some of the leading research, data and insights businesses in worldwide markets. We undertake any specific stage of the market research process.';
            keywords = 'market research companies,fieldwork,customer survey,survey sampling,paid surveys,market survey,online market research,market research participant,niche field,healthcare online research,healthcare survey,healthcare field research,healthcare research recruitment,healthcare market,qualitative research,recruitment agencies,market research london,market researcher,nielsen survey,ipsos,gfk,tns,kantar,millward brown,dunnhumby,tkl research';
            break;
        case 'qualitative':
            title = 'Qualitative Market Research Services | Spheresearch';
            description = 'We have performed several qualitative studies providing insights using data collection methods such as focus groups (group discussions), triads, dyads, in-depth interviews, uninterrupted observation, bulletin boards, and ethnographic participation/observation.';
            keywords = 'face to face,in depth interview,focus recruitment,online focus groups,interviewer,ethnography,ethnographic research methods,ethnographic study,ethnography study,in depth,market research methods';
            break;
        case 'quantitative':
            title = 'Quantitative Market Research Services | Spheresearch';
            description = 'We have performed several quantitative studies by way of generating data through surveys in different modalities (online, phone, paper), face-to- face interviews, telephonic interviews, longitudinal studies, website interceptors, online polls, and systematic observations.';
            keywords = 'online surveys,interview questions,interview techniques,paid online surveys,phone interview questions,competency based interview questions,consumer behaviour,eye tracking,mystery shopping,car clinic';
            break;
        case 'industries':
            title = 'Research Industries | Spheresearch';
            description = 'We are able to field quantitative and qualitative projects according to your requirements while bringing our methodological competence. Our primary focus is in the area of US, UK and Europe but we are also capable of conducting research in Middle East and other countries.';
            keywords = 'healthcare market research,pharmaceutical market research,banking market research,finance market research,fashion market research,travel market research,tourism market research,hospitality market research,electronics market research, telecommunication market research,information technology market research,f&b market research,energy market research,real estate market research,fmcg market research,education market research';
            break;
        case 'associate':
            title = 'Associate | Spheresearch';
            description = '';
            keywords = '';
            break;
        case 'careers':
            title = 'Careers | Spheresearch';
            description = '';
            keywords = '';
            break;
        case 'contact-us':
            title = 'Contact Us | Spheresearch';
            description = 'We undertake any specific stage of the market research process. You’ve got questions, and we have answers. Just send us a message and one of our knowledgeable support staff will be in contact with you within 48hrs – even on weekends and holidays.';
            keywords = 'casro,esomar,green book,gobal research business network,group discussion,focus group research,paid qualitative research,paid quantitative research,paid focus groups,cati,cawi,capi,papi,wati,wapi,f2f,fgd,vrt,tracking study,descriptive analysis,competitive intelligence,field trials,global market research,market research services';
            break;
    }
    $('title').text( title );
    $('meta[name="description"]').attr( 'content', description );
    $('meta[name="keywords"]').attr( 'content', keywords );
}

function submitContactForm() {
    
    $('#contact-form-submit-btn').click(function(e) {
        
        let data = {};
        data.contact_form_message = $('#contact-form-message').val();
        data.contact_form_name = $('#contact-form-name').val();
        data.contact_form_email = $('#contact-form-email').val();
        data.contact_form_subject = $('#contact-form-subject').val();

        $.ajax({
            url: 'common/contact_us_mail.php',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (r) {
                if ( r.success == true ) {
                    $('#contact-mail-errors').html( 'Your message has been send to the team u will receive the response within 2 business days.' ).addClass('green');
                } else {
                    $('#contact-mail-errors').html( r.errors ).addClass('red');
                }
            }
        });
        
    });
}

let video;

function callAjax(directory, href, type) {

    if (previousType == 'click' && type == 'statechange') {
        previousType = null;
        return false;
    }
    previousType = type;

    var jq = $.ajax({
        url: directory + href + '.php', // create the necessary path for our ajax request
        dataType: 'html',
        beforeSend: function () {
            scrollTo('body');
            slideoutRight.close();
            $('#preloader').show();
            // $('.lds-hourglass').show();
            // $('#body-container').html('<div class="lds-hourglass"></div>');
        },
        success: function (data) {
            $('#body-container').html(data); // place our ajaxed content into our content area
            if (type == 'click') {
                History.pushState(null, href, 'index.php?route=' + href);
                // change the url and add our ajax request to our history
            }
            changeDescription( href );
            readyCarousel();
            readyPortChecker();
            loadHome();
            readyTabs();
            alignElements();
            highlightMenu(href);
            submitContactForm();
            if (href == 'home') {
                $('.home-hidden').css('display', 'none');
                video = document.querySelector('.home-video');
                let b = setInterval(() => {
                    if(video.readyState === 4)
                    {
                        $('#preloader').hide();
                        clearInterval(b);
                        video.addEventListener('ended', playVideo, false);
                    }
                }, 500);
            } else {
                $('#preloader').hide();
            }
        },
        error: function () {
            $('#preloader').hide();
        }
    });
}

function playVideo() {
    video.getElementsByTagName('source')[0].src = 'videos/Homepage_Video_002.mp4';
    video.load();
    video.play();
    video.setAttribute('loop', true);
    video.removeEventListener('ended', playVideo);
    $('#sidebar').css('display', '').addClass('animated15 fadeInDown');
    $('.home-hidden').css('display', '');
}

function ajaxifyApp() {

    let state = History.getState();

    //for when they click on an ajax link
    $(document.body).on('click', 'a:not([href^="#"])', function (e) {
        let $this = $(this);
        let href = $this.attr('href'); // use the href value to determine what content to ajax in
        let currentPage = getCurrentPage('route');
        if (href != currentPage)
            callAjax(directory, href, 'click');
        e.preventDefault(); // we don't want the anchor tag to perform its native function
    });

    //for when they hit the back button
    History.Adapter.bind(window, 'statechange', function () {
        state = History.getState(); // find out what we previously ajaxed in
        callAjax(directory, state.title, 'statechange');
    });
}

function readyHeader() {

    $(document.body).on('click', 'a[href^="#"]:not(.ui-tabs-anchor)', function (e) {
        e.preventDefault();
        scrollTo($(this).attr('href'));
    });

    ajaxifyApp();
}

(ready)(window);
window.onload = load;