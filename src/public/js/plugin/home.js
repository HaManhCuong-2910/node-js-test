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

$( ".home-news_contain_title_list__imgs div img" ).hover(
  function() {
    let srcPri = $(this).attr('data-src');
    let arrSrc = srcPri.split('.');
    let nameSrc = arrSrc[0];
    let newSrc = $(this).attr('src');
    if(!newSrc.includes('_primary')){
      newSrc = newSrc.replace(nameSrc,nameSrc + '_primary')
    }    
    $(this).attr('src',newSrc);
  }, function() {
    $(this).attr('src', $(this).attr('src').replace('_primary','') );
  }
);
let homeMore = document.querySelector('#home-more');
window.addEventListener('scroll',(event)=>{
  if(homeMore.offsetTop - window.scrollY < window.innerHeight + 100){
    $('.home-more_vector').css('display','block');
  }
})