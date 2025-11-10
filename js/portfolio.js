$(document).ready(function() {

    
    $('body').css('opacity', '0').animate({ opacity: 1 }, 800);

    
    $('.gallery-item').each(function(index) {
        $(this).delay(index * 100).css({
            'opacity': '0',
            'transform': 'translateY(30px)'
        }).animate({
            opacity: 1
        }, 600, function() {
            $(this).css('transform', 'translateY(0)');
        });
    });

    
    $('.filter-btn').on('click', function() {

        $('.filter-btn').removeClass('active');

        $(this).addClass('active');

        
        var filterValue = $(this).data('filter');

        
        $('.gallery-item').each(function() {
            $(this).css({
                'opacity': '0',
                'transform': 'scale(0.8)'
            });
        });

        
        setTimeout(function() {
            if (filterValue === 'all') {
                $('.gallery-item').removeClass('hide');
            } else {
                $('.gallery-item').each(function() {
                    var category = $(this).data('category');
                    if (category !== filterValue) {
                        $(this).addClass('hide');
                    } else {
                        $(this).removeClass('hide');
                    }
                });
            }

            
            $('.gallery-item:not(.hide)').each(function(index) {
                var $item = $(this);
                setTimeout(function() {
                    $item.css({
                        'opacity': '1',
                        'transform': 'scale(1)'
                    });
                }, index * 100);
            });
        }, 400);
    });

    
    $('.view-btn').on('click', function() {
        var imgSrc = $(this).data('img');
        var title = $(this).data('title');
        var description = $(this).data('desc');

        $('#modalImage').attr('src', imgSrc);
        $('#modalTitle').text(title);
        $('#modalDescription').text(description);

        
        $('#modalImage').css('opacity', '0').animate({ opacity: 1 }, 600);
    });

    
    $('.gallery-card').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.2)');
            $(this).find('.gallery-overlay').css('opacity', '1');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
            $(this).find('.gallery-overlay').css('opacity', '0');
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
        $('html, body').animate({ scrollTop: 0 }, 1000);
        return false;
    });

    
    $('.btn-light-custom').hover(
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

    
    $('.filter-btn').on('click', function() {
        $(this).addClass('pulse-effect');
        setTimeout(() => {
            $(this).removeClass('pulse-effect');
        }, 300);
    });

    
    function updateGalleryCount() {
        var visibleItems = $('.gallery-item:not(.hide)').length;
        var totalItems = $('.gallery-item').length;

        if ($('#galleryCount').length === 0) {
            $('.filter-buttons').after('<p id="galleryCount" style="text-align: center; margin-top: 20px; color: #6c757d;"></p>');
        }

        $('#galleryCount').text('Showing ' + visibleItems + ' of ' + totalItems + ' projects');
    }

    
    updateGalleryCount();

    
    $('.filter-btn').on('click', function() {
        setTimeout(updateGalleryCount, 500);
    });

    
    $('.view-btn').hover(
        function() {
            $(this).css('transform', 'rotate(90deg) scale(1.1)');
        },
        function() {
            $(this).css('transform', 'rotate(0deg) scale(1)');
        }
    );

    
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    
    $(window).on('scroll', function() {
        $('.gallery-item:not(.animated)').each(function() {
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

    
    console.log('%c Luna Photography Portfolio ', 'background: #d4af37; color: #1a1a1a; font-size: 20px; padding: 10px;');
    console.log('%c Explore our creative work! ', 'background: #1a1a1a; color: white; font-size: 14px; padding: 5px;');

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

    .pulse-effect {
        animation: pulse 0.3s ease;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(scrollBtnStyle);