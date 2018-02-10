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

    $('.qualitative .single-service').each(function (index, el) {

        minIndex = index % serviceCount;
        if (minIndex == 0) {
            animation = 'fadeInLeft';
        } else if (minIndex + 1 == serviceCount) {
            animation = 'fadeInRight';
        } else {
            animation = 'fadeInUp';
        }
        $(this).viewportChecker({
            classToAdd: `animated ${animation}`,
            classToRemove: 'hidden',
            offset: 100
        });
    });

    $('.quantitative .single-service').each(function (index, el) {

        $(this).viewportChecker({
            classToAdd: 'animated fadeIn',
            classToRemove: 'hidden',
            offset: 100
        });
    });

    $('.why-choose-us h2, .why-choose-us .why-choose-us-slider, .home-client-showcase > h2, .home-client-showcase .home-clients-list, .main_foot_div .col-md-4, .home-expertise, .home-about-us h1, .home-about-us .home-about-us-info').viewportChecker({
        classToAdd: 'animated fadeInUp',
        classToRemove: 'hidden',
        offset: 100
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
}

function highlightMenu(href) {

    $('.sidenav .menu-list').removeClass('active');
    $('a[href="' + href + '"] .menu-list').addClass('active');
}

function jsUcfirst(title) {

    return title.charAt(0).toUpperCase() + title.slice(1) + ' | Spheresearch';
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
                History.pushState(null, jsUcfirst(href), 'index.php?route=' + href);
                // change the url and add our ajax request to our history
            }
            readyCarousel();
            readyPortChecker();
            loadHome();
            readyTabs();
            alignElements();
            highlightMenu(href);
            if (href == 'home') {
                video = document.querySelector('.home-video');
                let b = setInterval(() => {
                    if(video.readyState === 4
            )
                {
                    $('#preloader').hide();
                    clearInterval(b);
                    video.addEventListener('ended', playVideo, false);
                }
            },
                500
            )
                ;
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