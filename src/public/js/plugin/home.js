var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".itravel-sildeHome-button-next",
    prevEl: ".itravel-sildeHome-button-prev",
  },
  on: {
    slideChange: function () {
      let index_currentSlide = swiper.realIndex;
      let currentSlide = swiper.slides[index_currentSlide];
      console.log(currentSlide);
    }
  }
});
var swiperBanner = new Swiper(".swiperBanner", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true
  }
});
var swiperFeedback = new Swiper(".swiperFeedback", {
  pagination: {
    el: ".feedback-pagination",
    dynamicBullets: true,
    clickable: true
  },
  on: {
    slideChange: function () {
      let index_currentSlide = swiperFeedback.realIndex;
      let currentSlide = swiperFeedback.slides[index_currentSlide];
      let feedbackVector = currentSlide.querySelector('.feedback_vector svg path');
      if(feedbackVector){
        reset_animation(feedbackVector);
      }      
    }
  }
});

function reset_animation(el) {

  el.style.webkitAnimation = 'none';
  setTimeout(function() {
    el.style.webkitAnimation = '';
  }, 10);
}

// let homeMore = document.querySelector('#home-more');
let objLoad = [
  {
    key: '#home-more',
    delay: 100,
    value: '.home-more_vector'
  },
  {
    key: '#home_effect',
    delay: 100,
    value: ['.bonus-effect_vector','.home-bonus_effect_child']
  },
  {
    key: '#home-feedback',
    delay: 100,
    value: '.feedback_vector'
  },
  {
    key: '#main-home',
    delay: 100,
    value: '.main-home-contents_items'
  }
]
window.addEventListener('scroll',(event)=>{
  objLoad.forEach((elLoad)=>{
      let offsetTop = Number($(elLoad.key).offset().top);
      if(offsetTop - window.scrollY < window.innerHeight + elLoad.delay){
        if(Array.isArray(elLoad.value)){
          elLoad.value.map((val)=>{
            $(val).css('display','block');
          })
        }
        else{
          $(elLoad.value).css('display','block');
        }
        
      }
  });
})