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

searchIcon.addEventListener('click', (event) => {
    searchInput.classList.toggle('active')
    searchInput.placeholder = 'hledat'
    logo.classList.toggle('active')
    form.classList.toggle('active')
})

searchInput.addEventListener('click', (event) => {
    event.stopPropagation()
})
