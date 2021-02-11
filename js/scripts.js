$(document).ready(function () {
	$('.burger').click(function(e){
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");

        $('.menu-links').toggleClass('active');
        $('body').on('click', function (e) {
            var div = $('.menu-links, .burger');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('active');
            }
        });
    });

    $('.anchor[href^="#"]').click(function () {
        if($(window).innerWidth() <= 1000) {
           $('.menu-links').removeClass('active'); 
           $('.burger').removeClass('active');
        }
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-150;
        $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
        return false;
    });

    function OpenPopup(popupId) {
        $('body').removeClass('no-scrolling');
        $('.popup').removeClass('js-popup-show');
        popupId = '#' + popupId;
        $(popupId).addClass('js-popup-show');
        $('body').addClass('no-scrolling');
    }
    $('.pop-op').click(function (e) {
        e.preventDefault();
        let data = $(this).data('popup');
        OpenPopup(data);
    });
    function closePopup() {
        $('.js-close-popup').on('click', function (e) {
            e.preventDefault();
            $('.popup').removeClass('js-popup-show');
            $('body').removeClass('no-scrolling');
        });
    }
    closePopup();
    function clickClosePopup(popupId) {
        popupId = '#' + popupId;
        $(popupId).removeClass('js-popup-show');
        $('body').removeClass('no-scrolling');
    }

    $('.table-wrapper').scrollbar();
    $('.faq-wrap').scrollbar();

    function maskInit() {
        $(".phone-mask").inputmask({
            mask:"+7(999)999-99-99",
            "clearIncomplete": true
        });

        $(".card-mask").inputmask({
            mask:"9999-9999-9999-9999",
            "clearIncomplete": true
        });
    }
    maskInit();

    function checkValidate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    name: {
                        required: true 
                    },
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    message: {
                        required: true 
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail'
                } 
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    }
    checkValidate();

    if($('.select').length > 1) {
        $('select').each(function() {
            let $this = $(this).not('.select-search');
            let parent = $(this).not('.select-search').parents('.select');
            $this.select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: parent
            });
        });
        $('.select-search').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                dropdownParent: parent
            });
        });
    } else {
        $('select').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
    }

    // восстановление пароля
    $('#restore-password .btn').click(function(e){
        e.preventDefault();
        if($('#restore-password form').valid()) {
            $('#restore-password .btn').addClass('disabled');
            $('.clock-text, .after-send').show();
            $('.before-send').hide();
            let dt = new Date();
            let time = dt.getFullYear() + '/' + (dt.getMonth()+1) + '/' + dt.getDate() + ' ' + dt.getHours() + ":" + (dt.getMinutes()+1) + ":" + dt.getSeconds();
            $('.clock').parent().show();
            $('.clock').countdown(time)
            .on('update.countdown', function(event) {
                $(this).html(event.strftime('%M:%S'));
            })
            .on('finish.countdown', function(event) {
                $(this).parent().hide();
                $('.after-send').hide();
                $('.before-send').show();
                $('#restore-password .btn').removeClass('disabled');
            });
        }
    });

    function openAccordion() {
        var wrap = $('.accordion-wrap');
        var accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
          var $this = $(this);
          var $parent = $(this).parent();
          var content = $this.next();

          if (content.is(':visible')) {
            $this.removeClass('active');
            $parent.removeClass('active');
            content.slideUp('fast');
          } else {
            $this.addClass('active');
            $parent.addClass('active');
            content.slideDown('fast');
          }

        });
    }
    openAccordion();

    $('.lk-prizes-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false
    });

    $('.superwinner-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1281,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    if($(window).innerWidth() < 1000) {
        $('.products-title').one('click', function() {
            $(this).parent().find('.products-list').slick({
                dots: false,
                arrows: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1
            });
        });
    }

    $('.popup-prize').click(function() {
        $('.popup-prize').removeClass('active');
        $(this).addClass('active');
        $('.choose-prize-form .btn').removeClass('disabled');
    });

    if($('.dropify').length) {
        $('.dropify').dropify({
            tpl: {
                clearButton: '<button type="button" class="dropify-clear">X</button>'
            }
        });
    }

});

ymaps.ready(mapInit);

