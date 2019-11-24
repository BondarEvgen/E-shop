;(function(){
    'use strict'

    const api = window.ElementCard = {}


    const base = Model.getFlats()

    console.log(base)

    const pressCard = JSON.parse(localStorage.getItem('pressCard'))
    const sendElement = JSON.parse(localStorage.getItem('element'))

    console.log(pressCard)
    console.log(sendElement)

    // Настраиваем отображение формата цены
    const {format} = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumSignificantDigits: 1
    })

    // Вставляем значения из элемента базы данных по которому нажали в карточку
     const cardTitle = document.querySelector('[data-card-title]')
     const cardTitleText = cardTitle.textContent

       const newTitleTextContent = cardTitleText
                                .replace(/%SQUARE%/, sendElement.square)
                                .replace(/%PRICE%/,format(sendElement.price))

    cardTitle.textContent = newTitleTextContent

    const cardSquare = document.querySelector('[data-card-square]')
    const cardSquareText = cardSquare.textContent

    const newSquareText = cardSquareText.replace(/%SQUARE%/, sendElement.square )
    cardSquare.textContent = newSquareText
    
    
    const cardCorpus = document.querySelector('[data-card-corpus]')
    const cardCorpusText = cardCorpus.textContent

    const newCorpusText = cardCorpusText.replace(/%CORPUS%/, sendElement.corpus )
    cardCorpus.textContent = newCorpusText

    const cardSection = document.querySelector('[data-card-section]')
    const cardSectionText = cardSection.textContent

    const newSectionText = cardSectionText.replace(/%SECTION%/, sendElement.section )
    cardSection.textContent = newSectionText

    const cardFloor = document.querySelector('[data-card-floor]')
    const cardFloorText = cardFloor.textContent

    const newFloorText = cardFloorText.replace(/%FLOOR%/, sendElement.floor )
    cardFloor.textContent = newFloorText

    const cardNumber = document.querySelector('[data-card-number]')
    const cardNumberText = cardNumber.textContent

    const newNumberText = cardNumberText.replace(/%NUMBER%/, sendElement.flatNumber )
    cardNumber.textContent = newNumberText


    const cardPrice = document.querySelector('[data-card-price]')
    const cardPriceText = cardPrice.textContent

    const newPriceText = cardPriceText.replace(/%PRICE%/, format(sendElement.price))
    cardPrice.textContent = newPriceText

    const cardPricePerSquare = document.querySelector('[data-card-price-per-square]')
    const cardPricePerSquareText = cardPricePerSquare.textContent

    const newPricePerSquareText = cardPricePerSquareText
                .replace(/%PRICE-PER-SQUARE%/, format( Math.ceil(sendElement.price / sendElement.square)))
    cardPricePerSquare.textContent = newPricePerSquareText



    const likeElemen = document.querySelector('[data-card-like-element]')

    if (sendElement.like) {
        document.querySelector('[data-card-like-element] i').style.color = 'red'
         
        console.log(sendElement.like)
    }

    // likeElemen.addEventListener('click', function(event){
    //     const iOfLikeElement = document.querySelector('.button-favourite i')

    //     iOfLikeElement.style.color = 'red'

    //     console.log(iOfLikeElement)

        
    // })
    

    
})();