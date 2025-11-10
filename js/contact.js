$(document).ready(function() {
    const savedFormData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
    Object.keys(savedFormData).forEach(id => {
        $(`#${id}`).val(savedFormData[id]);
    });
      
    $('body').css('opacity', '0').animate({ opacity: 1 }, 1000);
    
    $('.page-title, .page-subtitle, .breadcrumb').css({
        'opacity': '0',
        'transform': 'translateY(30px)'
    });
    
    setTimeout(function() {
        $('.page-title').animate({ opacity: 1 }, 600, function() {
            $(this).css('transform', 'translateY(0)');
        });
    }, 200);
    
    setTimeout(function() {
        $('.page-subtitle').animate({ opacity: 1 }, 600, function() {
            $(this).css('transform', 'translateY(0)');
        });
    }, 400);
    
    setTimeout(function() {
        $('.breadcrumb').animate({ opacity: 1 }, 600, function() {
            $(this).css('transform', 'translateY(0)');
        });
    }, 600);
    
    var formAnimated = false;
    $(window).on('scroll', function() {
        var contactForm = $('.contact-form-wrapper');
        if (contactForm.length > 0 && !formAnimated) {
            var elementTop = contactForm.offset().top;
            var elementBottom = elementTop + contactForm.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom - 150) {
                contactForm.css({
                    'opacity': '0',
                    'transform': 'translateX(-50px)'
                }).animate({ opacity: 1 }, 800, function() {
                    $(this).css('transform', 'translateX(0)');
                });
                formAnimated = true;
            }
        }
    });
    
    var infoAnimated = false;
    $(window).on('scroll', function() {
        var contactInfo = $('.contact-info-wrapper');
        if (contactInfo.length > 0 && !infoAnimated) {
            var elementTop = contactInfo.offset().top;
            var elementBottom = elementTop + contactInfo.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom - 150) {

                contactInfo.css({
                    'opacity': '0',
                    'transform': 'translateX(50px)'
                }).animate({ opacity: 1 }, 800, function() {
                    $(this).css('transform', 'translateX(0)');
                });
                
                $('.info-item').each(function(index) {
                    $(this).delay(index * 150).css({
                        'opacity': '0',
                        'transform': 'translateY(20px)'
                    }).animate({ opacity: 1 }, 500, function() {
                        $(this).css('transform', 'translateY(0)');
                    });
                });
                
                infoAnimated = true;
            }
        }
    });
    
    var faqAnimated = false;
    $(window).on('scroll', function() {
        $('.accordion-item').each(function(index) {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (!faqAnimated && elementBottom > viewportTop && elementTop < viewportBottom - 100) {
                $(this).delay(index * 100).css({
                    'opacity': '0',
                    'transform': 'scale(0.95) translateY(20px)'
                }).animate({ opacity: 1 }, 600, function() {
                    $(this).css('transform', 'scale(1) translateY(0)');
                });
            }
        });
        
        if ($('.accordion-item').length > 0) {
            var lastItem = $('.accordion-item').last();
            var lastItemTop = lastItem.offset().top;
            var lastItemBottom = lastItemTop + lastItem.outerHeight();
            
            if (lastItemBottom > $(window).scrollTop() && lastItemTop < $(window).scrollTop() + $(window).height()) {
                faqAnimated = true;
            }
        }
    });
    

    emailjs.init('-herxG1TWayLBbF0P');

    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        var isValid = true;
        var form = $(this)[0];

        $('.form-control').removeClass('is-invalid');

        if ($('#firstName').val().trim() === '') {
            $('#firstName').addClass('is-invalid');
            isValid = false;
        }

        if ($('#lastName').val().trim() === '') {
            $('#lastName').addClass('is-invalid');
            isValid = false;
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test($('#email').val().trim())) {
            $('#email').addClass('is-invalid');
            isValid = false;
        }

        if ($('#service').val() === '') {
            $('#service').addClass('is-invalid');
            isValid = false;
        }

        if ($('#message').val().trim() === '') {
            $('#message').addClass('is-invalid');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                firstName: $('#firstName').val().trim(),
                lastName: $('#lastName').val().trim(),
                email: $('#email').val().trim(),
                service: $('#service').val(),
                message: $('#message').val().trim()
            };

            emailjs.send('service_kjth0eh', 'template_3xoctt3', formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    $('#contactForm').fadeOut(400, function() {
                        $('#successMessage').fadeIn(600);
                    });
                    form.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Failed to send message. Please try again later.');
                });
        } else {
            var firstInvalid = $('.is-invalid').first();
            $('html, body').animate({
                scrollTop: firstInvalid.offset().top - 150
            }, 500);
        }
    });

    $('.form-control').on('input change', function() {
        if ($(this).val().trim() !== '') {
            $(this).removeClass('is-invalid');
        }
        
        const formData = {};
        $('#contactForm .form-control').each(function() {
            const id = $(this).attr('id');
            const value = $(this).val();
            if (id && value) {
                formData[id] = value;
            }
        });
        localStorage.setItem('contactFormData', JSON.stringify(formData));
    });

    $('#email').on('blur', function() {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ($(this).val().trim() !== '' && !emailRegex.test($(this).val().trim())) {
            $(this).addClass('is-invalid');
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
    
    $('.btn-primary-custom').hover(
        function() {
            if (!$(this).prop('disabled')) {
                $(this).stop().animate({
                    paddingLeft: '+=8px',
                    paddingRight: '+=8px'
                }, 200);
            }
        },
        function() {
            if (!$(this).prop('disabled')) {
                $(this).stop().animate({
                    paddingLeft: '-=8px',
                    paddingRight: '-=8px'
                }, 200);
            }
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
        $('.page-header').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
    });
    
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });
    
    var mapAnimated = false;
    $(window).on('scroll', function() {
        var mapSection = $('.map-section');
        if (mapSection.length > 0 && !mapAnimated) {
            var elementTop = mapSection.offset().top;
            var elementBottom = elementTop + mapSection.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom - 200) {
                $('.map-wrapper').css({
                    'opacity': '0',
                    'transform': 'scale(0.95)'
                }).animate({ opacity: 1 }, 800, function() {
                    $(this).css('transform', 'scale(1)');
                });
                mapAnimated = true;
            }
        }
    });
    
    $('.form-control').on('focus', function() {
        $(this).closest('.form-group').find('label').css({
            'color': 'var(--secondary-color)',
            'transform': 'translateY(-2px)'
        });
    });
    
    $('.form-control').on('blur', function() {
        if ($(this).val() === '') {
            $(this).closest('.form-group').find('label').css({
                'color': 'var(--text-dark)',
                'transform': 'translateY(0)'
            });
        }
    });
    
    $('.info-icon').hover(
        function() {
            $(this).css('transform', 'rotateY(180deg)');
        },
        function() {
            $(this).css('transform', 'rotateY(0)');
        }
    );

    console.log('%c Photography - Contact Us ', 'background: #d4af37; color: #1a1a1a; font-size: 24px; font-weight: bold; padding: 15px 30px;');
    console.log('%c We\'d Love to Hear From You 📧 ', 'background: #1a1a1a; color: white; font-size: 14px; padding: 10px;');
    
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
    
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
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