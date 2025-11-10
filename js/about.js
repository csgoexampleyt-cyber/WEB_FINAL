

$(document).ready(function() {

    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    
    $('a.nav-link, .footer-links a').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800);
        }
    });

    
    function animateCounter() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = $this.attr('data-count');

            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    
    function checkCounterVisibility() {
        const statisticsSection = $('.statistics');
        const statisticsPosition = statisticsSection.offset().top;
        const screenPosition = $(window).scrollTop() + $(window).height();

        if (screenPosition > statisticsPosition + 100) {
            animateCounter();
            $(window).off('scroll', checkCounterVisibility);
        }
    }

    
    $(window).scroll(checkCounterVisibility);

    
    $('.team-card').hover(
        function() {
            $(this).find('.team-social').stop(true, true).css('transform', 'translateY(0)');
        },
        function() {
            $(this).find('.team-social').stop(true, true).css('transform', 'translateY(100%)');
        }
    );

    
    $('.mission-box, .vision-box').hover(
        function() {
            $(this).find('.mission-icon, .vision-icon').css('transform', 'rotateY(360deg)');
        },
        function() {
            $(this).find('.mission-icon, .vision-icon').css('transform', 'rotateY(0)');
        }
    );

    
    $('.feature-box').hover(
        function() {
            $(this).find('.feature-icon').css('transform', 'rotateY(360deg)');
        },
        function() {
            $(this).find('.feature-icon').css('transform', 'rotateY(0)');
        }
    );

    
    function lazyLoadImages() {
        $('img').each(function() {
            if ($(this).offset().top < $(window).height() + $(window).scrollTop()) {
                const src = $(this).attr('data-src');
                if (src) {
                    $(this).attr('src', src).removeAttr('data-src');
                }
            }
        });
    }

    
    $(window).on('scroll', lazyLoadImages);
    lazyLoadImages(); 

    
    function highlightActiveNav() {
        const scrollPos = $(document).scrollTop();

        $('.nav-link').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));

            if (refElement.position().top <= scrollPos + 100 && 
                refElement.position().top + refElement.height() > scrollPos + 100) {
                $('.nav-link').removeClass('active');
                currLink.addClass('active');
            }
        });
    }

    $(window).scroll(highlightActiveNav);

    
    function animateOnScroll() {
        $('.feature-box, .team-card, .mission-box, .vision-box').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    }

    
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .feature-box, .team-card, .mission-box, .vision-box {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            .feature-box.animate-in, 
            .team-card.animate-in, 
            .mission-box.animate-in, 
            .vision-box.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `)
        .appendTo('head');

    $(window).scroll(animateOnScroll);
    animateOnScroll(); 

    
    $('.navbar-toggler').on('click', function() {
        $('.navbar-collapse').toggleClass('show');
    });

    
    $('.navbar-nav .nav-link').on('click', function() {
        $('.navbar-collapse').removeClass('show');
    });

    
    $('.social-links a').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-3px)',
                'background': '#d4af37'
            });
        },
        function() {
            $(this).css({
                'transform': 'translateY(0)',
                'background': 'rgba(255,255,255,0.1)'
            });
        }
    );

    
    $('.btn-light-custom').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-3px)',
                'box-shadow': '0 15px 35px rgba(255,255,255,0.3)'
            });
        },
        function() {
            $(this).css({
                'transform': 'translateY(0)',
                'box-shadow': 'none'
            });
        }
    );

    
    function initPreloader() {
        $('body').prepend(`
            <div id="preloader">
                <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `);

        $('#preloader').css({
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'background': '#1a1a1a',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'z-index': '9999'
        });

        $(window).on('load', function() {
            setTimeout(function() {
                $('#preloader').fadeOut(500, function() {
                    $(this).remove();
                });
            }, 1000);
        });
    }

    

    
    console.log('About page jQuery initialized successfully');

});

$(window).resize(function() {

    $('.feature-box, .team-card, .mission-box, .vision-box').removeClass('animate-in');
    setTimeout(function() {
        $(window).trigger('scroll');
    }, 100);
});