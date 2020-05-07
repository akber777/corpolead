$(document).ready(function () {



    $('.teqdimat_teleb ').click(function (event) {

        event.preventDefault();

        $('.backgroundTeqdimat').fadeIn();

        $('body').css({

            overflow: 'hidden'

        })


    })


    $('.fancybox-close').click(function (event) {

        event.preventDefault();

        $('.backgroundTeqdimat').fadeOut();

        $('body').css({

            overflow: 'unset'

        })

    })



    $(".js-example-tags").select2({
        tags: false,
        minimumResultsForSearch: -1
    });



    $(window).scroll(function () {


        let x = $(window).scrollTop();


        if (x > 125) {
            $('header').addClass('fixedHeader');
        } else {
            $('header').removeClass('fixedHeader')
        }


    })


    $('.myOwl').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })


    $('body').overlayScrollbars({});


    $('.myOwl .owl-stage-outer').overlayScrollbars({});

})





