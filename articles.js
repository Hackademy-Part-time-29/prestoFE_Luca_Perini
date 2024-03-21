let navbarFixed = document.querySelector(`#navbar-fixed`);
let articleWrapperContainer = document.querySelector(`#article-wrapper-container`);
let filterCategory = document.querySelector('#filter-categories');
let articleFilter = document.querySelector('#article-filter');
let priceInput = document.querySelector('#priceInput');
let priceInputValue = document.querySelector('#priceInputValue');
let wordInput = document.querySelector('#wordInput');

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
        articleWrapperContainer.innerHTML = '';
        data.forEach((card) => {
            let article = document.createElement('div');
            article.classList.add('article-wrapper');
            article.innerHTML = `<h3 title="${card.name}"><i class="bi ${favourites.includes(card.id.toString()) ? `bi-bookmark-fill` : `bi-bookmark`}" id="${card.id}"></i> ${lenghtRemove(card.name)}</h3>
            <img src="https://picsum.photos/150" alt="">
            <h4>-${card.category}</h4>
            <h4 class="article-price">${card.price} $</h4> `;
            articleWrapperContainer.appendChild(article);
        });

        let favouriteIcons = document.querySelectorAll(`.bi`);
        favouriteIcons.forEach((icon) => {
            icon.addEventListener(`click`, () => {
                if (!favourites.includes(icon.id)) {
                    favourites.push(icon.id);
                    console.log(favourites);
                } else {
                    let index = favourites.indexOf(icon.id);
                    favourites.splice(index, 1);
                    console.log(favourites);
                }
                    globalFilter()
            })
        })
    }

    function generateRadios() {
        let categories = data.map((annuncio) => annuncio.category);
        let uniqueCategories = [];
        categories.forEach((category) => {
            if (!uniqueCategories.includes(category)) {
                uniqueCategories.push(category)
            }
        })
        console.log(uniqueCategories);
        uniqueCategories.forEach((category) => {
            let div = document.createElement('div');
            div.classList.add('filter-category');
            div.innerHTML = `
            <input class="categoryForm" type="radio" name="categoryRadios" id="${category}">
            <label class="categoryForm" for="${category}">${category}</label>`;
            articleFilter.appendChild(div)

        });
    }

    function filterByCategory(array) {
        let selectedButton = Array.from(radioButtons).find((button) => button.checked);
        category = selectedButton.id

        if (category == "All") {
            return array;
        } else if(category == "favourites") {
            let filtered = array.filter((article) => favourites.includes(article.id.toString()));
            return filtered;
        } else {
            let filtered = array.filter((article) => article.category == category);
            return filtered;
        }
        
    }

    function setPriceInput() {
        let prices = data.map((annuncio) => +annuncio.price);
        prices.sort((a, b) => a - b);
        let maxPrice = Math.ceil(prices.pop());
        let minPrice = Math.floor(prices.shift());
        priceInput.max = maxPrice;
        priceInput.min = minPrice;
        priceInput.value = maxPrice;
        priceInputValue.innerHTML = maxPrice;
    }

    function filterByPrice(array) {
        let filtered = array.filter((article) => +article.price <= priceInput.value);
        return filtered
    }

    function filterByWord(array) {
        let filtered = array.filter((annuncio) => annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));

        return filtered;
    }

    function globalFilter() {
        let filteredByCategory = filterByCategory(data);
        let filteredByCategoryAndPrice = filterByPrice(filteredByCategory);
        let filteredByCategoryAndPriceAndWord = filterByWord(filteredByCategoryAndPrice);
        showCards(filteredByCategoryAndPriceAndWord)
    }

    let favourites = [];
    showCards(data);
    generateRadios();
    setPriceInput();

    let radioButtons = document.querySelectorAll('.categoryForm');
    radioButtons.forEach((button) => {
        button.addEventListener('click', () => {
            globalFilter();
            filterByCategory(button.id);
        });
    });
    priceInput.addEventListener("input", () => {
        globalFilter();
        priceInputValue.innerHTML = `${priceInput.value} $`
    })
    wordInput.addEventListener("input", () => {
        globalFilter();
    })
});