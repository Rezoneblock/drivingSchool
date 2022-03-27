// dependencies: slick-slider, swiper-slider.

$(document).ready(function () {
  // burger
  $('.burger-btn').on('click', function () {
    if ($('.burger-menu').hasClass('--active')) {
      // hide burger
      $(this).removeClass('--active');
      $('.burger-menu').removeClass('--active');
      $('.burger-menu').hide();
      $('body').removeAttr('style');
    } else {
      // show burger
      $('body').css('overflow-y', 'hidden');
      $(this).addClass('--active');
      $('.burger-menu').addClass('--active');
      $('.burger-menu').show();
    }
  });
  // close gratitude
  $('.gratitude__close').on('click', () => {
    $('.gratitude').hide();
  });
  $('.gratitude__overlay').on('click', () => {
    $('.gratitude').hide();
  });

  // close each modal's by pressing escape
  $(document).keyup(function (e) {
    if (e.key === 'Escape') {
      $('.entry-plan').hide();
      $('.modal').hide();
      $('.gratitude').hide();
    }
  });

  // modal show
  $('.show-modal').on('click', () => {
    $('.modal').show();
    $('.modal').css('display', 'flex');
  });
  // modal hide
  $('.modal__overlay').on('click', () => {
    $('.modal').hide();
  });
  // modal send
  $('.form__btn').on('click', function (event) {
    event.preventDefault();
    let nameValid = false;
    let phoneValid = false;
    let nameInput = $(this).parent().children().find('.name');
    let phoneInput = $(this).parent().children().find('.phone');
    // check Name input
    if (
      $(nameInput)
        .val()
        .toLowerCase()
        .match(/^[a-zа-яё]+$/) !== null
    ) {
      $(nameInput).parent('label').removeClass('problem');
      nameValid = true;
    } else {
      $(nameInput).parent('label').addClass('problem');
    }
    // check Phone input
    if (
      $(phoneInput)
        .val()
        .toLowerCase()
        .match(/^[0-9]+$/) !== null
    ) {
      $(phoneInput).parent('label').removeClass('problem');
      phoneValid = true;
    } else {
      $(phoneInput).parent('label').addClass('problem');
    }

    // send
    if (nameValid && phoneValid) {
      $(this).parent()[0].reset();
      $('.modal').hide();
      $('.gratitude').show();
      $('.gratitude').css('display', 'flex');
    }
  });

  // hidden addresses
  $('.address-hidden-btn').on('click', function () {
    if ($(this).find('.address-hidden').css('display') == 'none') {
      $(this).find('.address-hidden').slideDown();
      $(this).find('.address-hidden').css('display', 'flex');
    } else {
      $(this).find('.address-hidden').slideUp();
    }
  });

  // entry-plan slider
  $('.entry-plan__slider').slick({
    infinite: true,
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
    centerMode: true,
    swipe: false,
  });
  // entry-plan show
  $('.entry-plan-btn').on('click', function () {
    $('.entry-plan__slider').slick('slickGoTo', 0);
    $('.entry-plan').show();
    $('.entry-plan').css('display', 'flex');
  });
  // entry-plan hide by clicking outside
  $('.entry-plan__overlay').on('click', () => {
    $('.entry-plan').hide();
  });

  // marquee
  $('.marquee').slick({
    infinite: true,
    dots: false,
    arrows: false,
    slidesToShow: 3,
    autoplay: true,
    variableWidth: true,
    swipe: false,
    autoplaySpeed: 0,
    pauseOnHover: false,
    pauseOnFocus: false,
    speed: 4000,
    cssEase: 'linear',
  });

  // branches switch
  $('[data-branch-set-type]').on('click', (event) => {
    // just read names of variables and methods
    let target = event.target;
    let setThisType = $(target).attr('data-branch-set-type');
    let setThisList = $(`[data-branch-type=${setThisType}]`);
    let hideThisType = setThisType === 'racing' ? 'training' : 'racing';
    let hideThisList = $(`[data-branch-type="${hideThisType}"]`);

    $(target).addClass('--selected');
    $(`[data-branch-set-type="${hideThisType}"]`).removeClass('--selected');

    hideThisList.hide();
    setThisList.show();
    setThisList.css({ display: 'flex' });
  });
  // branches slider
  function setBranchesSlider() {
    $('.branches__slider')
      .not('.slick-initialized')
      .slick({
        infinite: false,
        dots: false,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        variableWidth: true,
        initialSlide: 0,
        dots: true,
        customPaging: function (slider, i) {
          let len = slider.$slides.length;
          if ($(window).width() < 576) {
            return `<span class="current">${i + 1}</span> / <span>${len}</span>`;
          } else {
            // logic for dots when more then 2 slides
            if (len > 2) {
              // first item
              if (i == 0) {
                i = 1;
              } // average item
              else if (i * 2 + 1 !== len) {
                i++;
              } // last item
              else {
                return `<span class="current">${len}</span> / <span>${len}</span>`;
              }
              return `<span class="current">${i * 2}</span> / <span>${len}</span>`;
            }
          }
        },
        responsive: [
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
  }
  // init slider on resize && window.width <= 992px
  $(window).resize(function () {
    var $windowWidth = $(window).width();
    if ($windowWidth <= 992) {
      setBranchesSlider();
    } else {
      $('.branches__slider.slick-initialized').slick('unslick');
    }
  });
  // init slider on window.width <= 992px
  if ($(window).width() <= 992) {
    setBranchesSlider();
  }

  // trainers slider
  const trainersPhotos = new Swiper('.trainer__slider-photos', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 'auto',
    watchOverflow: true,
    slidesPerView: 3.5,
    initialSlide: 0,
    allowTouchMove: false,
    navigation: {
      nextEl: '.trainer__slider-btn-next',
      prevEl: '.trainer__slider-btn-prev',
    },
    pagination: {
      el: '.trainer__slider-pagination',
      type: 'fraction',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerScroll: 1,
        allowTouchMove: true,
        grabCursor: true,
      },
      992: {
        slidesPerView: 3.5,
        allowTouchMove: false,
      },
    },
  });
  const trainersDsc = new Swiper('.trainer__slider-dsc', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    slidesPerScroll: 1,
    initialSlide: 0,
    slidesPerView: 'auto',
    allowTouchMove: false,
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerScroll: 1,
        allowTouchMove: true,
        grabCursor: true,
      },
      992: {
        allowTouchMove: false,
      },
    },
  });
  // sync both slider's
  function syncSliders(index) {
    trainersPhotos.slideTo(index);
    trainersDsc.slideTo(index);
  }
  trainersPhotos.on('slideChange', () => {
    syncSliders(trainersPhotos.activeIndex);
  });
  trainersDsc.on('slideChange', () => {
    syncSliders(trainersDsc.activeIndex);
  });
  // trainer mobile hidden text
  $('.trainer__mobile-dsc > button').on('click', () => {
    $('.trainer__mobile-dsc > span.--hidden').slideToggle();
  });

  // answers
  $('.answers__item').on('click', function () {
    // current
    let answer = this.querySelector('.answers__hidden');

    if ($(answer).hasClass('--active')) {
      // hide current
      $(answer).slideUp();
      setTimeout(() => {
        $(answer).removeClass('--active');
        $(this).removeClass('--active');
      }, 300);
    } else {
      // hide all
      $('.answers__hidden').slideUp();
      setTimeout(() => {
        $('.answers__item').removeClass('--active');
        $('.answers__hidden').removeClass('--active');
      }, 300);
      // show current
      setTimeout(() => {
        $(answer).addClass('--active');
        $(answer).slideDown();
        $(this).addClass('--active');
      }, 301);
    }
  });
});
