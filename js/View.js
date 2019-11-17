;(function (){
    'use strict'

    const api = window.View = {}

    // Настраиваем отображение формата цены
    const {format} = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumSignificantDigits: 1
    })

    // Функция отрисовки карточки 
    api.getFlatCardElement = function getFlatCardElement (data) {
        const rootElement = document.createElement('div')
        rootElement.innerHTML = cardTemplate
            .replace(/%ID%/, data.id)
            .replace(/%LABEL%/, data.label)
            .replace(/%ROOMS%/, data.rooms)
            .replace(/%PRICE%/, format(data.price))
            .replace(/%PRICE-POR-SQUARE%/, format( Math.ceil(data.price / data.square)) )
            .replace(/%SQUARE%/, data.square)
            .replace(/%LIKE_CLASS%/, data.like ? 'red' : '')
            .replace(/%FLOOR%/, data.floor)
            .replace(/%All-FLOOR%/, data.allFloor)
            
        return rootElement.firstElementChild
    }

    // Функция отрисовки блока куда вставляются карточки
    api.getShowcaseElement = function getShowcaseElement (data) {

    
        const cardWrapperElement = document.createElement('div')
        cardWrapperElement.classList.add('cards-wrapper')
        const conteinerElement = document.createElement('div')
        conteinerElement.className = 'container p-0'

        cardWrapperElement.append(conteinerElement)

        const rowElement = document.createElement('div')
        rowElement.classList.add('row')
        rowElement.setAttribute('data-card-entranсe', '')

        for( let i = 0; i < data.length; i +=4) {

            for (let j = i; j < data.length && j < i + 4; j++) {
                const colElement = document.createElement('div')
                colElement.classList.add('col-md-4')
                colElement.append(View.getFlatCardElement(data[j]))
                rowElement.append(colElement)
            }

            conteinerElement.append(rowElement)

        }

        return cardWrapperElement
    }


    // Функция отрисовки блока куда вставляются список
    api.getListcaseElement = function getListcaseElement (data) {

        // const listEntrance = document.querySelector('[data-viewmode-listcase]')
        const listEntrance = document.createElement('div')
        listEntrance.classList.add('panels-wrapper')

        const listConteinerElement = document.createElement('div')
        listConteinerElement.className = 'container p-0'

        
        listConteinerElement.innerHTML = headingOfListTemplate
        
        for(let i = 0; i < data.length; i++) {
            listConteinerElement.append(View.getFlatListElement(data[i]))
        }
        
        
        listEntrance.append(listConteinerElement)
        
        return listEntrance
    }

    api.getFlatListElement = function getFlatListElement (data) {
        const listElement = document.createElement('div')
        listElement.innerHTML = listCard
            .replace(/%LIST-ID%/, data.id)
            .replace(/%LIST-LABEL%/, data.label)
            .replace(/%LIST-FLOOR%/, data.floor)
            .replace(/%LIST-ROOMS%/, data.rooms)
            .replace(/%LIST-SQUARE%/, data.square)
            .replace(/%LIST-PRICE-POR-SQUARE%/, format( Math.ceil(data.price / data.square)))
            .replace(/%LIST-PRICE%/, format(data.price))
            .replace(/%LIST-LIKE_CLASS%/, data.like ? 'red' : '')
            

        return listElement
    }

    api.getObjectCard = function getObjectCard (cardData) {
        document.addEventListener("DOMContentLoaded", function() {


            console.log('Your document is ready!');
         });


        // location.assign('object.html')
        // const cardOfObject = document.querySelector('[data-object]')

        // setTimeout(100)
        // console.log(cardOfObjec)
    }       

    api.generateLabelFilter = function generateLabelFilter (flats) {
   
        //Отрисовываем блок выбора района в соответствии с базой данных
        const selectElement = document.createElement('select')
        const optionDefaultElement = document.createElement('option')
            optionDefaultElement.setAttribute('value', '')
            optionDefaultElement.textContent = 'Все проекты'
            selectElement.append(optionDefaultElement)

        // Делаем проверку на уникальность
        flats = flats
            .map(x => x.label).filter((value, index, list) => index === list.lastIndexOf(value))

        for(const flat of flats) {
            const optionElement = document.createElement('option')
            optionElement.setAttribute('value', flat)
            optionElement.textContent = flat
            selectElement.append(optionElement)
        }

        return selectElement
    }

    const cardTemplate = `
    <!-- card -->
    <div class="card">
        <div class="card__header">
            <a class="card__title" href="/flat.html?id=%ID%">%LABEL%</a>
            <div class="card__like" data-like>
                <i class="fas fa-heart %LIKE_CLASS%"></i>
            </div>
        </div>
        <div class="card__img">
            <img src="img/flat-plan.png" alt="План квартиры">
        </div>
        <div class="card__desc">
            <div class="card__price">
                <div class="card__price-total">%PRICE%</div>
                <div class="card__price-per-meter">%PRICE-POR-SQUARE% ₽/м2</div>
            </div>

            <!-- card__params params -->
            <div class="card__params params">
                <div class="params__item">
                    <div class="params__definition">Комнат</div>
                    <div class="params__value">%ROOMS%</div>
                </div>
                <div class="params__item">
                    <div class="params__definition">Площадь</div>
                    <div class="params__value">%SQUARE%</div>
                </div>
            </div>
            <!-- //card__params params -->

        </div>
        <div class="card__footer">
            <div class="card__art">ГЕН-112.4.2-56</div>
            <div class="card__floor">Этаж %FLOOR% из %All-FLOOR%</div>
        </div>
    </div>
    <!-- // card -->`

    const headingOfListTemplate = `
    
    <div class="panels-filter">
        <div class="panels-filter__element" style="width: 120px;">
            <div class="panels-filter__name">Артикул</div>
        </div>
        <div class="panels-filter__element" style="width: 160px;">
            <div class="panels-filter__name">ЖК</div>

        </div>
        <div class="panels-filter__element" style="width: 70px;">
            <div class="panels-filter__name">Корпус</div>

        </div>
        <div class="panels-filter__element" style="width: 70px;">
            <div class="panels-filter__name">Этаж</div>

        </div>
        <div class="panels-filter__element" style="width: 70px;">
            <div class="panels-filter__name">Комнат</div>
        </div>
        <div class="panels-filter__element" style="width: 80px;">
            <div class="panels-filter__name">Площадь</div>

        </div>
        <div class="panels-filter__element" style="width: 100px;">
            <div class="panels-filter__name">м2</div>

        </div>
        <div class="panels-filter__element" style="width: 100px;">
            <div class="panels-filter__name">Стоимость</div>
        </div>
        <div class="panels-filter__element" style="width: 120px;">
            <div class="panels-filter__name">Продавец</div>
        </div>
        <div class="panels-filter__element" style="width: 100px;">
            <div class="panels-filter__name">Избранное</div>
        </div>`

    const listCard = `
    <!-- panel -->
    <div class="panel">
        <div class="panel__artikul">ГЕН-112.4.2-56</div>
        <div class="panel__name" data-list-link>
            <a href="/flat.html?id=%LIST-ID%">%LIST-LABEL%</a>
        </div>
        <div class="panel__block">15</div>
        <div class="panel__floor">%LIST-FLOOR%</div>
        <div class="panel__rooms">%LIST-ROOMS%</div>
        <div class="panel__sq">%LIST-SQUARE% м2</div>
        <div class="panel__price-per-m">%LIST-PRICE-POR-SQUARE%</div>
        <div class="panel__price">%LIST-PRICE%</div>
        <div class="panel__seller">Застройщик</div>
        <div class="panel__favourite">
            <button class="panel__favourite-btn" data-like-list>
                <i class="fas fa-heart %LIST-LIKE_CLASS%"></i>
            </button>
        </div>
    </div>
    <!-- // panel -->`
    
})();