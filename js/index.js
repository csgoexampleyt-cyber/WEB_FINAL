$(document).ready(function() {

    
    $('body').css('opacity', '0').animate({ opacity: 1 }, 1000);

    
    function animateCounter() {
        $('.stat-item h3').each(function() {
            var $this = $(this);
            var countTo = parseInt($this.text().replace('+', ''));

            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum) + '+');
                },
                complete: function() {
                    $this.text(countTo + '+');
                }
            });
        });
    }

    
    var counterAnimated = false;
    $(window).on('scroll', function() {
        var statsTop = $('.hero-stats').offset().top;
        var statsBottom = statsTop + $('.hero-stats').outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        if (!counterAnimated && statsBottom > viewportTop && statsTop < viewportBottom) {
            animateCounter();
            counterAnimated = true;
        }
    });

    
    $(window).on('scroll', function() {
        $('.service-box').each(function(index) {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).delay(index * 150).css({
                    'opacity': '0',
                    'transform': 'translateY(30px)'
                }).animate({
                    opacity: 1
                }, 600, function() {
                    $(this).css('transform', 'translateY(0)');
                });
            }
        });
    });

    
    $('.portfolio-card').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.15)');
            $(this).find('.portfolio-overlay').css('transform', 'translateY(0)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
            $(this).find('.portfolio-overlay').css('transform', 'translateY(100%)');
        }
    );

    
    var testimonialsAnimated = false;
    $(window).on('scroll', function() {
        $('.testimonial-card').each(function(index) {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (!testimonialsAnimated && elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).delay(index * 200).css({
                    'opacity': '0',
                    'transform': 'scale(0.9)'
                }).animate({
                    opacity: 1
                }, 500, function() {
                    $(this).css('transform', 'scale(1)');
                });
            }
        });

        if ($('.testimonial-card').length > 0) {
            var lastCard = $('.testimonial-card').last();
            var lastCardTop = lastCard.offset().top;
            var lastCardBottom = lastCardTop + lastCard.outerHeight();

            if (lastCardBottom > viewportTop && lastCardTop < viewportBottom) {
                testimonialsAnimated = true;
            }
        }
    });

    
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

    
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);

        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 1000, 'swing');
        }
    });

    
    $('.btn-primary-custom, .btn-outline-light-custom, .btn-outline-dark-custom, .btn-light-custom').hover(
        function() {
            $(this).stop().animate({
                paddingLeft: '+=8px',
                paddingRight: '+=8px'
            }, 200);
        },
        function() {
            $(this).stop().animate({
                paddingLeft: '-=8px',
                paddingRight: '-=8px'
            }, 200);
        }
    );

    
    $('.service-link').hover(
        function() {
            $(this).find('i').css('transform', 'translateX(5px)');
        },
        function() {
            $(this).find('i').css('transform', 'translateX(0)');
        }
    );

    
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
        $('html, body').animate({ scrollTop: 0 }, 1000);
        return false;
    });

    
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        $('.hero').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
    });

    
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    
    var aboutImageAnimated = false;
    $(window).on('scroll', function() {
        var imageWrapper = $('.about-image-wrapper');
        if (imageWrapper.length > 0) {
            var elementTop = imageWrapper.offset().top;
            var elementBottom = elementTop + imageWrapper.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (!aboutImageAnimated && elementBottom > viewportTop && elementTop < viewportBottom) {
                imageWrapper.find('img').css({
                    'opacity': '0',
                    'transform': 'scale(0.8)'
                }).animate({
                    opacity: 1
                }, 800, function() {
                    $(this).css('transform', 'scale(1)');
                });

                $('.experience-badge').delay(400).css({
                    'opacity': '0',
                    'transform': 'scale(0)'
                }).animate({
                    opacity: 1
                }, 600, function() {
                    $(this).css('transform', 'scale(1)');
                });

                aboutImageAnimated = true;
            }
        }
    });

    
    var checkListAnimated = false;
    $(window).on('scroll', function() {
        $('.check-list li').each(function(index) {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (!checkListAnimated && elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).delay(index * 100).css({
                    'opacity': '0',
                    'transform': 'translateX(-20px)'
                }).animate({
                    opacity: 1
                }, 400, function() {
                    $(this).css('transform', 'translateX(0)');
                });
            }
        });

        if ($('.check-list li').length > 0) {
            var lastItem = $('.check-list li').last();
            var lastItemTop = lastItem.offset().top;
            var lastItemBottom = lastItemTop + lastItem.outerHeight();

            if (lastItemBottom > $(window).scrollTop() && lastItemTop < $(window).scrollTop() + $(window).height()) {
                checkListAnimated = true;
            }
        }
    });

    
    console.log('%c Luna Photography ', 'background: #d4af37; color: #1a1a1a; font-size: 24px; font-weight: bold; padding: 15px 30px;');
    console.log('%c Capturing Moments, Creating Memories ✨ ', 'background: #1a1a1a; color: white; font-size: 14px; padding: 10px;');

});

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
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