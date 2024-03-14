let navbarFixed = document.querySelector(`#navbar-fixed`);
let articleWrapperContainer = document.querySelector(`#article-wrapper-container`);

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

fetch('./articles.json').then((response) => response.json()).then((data) => {
    console.log(data);

    function lenghtRemove(string) {
        if (string.length > 15) {
            return string.split(' ')[0] + '...';
        } else {
            return string;
        }
    }

    function showCards(data) {
        data.forEach((card) => {
            let article = document.createElement('div');
            article.classList.add('article-wrapper');
            article.innerHTML = `<h3 title="${card.name}">${lenghtRemove(card.name)}</h3>
            <img src="https://picsum.photos/150" alt="">
            <h4>-${card.category}</h4>
            <h4 class="article-price">${card.price} $</h4> `;
            articleWrapperContainer.appendChild(article);
        });
    }

    showCards(data);

})