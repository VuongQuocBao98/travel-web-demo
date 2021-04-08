$(function () {
  new WOW().init();
});

$(document).ready(function () {
  $(window).scroll(function (event) {
    if ($(this).scrollTop()) {
      $("header").addClass("header-scroll");
    } else {
      $("header").removeClass("header-scroll");
    }

    var a = $(this).scrollTop();

    // 0-250
    // 410-950

    if (a >= 0 && a <= 250) {
      $("#author1").addClass("rollIn");
      $("#author2").addClass("hinge");
      $("#author3").addClass("bounceInDown center");
    } else {
      $("#author1").removeClass("rollIn");
      $("#author2").removeClass("hinge");
      $("#author3").removeClass("bounceInDown center");
    }

    // Slide post

    if (a >= 330 && a <= 1100) {
      $("#side-post-content").addClass("slideInLeft");
    } else {
      $("#side-post-content").removeClass("slideInLeft");
    }

    // travel icon plan
    if (a >= 750 && a <= 1300) {
      $("#post-list-travel__title .fa-plane").addClass("bounceInLeft");
    } else {
      $("#post-list-travel__title .fa-plane").removeClass("bounceInLeft");
    }

    // share icon link
    if (a >= 1700 && a <= 2200) {
      $("#post-list-share__title .fa-share-alt").addClass("rotateIn");
    } else {
      $("#post-list-share__title .fa-share-alt").removeClass("rotateIn");
    }
  });
});
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    items: 4,
    autoplay: true,
    autoplayTimeout: 1500,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });

  var owl = $("#wp-slide-sub");
  owl.owlCarousel();
  // Go to the next item
  $(".btn-next").click(function () {
    owl.trigger("next.owl.carousel");
  });

  // Go to the previous item
  $(".btn-prev").click(function () {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    owl.trigger("prev.owl.carousel", [300]);
  });
});
