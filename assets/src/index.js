//Here is a burger menu code

const burger = document.querySelector('.header__burger')
const menu = document.querySelector('.header__menu')

burger.addEventListener('click', () => {
    burger.classList.toggle('active')
    menu.classList.toggle('active')
})

//Here is a search block

const searchIcon = document.querySelector('.header__form')
const searchInput = document.querySelector('.form__input')
const logo = document.querySelector('.header__logo')
const form = document.querySelector('.header__form') 
const btn = document.querySelector('.btn')

btn.addEventListener('click', (event) => event.preventDefault())

searchIcon.addEventListener('click', (event) => {
    searchInput.classList.toggle('active')
    searchInput.placeholder = 'Hledat'
    logo.classList.toggle('active')
    form.classList.toggle('active')
})

searchInput.addEventListener('click', (event) => {
    event.stopPropagation()
})

// slider


var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
    },
});

// zbozi-cards


const novinkyBtn = document.querySelector('.novinky')
const nejprodavanejsiBtn = document.querySelector('.nejprodavanejsi')
const doporuceneBtn = document.querySelector('.doporucene')
const loadMoreBtn = document.querySelector('.zbozi__btn')
let start = 4



novinkyBtn.addEventListener('click', () => {
    start = 4
    novinkyBtn.classList.toggle('active')
    nejprodavanejsiBtn.classList.remove('active')
    doporuceneBtn.classList.remove('active')
    fetchProductsByCategory('Novinky', start)
})

nejprodavanejsiBtn.addEventListener('click', () => {
    start = 4
    nejprodavanejsiBtn.classList.toggle('active')
    doporuceneBtn.classList.remove('active')
    novinkyBtn.classList.remove('active')
    fetchProductsByCategory('Nejprodávanější', start)
})

doporuceneBtn.addEventListener('click', () => {
    start = 4
    doporuceneBtn.classList.toggle('active')
    nejprodavanejsiBtn.classList.remove('active')
    novinkyBtn.classList.remove('active')
    fetchProductsByCategory('Doporučené', start)
})

loadMoreBtn.addEventListener('click', () => {
    const category = loadMoreBtn.dataset.category
    fetchProductsByCategory(category)
    start += 4
})



function fetchProductsByCategory(category) {
    fetch('./assets/src/products.json')
        .then(response => response.json())
        .then(data => {
            const products = data.filter(product => product.category === category)
            createCards(products)

            if(start >= products.length) {
                loadMoreBtn.style.display = 'none'
            } else {
                loadMoreBtn.style.display = 'block'
                loadMoreBtn.dataset.category = category
            }
        })
}


function createCards(products) {
    const cardsContainer = document.querySelector('.zbozi__cards')
    cardsContainer.innerHTML = ''

    let availabilityTernary = ''
    

    for(let i = 0; i < start; i++) {
        const product =products[i]
        const card = document.createElement('div')

        if (product.availability === 'Skladem') {
            availabilityTernary = `<p class="zbozi__stav green">${product.availability}</p>`
        } else if (product.availability === 'Na objednávku') {
            availabilityTernary = `<p class="zbozi__stav gray">${product.availability}</p>`
        } else {
            availabilityTernary = `<p class="zbozi__stav red">${product.availability}</p>`
        }

        card.classList.add('zbozi__card')
        card.innerHTML = `
            <div class="zbozi__flags">
                ${product.flags[0] ? `<p class="zbozi__flag1">${product.flags[0]}</p>` : ''}
                ${product.flags[1] ? `<p class="zbozi__flag2"> ${product.flags[1]}</p>` : ''}
            </div>
            <img src="${product.imgSrc}" alt="" class="zbozi__img">
            <p class="zbozi__title">
                ${product.title}
            </p>
            ${availabilityTernary}
            <div class="zbozi__price">
                ${`CZK ${product.price}`}
            </div>
            <button class="zbozi__add">
                <a href="#" class="zbozi__add-link">
                    <img src="./assets/img/shopping-cart.svg" alt="" class="zbozi__add-link-img">
                </a>
            </button>
        `
        cardsContainer.appendChild(card)
    }
    
    console.log(start)
}

fetchProductsByCategory('Novinky')