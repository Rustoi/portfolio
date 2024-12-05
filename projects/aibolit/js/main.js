// // Smooth scrolling
// const anchors = document.querySelectorAll('a[href*="#"]')
// for (let anchor of anchors) {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault()

//     const blockID = anchor.getAttribute('href').substr(1)

//     document.getElementById(blockID).scrollIntoView({
//       behavior: 'smooth',
//       block: 'start'
//     })
//   })
// }

const smoothScroll = document
  .querySelectorAll("a[href^='#'")
  .forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      let href = this.getAttribute("href").substring(1);
      const scrollTarget = document.getElementById(href);
      const topOffset = document.querySelector(".header").offsetHeight;
      // const topOffset = 0; // если не нужен отступ сверху
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

// Jquery Slick Slider
$(".accessories__content").slick({
  infinite: true,
  slidesToShow: 5,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 998,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});
// Close Slick Slider

// Jquery no Scroll Burger
$("#menu__toggle").on("change", function () {
  $("body").css("overflow", $(this).prop("checked") === true ? "hidden" : "");
});

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop() > 120) {
      $(".products").fadeIn(900);
    } else {
      $(".products").fadeOut(500);
    }
  });
});
