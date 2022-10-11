var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".itravel-sildeHome-button-next",
    prevEl: ".itravel-sildeHome-button-prev",
  },
  on: {
    slideChange: function () {
      let index_currentSlide = swiper.realIndex;
      let currentSlide = swiper.slides[index_currentSlide];
      // console.log(currentSlide);
    }
  }
});
var swiperBanner = new Swiper(".swiperBanner", {
  autoplay: {
    delay: 2000
  },
  speed: 800,
  loop: true,
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
    delay: -100,
    value: '.main-home-contents_items'
  },
  {
    key: '#home-contact',
    delay: 100,
    value: '.home-contact_vector'
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

  let parallaxElement = $(".main-home"),
    parallaxQuantity = parallaxElement.length;
  window.requestAnimationFrame(function () {
    for (let i = 0; i < parallaxQuantity; i++) {
      let currentElement = parallaxElement.eq(i),
        windowTop = $(window).scrollTop(),
        elementTop = currentElement.offset().top,
        elementHeight = currentElement.height(),
        viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
        scrolled = (windowTop - elementTop + viewPortHeight)<0? 0 : (windowTop - elementTop + viewPortHeight);
      currentElement.css({
        transform: "translate3d(0," + scrolled * 0.7 + "px, 0)"
      });
    }
  });
})

$(function () {
      let imgs = $('.banner_slide img'),
        len = imgs.length,
        counter = 0;

      [].forEach.call(imgs, function (img) {
        if (img.complete)
          incrementCounter();
        else
          img.addEventListener('load', incrementCounter, false);
      });

      function incrementCounter() {
        counter++;
        if (counter === len) {
          let arrIntroTitle = $('#intro-title').text().trim().split(' ');
          let introChange = '';
          arrIntroTitle.map((text, index) => {
            introChange += '<span style="--word-index:' + (index + 1) + ';">' + text + '</span>' + '\n';
          })
          $('#intro-title').html(introChange);
          $('#intro-title').css('display', 'block');

        }
      }

      // $('.itravelTogo').click(()=>{
      //   setTimeout(()=>{
      //     $('#listest').html(`<li>abc</li>
      //     <li>abc</li>
      //     <li>abc</li>
      //     <li>abc</li>
      //     <li>abc</li>`);
      //   },2000)
      //   let checktimer = setInterval(() => {
      //     if($.trim($('#listest').html()) && $('#listest').html() != undefined){
      //       console.log($('#listest').html());
      //       $('.itravelTogo').val('okee');
      //       clearInterval(checktimer);
      //     }
      //   }, 500);
      // });
      $('.dropdown-frmsearch-items').click(function(){
        $('#navbarDropdown-frmsearch').text($(this).text());
        if($(this).attr('data-type') == 'round-trip'){
          $('#roundDate').css('display','block');
        }
        else{
          $('#roundDate').css('display','none');
        }

      })
});