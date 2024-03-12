let navbarFixed = document.querySelector(`#navbar-fixed`);
let swiperSlide = document.querySelector(`#swiper-slide`)


let reviews = [
  {
    user: "Antonio",
    description: "Sito affidabile. Ordinerò ancora!",
    rank: 4,
  },
  {
    user: "Lorenzo",
    description: "ottimo sito, ve lo consiglio",
    rank: 5,
  },
  {
    user: "Paolo",
    description: "pacchi arrivati in ritardo...",
    rank: 1,
  },
  {
    user: "Luca",
    description: "bellissimo sito, arrivato tutto in orario",
    rank: 4,
  },
];
 
  reviews.forEach((user) => {
    let div = document.createElement(`div`);
    div.classList.add(`swiper-slide`);
    div.innerHTML = `<div class="swiper-slide" id="swiper-slide">
    <h3>${user.user}</h3>
    <p>"${user.description}"</p>
    <div class="stars">
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
    <i class="bi bi-star"></i>
</div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>`;
    swiperSlide.appendChild(div);
  });


window.addEventListener(`scroll`, () => {
  let scrolly = window.scrollY;
  if (scrolly > 1) {
    navbarFixed.classList.remove(`navbar`);
    navbarFixed.classList.add(`navbar-fixed`);
  } else {
    navbarFixed.classList.add(`navbar`);
    navbarFixed.classList.remove(`navbar-fixed`);
  }


});

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
