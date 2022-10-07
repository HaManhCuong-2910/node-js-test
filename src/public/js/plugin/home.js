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
      let feedbackVector = currentSlide.querySelector('.feedback_vector');
      if(feedbackVector){
        feedbackVector.classList.remove('active');
        feedbackVector.classList.add('active');
      }      
    }
  }
});

let homeMore = document.querySelector('#home-more');
window.addEventListener('scroll',(event)=>{
  if(homeMore.offsetTop - window.scrollY < window.innerHeight + 100){
    $('.home-more_vector').css('display','block');
  }
})