let navbarFixed = document.querySelector(`#navbar-fixed`);
let swiperSlide = document.querySelector(`#swiper-slide`);
let numberOne = document.querySelector(`#numberOne`);
let numberTwo = document.querySelector(`#numberTwo`);
let numberThree = document.querySelector(`#numberThree`);

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
    <i class="${user.rank > 0 ? "bi bi-star-fill" : "bi bi-star"}"></i>
    <i class="${user.rank > 1 ? "bi bi-star-fill" : "bi bi-star"}"></i>
    <i class="${user.rank > 2 ? "bi bi-star-fill" : "bi bi-star"}"></i>
    <i class="${user.rank > 3 ? "bi bi-star-fill" : "bi bi-star"}"></i>
    <i class="${user.rank > 4 ? "bi bi-star-fill" : "bi bi-star"}"></i>
</div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>`;
  swiperSlide.appendChild(div);
});


window.addEventListener(`scroll`, () => {
  let scrolly = window.scrollY;
  if (scrolly > 1000) {
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

function interval(name, arrive, timing) {

  let counter = 0;
  let interval = setInterval(() => {
    if (counter < arrive) {
      counter++;
      name.innerHTML = counter;
    } else {
      clearInterval(interval);
    }
  }, timing)

  setTimeout(() => {
    timeReset = true;
  }, 10000)

}

let timeReset = true;

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && timeReset) {
      timeReset = false;
      interval(numberOne, 235, 20);
      interval(numberTwo, 120, 40);
      interval(numberThree, 268, 20);
    }
  })
});
observer.observe(numberOne);
observer.observe(numberTwo);
observer.observe(numberThree);




