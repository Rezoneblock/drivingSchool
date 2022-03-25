$(document).ready(function () {
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
  let mobile = window.matchMedia('(min-width: 0px) and (max-width: 992px)');
  if (mobile.matches) {
    console.log(1);
    $('.branches__slider').slick({
      infinite: false,
      dots: false,
      arrows: false,
      // slidesToScroll: 1,
      // slidesToShow: 1,
      variableWidth: true,
    });
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
  });
  const trainersDsc = new Swiper('.trainer__slider-dsc', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    slidesPerScroll: 1,
    initialSlide: 0,
    slidesPerView: 'auto',
    allowTouchMove: false,
  });
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

  // burger
  $('.burger-btn').on('click', function () {
    if ($('.burger-menu').hasClass('--active')) {
      $(this).removeClass('--active');
      $('.burger-menu').removeClass('--active');
      $('.burger-menu').hide();
    } else {
      $(this).addClass('--active');
      $('.burger-menu').addClass('--active');
      $('.burger-menu').show();
    }
  });
});
