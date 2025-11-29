const showModalButtons = document.querySelectorAll('[data-show-modal]')
const closeModal = document.querySelectorAll('[data-close-modal]')
const burgerMenu = document.querySelector('.bar')
const closeMobileMenu = document.querySelector('.menu-mobile__icon')
const questions = document.querySelectorAll('.question')
const forms = document.querySelectorAll('form')

function modalToggle(elem, displayValue) {
    elem.style.display = displayValue
}

for (let button of showModalButtons) {
    button.addEventListener('click', (event) => {
        const modal = document.querySelector('.modal')
        modalToggle(modal, 'block')
    })
}

for (let question of questions) {
    question.addEventListener('click', (event) => {
        const answer = question.querySelector('.question__answer'),
            cross = question.querySelector('.question__img'),
            questionCssClasses = question.classList

        let answerHeight = `${answer.scrollHeight}px`,
            crossRotateDegree = 45

        if (questionCssClasses.contains('question_active')) {
            answerHeight = 0
            crossRotateDegree = 0
            questionCssClasses.remove('question_active')
        } else {
            questionCssClasses.add('question_active')
        }

        answer.style.height = answerHeight
        cross.style.transform = `rotate(${crossRotateDegree}deg)`
    })
}

for (let close of closeModal) {
    close.addEventListener('click', (event) => {
        const modal = close.closest('[data-modal]')

        modalToggle(modal, 'none')
    })
}

burgerMenu.addEventListener('click', () => {
    const mobileMenu = document.querySelector('.menu-mobile')

    mobileMenu.style.height = '100%'
})

closeMobileMenu.addEventListener('click', () => {
    const mobileMenu = document.querySelector('.menu-mobile')

    mobileMenu.style.height = 0
})

for (let form of forms) {
    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const requestData = new FormData(this)
        const formModal = document.querySelector('.modal')
        const loader = document.querySelector('.loading-container')

        loader.style.display = 'block'

        if (formModal.style.display === 'block') {
            formModal.style.display = 'none'
        }

        fetch('/php/mail.php', {
            method: 'POST',
            body: requestData
        }).then((response) => {
            response.json().then((data) => {
                if (data === 'ok') {
                    const successModal = document.querySelector('.modal-window')

                    loader.style.display = 'none'
                    successModal.style.display = 'block'
                } else {
                    const errorModal = document.querySelector('.modal-window_error')

                    loader.style.display = 'none'
                    errorModal.style.display = 'block'

                    console.error(data)
                }
            })
        }).catch((error) => {
            console.log('Случилась ошибка!')
            console.error(error)
        })
    })
}

const reviewSlider = new Swiper('.reviews', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 50,
    navigation: {nextEl: '.reviews__nav-next', prevEl: '.reviews__nav-prev'},
    autoplay: {delay: 5000},
    breakpoints: {
        1024: {spaceBetween: 30},
        932: {spaceBetween: 20},
        915: {spaceBetween: 20},
        912: {spaceBetween: 20},
        896: {spaceBetween: 20},
        882: {spaceBetween: 30},
        852: {spaceBetween: 30},
        820: {spaceBetween: 30},
        320: {spaceBetween: 0, slidesPerView: 1}
    }
})

const educationSlider = new Swiper('.education', {
    loop: true,
    navigation: {nextEl: '.education__nav_prev', prevEl: '.education__nav_next'},
    autoplay: {delay: 500}
})