function mapInit () {
    var myMap = new ymaps.Map('map', {
            center: [56.83, 60.59],
            zoom: 5,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        }),

        myPlacemarkWithContent1 = new ymaps.Placemark([54.661574, 36.573856], {
            balloonContentHeader: '<img src="/img/seryabkina.svg" class="seryabkina-mark" alt="seryabkina-mark"/><br><br> Заголовок метки 1',
            balloonContent: 'Интересный дизайн и ландшафт, со сменной растительности для разных климатических полос. Четыре климатические зоны России - смешанный лес, северный ландшафт, степь и заливные луга. Над Москворецкой набережной и Москвой-рекой словно летит воздушная конструкция в виде буквы «V». Это уникальный мост, единственный в России - у него 70-метровая консоль без единой опоры. В парке представлена одна из крупнейших открытых площадок для концертов, шоу и спектаклей. Так же можно посетить такие места как: «Ледяная пещера», подземный музей «Зарядье», Многофункциональный «Медиацентр». Есть детские площадки, водоёмы с карпами, рестораны, подземный паркинг.',
            hintContent: 'Заголовок метки 1'
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'img/superpin.svg',
            iconImageSize: [42, 56],
            iconImageOffset: [-24, -24],
            iconContentOffset: [15, 15]
        }),

        myPlacemarkWithContent2 = new ymaps.Placemark([55.661574, 37.573856], {
            balloonContentHeader: '<img src="/img/seryabkina.svg" class="seryabkina-mark" alt="seryabkina-mark"/><br><br> Заголовок метки 2',
            balloonContent: 'Интересный дизайн и ландшафт, со сменной растительности для разных климатических полос. Четыре климатические зоны России - смешанный лес, северный ландшафт, степь и заливные луга. Над Москворецкой набережной и Москвой-рекой словно летит воздушная конструкция в виде буквы «V». Это уникальный мост, единственный в России - у него 70-метровая консоль без единой опоры. В парке представлена одна из крупнейших открытых площадок для концертов, шоу и спектаклей. Так же можно посетить такие места как: «Ледяная пещера», подземный музей «Зарядье», Многофункциональный «Медиацентр». Есть детские площадки, водоёмы с карпами, рестораны, подземный паркинг.',
            hintContent: 'Заголовок метки 2'
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'img/superpin.svg',
            iconImageSize: [42, 56],
            iconImageOffset: [-24, -24],
            iconContentOffset: [15, 15]
        });

        myPlacemarkWithContent3 = new ymaps.Placemark([57.661574, 39.573856], {
            balloonContentHeader: '<img src="/img/seryabkina.svg" class="seryabkina-mark" alt="seryabkina-mark"/><br><br> Заголовок метки 3',
            balloonContent: 'Интересный дизайн и ландшафт, со сменной растительности для разных климатических полос. Четыре климатические зоны России - смешанный лес, северный ландшафт, степь и заливные луга. Над Москворецкой набережной и Москвой-рекой словно летит воздушная конструкция в виде буквы «V». Это уникальный мост, единственный в России - у него 70-метровая консоль без единой опоры. В парке представлена одна из крупнейших открытых площадок для концертов, шоу и спектаклей. Так же можно посетить такие места как: «Ледяная пещера», подземный музей «Зарядье», Многофункциональный «Медиацентр». Есть детские площадки, водоёмы с карпами, рестораны, подземный паркинг.',
            hintContent: 'Заголовок метки 3'
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'img/superpin.svg',
            iconImageSize: [42, 56],
            iconImageOffset: [-24, -24],
            iconContentOffset: [15, 15]
        });

        objectManager = new ymaps.ObjectManager({
            clusterize: true,
            gridSize: 32,
            clusterDisableClickZoom: true
        });

    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    myMap.geoObjects.add(objectManager);
    myMap.geoObjects
            .add(myPlacemarkWithContent1)
            .add(myPlacemarkWithContent2)
            .add(myPlacemarkWithContent3);
    myMap.behaviors.disable('scrollZoom');
    myMap.controls.add('zoomControl');

    $.ajax({
        url: "/data.json"
    }).done(function(data) {
        objectManager.add(data);
    });

}