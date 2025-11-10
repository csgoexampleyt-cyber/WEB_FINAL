

$(document).ready(function() {

    $('body').css('opacity', '0').animate({ opacity: 1 }, 800);

    
    $('.service-card').each(function(index) {
        $(this).delay(index * 100).css({
            'opacity': '0',
            'transform': 'translateY(30px)'
        }).animate({
            opacity: 1
        }, 600, function() {
            $(this).css('transform', 'translateY(0)');
        });
    });

    
    $('.service-card').hover(
        function() {
            $(this).find('.service-image img').css('transform', 'scale(1.1)');
            $(this).find('.service-overlay').css('opacity', '1');
        },
        function() {
            $(this).find('.service-image img').css('transform', 'scale(1)');
            $(this).find('.service-overlay').css('opacity', '0');
        }
    );

    
    $('.pricing-card').each(function(index) {
        $(this).delay(index * 150).css({
            'opacity': '0',
            'transform': 'translateY(40px)'
        }).animate({
            opacity: 1
        }, 800, function() {
            $(this).css('transform', 'translateY(0)');
        });
    });

    
    $('.pricing-card:not(.featured)').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-10px)',
                'box-shadow': '0 20px 50px rgba(0,0,0,0.15)',
                'border-color': 'var(--secondary-color)'
            });
        },
        function() {
            $(this).css({
                'transform': 'translateY(0)',
                'box-shadow': 'none',
                'border-color': '#e0e0e0'
            });
        }
    );

    
    $('.accordion-button').on('click', function() {
        $(this).find('i').toggleClass('fa-rotate-180');
    });

    
    $('.accordion-collapse').on('show.bs.collapse', function() {
        $(this).prev().find('.accordion-button').addClass('active');
    }).on('hide.bs.collapse', function() {
        $(this).prev().find('.accordion-button').removeClass('active');
    });

    
    $('.btn-service, .btn-pricing').hover(
        function() {
            $(this).stop().animate({
                'padding-left': '+=10px',
                'padding-right': '+=10px'
            }, 200);
        },
        function() {
            $(this).stop().animate({
                'padding-left': '-=10px',
                'padding-right': '-=10px'
            }, 200);
        }
    );

    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('header').css({
                'padding': '5px 0',
                'box-shadow': '0 5px 30px rgba(0,0,0,0.15)'
            });
            $('.navbar-brand').css('font-size', '1.4rem');
        } else {
            $('header').css({
                'padding': '0',
                'box-shadow': '0 2px 20px rgba(0,0,0,0.08)'
            });
            $('.navbar-brand').css('font-size', '1.6rem');
        }
    });

    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 400) {
            if ($('#scrollTopBtn').length === 0) {
                $('body').append('<button id="scrollTopBtn" title="Back to top"><i class="fas fa-arrow-up"></i></button>');
                $('#scrollTopBtn').hide().fadeIn(400);
            }
        } else {
            $('#scrollTopBtn').fadeOut(400, function() {
                $(this).remove();
            });
        }
    });

    $(document).on('click', '#scrollTopBtn', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    
    $(window).on('scroll', function() {
        $('.service-card:not(.animated), .pricing-card:not(.animated)').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animated').css({
                    'opacity': '0',
                    'transform': 'translateY(40px)'
                }).animate({
                    opacity: 1
                }, 600, function() {
                    $(this).css('transform', 'translateY(0)');
                });
            }
        });
    });

    
    var ctaAnimated = false;
    $(window).on('scroll', function() {
        var ctaSection = $('.cta-section');
        if (ctaSection.length > 0) {
            var elementTop = ctaSection.offset().top;
            var elementBottom = elementTop + ctaSection.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (!ctaAnimated && elementBottom > viewportTop && elementTop < viewportBottom) {
                $('.cta-content h2').css({
                    'opacity': '0',
                    'transform': 'translateY(-30px)'
                }).animate({
                    opacity: 1
                }, 800, function() {
                    $(this).css('transform', 'translateY(0)');
                });

                $('.cta-content p').delay(200).css({
                    'opacity': '0',
                    'transform': 'translateY(30px)'
                }).animate({
                    opacity: 1
                }, 800, function() {
                    $(this).css('transform', 'translateY(0)');
                });

                $('.btn-light-custom').delay(400).css({
                    'opacity': '0',
                    'transform': 'scale(0.8)'
                }).animate({
                    opacity: 1
                }, 600, function() {
                    $(this).css('transform', 'scale(1)');
                });

                ctaAnimated = true;
            }
        }
    });

    
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    
    console.log('%c Luna Photography Services ', 'background: #d4af37; color: #1a1a1a; font-size: 20px; padding: 10px;');
    console.log('%c Book your photography session today! ', 'background: #1a1a1a; color: white; font-size: 14px; padding: 5px;');
});

const scrollBtnStyle = document.createElement('style');
scrollBtnStyle.innerHTML = `
    #scrollTopBtn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 999;
        background: linear-gradient(135deg, #d4af37, #c19a2e);
        color: white;
        border: none;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(212,175,55,0.4);
        transition: all 0.3s ease;
        font-size: 1.2rem;
    }

    #scrollTopBtn:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 35px rgba(212,175,55,0.6);
    }
`;
document.head.appendChild(scrollBtnStyle);
