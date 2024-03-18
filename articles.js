let navbarFixed = document.querySelector(`#navbar-fixed`);
let articleWrapperContainer = document.querySelector(`#article-wrapper-container`);
let filterCategory = document.querySelector('#filter-categories');
let articleFilter = document.querySelector('#article-filter');
let priceInput = document.querySelector('#priceInput');
let priceInputValue = document.querySelector('#priceInputValue');

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
            article.innerHTML = `<h3 title="${card.name}">${lenghtRemove(card.name)}</h3>
            <img src="https://picsum.photos/150" alt="">
            <h4>-${card.category}</h4>
            <h4 class="article-price">${card.price} $</h4> `;
            articleWrapperContainer.appendChild(article);
        });
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

        })
    }

    function filterByCategory(category) {
        if (category != "All") {
            let filtered = data.filter((article) => article.category == category);
            showCards(filtered);
        } else{
            showCards(data);
        }

    }

    function setPriceInput(){
        let prices = data.map((annuncio) => +annuncio.price);
        prices.sort((a,b)=> a - b);
        let maxPrice = Math.ceil(prices.pop());
        let minPrice = Math.floor(prices.shift());
        priceInput.max = maxPrice;
        priceInput.min = minPrice;
        priceInput.value = maxPrice;
        priceInputValue.innerHTML = maxPrice;
    }

    function filterByPrice(){
        let filtered = data.filter((article) => +article.price <= priceInput.value);
        showCards(filtered);
    }
    
    

    showCards(data);
    generateRadios();
    setPriceInput();

    let radioButtons = document.querySelectorAll('.categoryForm');
    radioButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterByCategory(button.id);
        });
    });
    priceInput.addEventListener("input", ()=>{
        filterByPrice();
        priceInputValue.innerHTML= priceInput.value
    })
});