;(function (){
    'use strict'

    const api = window.Controller = {}

    // Фильтрация по умолчанию
    const filtersDefault = {
        label: null,
        rooms: null,
        sort: null,
        square: {
            min: null,
            max: null
        },
        price: {
            min: null,
            max: null
        }
    }
    // Пагинация по умолчанию
    const pagination = {
        currentPage: 1,
        flatInPage: 3,
        commonPage: 1,
        previos: false,
        next: false
    }
    // Делаем копию фильтпрв по умолчанию
    const filters = JSON.parse(JSON.stringify(filtersDefault))

    // Проверка на то заданы были фильтры или нет
    const isFiltred = () => JSON.stringify(filters) !== JSON.stringify(filtersDefault)

    let cardPressElement = null

    api.getCardPressElement = function getCardPressElement () {
        return cardPressElement
    }


    // Функция описания что происходит при старте приложения
    api.start = function () {

        // Навешиваем обработчики события

        // Обрабатываем событие click по значку отображения плитки
        document
            .querySelector('[data-viewmode-showcase-button]')
            .addEventListener('click', function(event){
                event.preventDefault()
                
                Model.setViewMode('showcase')
            })

        // Обрабатываем событие click по значку отображения списком
        document
            .querySelector('[data-viewmode-listcase-button]')
            .addEventListener('click', function(event){
                event.preventDefault()
                
                Model.setViewMode('listcase')
            })


            // Фильтр по району
        document
            .querySelector('[data-filter-label]')
            .addEventListener('change', function(event){
                if (this.value === '' ) {
                    if (filters.label !== null){

                        filters.label = null
                        update()
                    }
                    return
                }

                if (filters.label === this.value) {
                    return
                }

                filters.label = this.value
                update()
                

            })

            // Фильтр по комнатам
        document
            .querySelector('[data-filter-rooms]')
            .addEventListener('change', function(event){

                const number = parseInt(event.target.getAttribute('number'))

                event.target.nextElementSibling.classList.toggle('rooms__btn--active')

                if (filters.rooms === null) {
                    filters.rooms = [number]
                }
                else {
                    if (filters.rooms.includes(number)) {
                        const index = filters.rooms.indexOf(number)
                        filters.rooms.splice(index, 1)
                    }
                    else {
                        filters.rooms.push(number)
                    }
                }

                if(!filters.rooms.length) {
                    filters.rooms = null
                }
                
                update()
            })

            // Фильтр по максимальной цене
        document
            .querySelector('[data-filter-price-max]')
            .addEventListener('change', function(event){
                const number = parseInt(this.value)

                if (!this.value) {
                    if(filters.price.max !== null) {
                        filters.price.max = null
                        update()
                    }
                    
                    return
                }

                if (filters.price.max !== number) {
                    filters.price.max = number
                    update()
                }
               console.log(number)
            })

            // Фильтр по минимальной цене
        document
            .querySelector('[data-filter-price-min]')
            .addEventListener('change', function(event){
                const number = parseInt(this.value)

                if (!this.value) {
                    if(filters.price.min !== null) {
                        filters.price.min = null
                        update()
                    }
                    
                    return
                }

                if (filters.price.min !== number) {
                    filters.price.min = number
                    update()
                }
               console.log(number)
            })

            // Фильтр по максимальной плошади
    document
        .querySelector('[data-filter-square-max]')
        .addEventListener('change', function(event){
            const number = parseInt(this.value)

            if (!this.value) {
                if(filters.square.max !== null) {
                    filters.square.max = null
                    update()
                }
                
                return
            }

            if (filters.square.max !== number) {
                filters.square.max = number
                update()
            }
           console.log(number)
        })

                 // Фильтр по минимальной плошади
    document
        .querySelector('[data-filter-square-min]')
        .addEventListener('change', function(event){
            const number = parseInt(this.value)

            if (!this.value) {
                if(filters.square.min !== null) {
                    filters.square.min = null
                    update()
                }
                
                return
            }

            if (filters.square.min !== number) {
                filters.square.min = number
                update()
            }
        console.log(number)
    })

            // Обработчик события сортировки
        document
            .querySelector('[data-sort]')
            .addEventListener('change', function(event){
                if (!this.value) {
                    if(filters.sort !== null) {
                        filters.sort = null
                        update()
                    }
                    return
                }

                if (filters.sort !== this.value) {
                    filters.sort = this.value
                    console.log(this.value)
                    update()
                }

            })
            // Обработчик события сброса фильтрации 
        document
            .querySelector('[data-filter-reset]')
            .addEventListener('click', function(event){

                

                Object.assign(filters, {
                    label: null,
                    rooms: null,
                    sort: null,
                    square: {
                        min: null,
                        max: null
                    },
                    price: {
                        min: null,
                        max: null
                    }})
              

            // Сброс активных классов в фильтрах количества комнат, при отсутствии фильтров
             document
                .querySelector('[data-filter-rooms]')
                .querySelectorAll('label')
                .forEach(element => element.classList.remove('rooms__btn--active'))


                    update()

            })

        // Обработка события клик по номеру пагинации и по кнопкам следующая и предыдущая
        document
            .querySelector('[data-pagination]')
            .addEventListener('click', function(event){

                const eventElement = event.target.textContent
                
                event.preventDefault()
                if(eventElement === 'Следующая') {

                    if(pagination.currentPage <= pagination.commonPage) {
                 
                    pagination.currentPage = pagination.currentPage + 1
                    
                    update()
                    }
                }
                else if (eventElement === 'Предыдущая') {


                    if(pagination.currentPage > 1) {
    
                    pagination.currentPage = pagination.currentPage - 1
                      
                    update()

                    } else {
                        pagination.currentPage = 1
                    }
                }
                else {
                    const number = parseInt(eventElement)
                    if (number !== pagination.currentPage) {
                        pagination.currentPage = number
                        update()
                    }     

                }

                
            })

      

        Model.dispatch = update
        update()



        // Запрашиваем базу данных с сервера
        fetch('/json/database.json') 
            .then(answer => answer.json())
            .then(data => {
                const selectElement = View.generateLabelFilter(data)
                document.querySelector('[data-filter-label]').innerHTML = selectElement.innerHTML

                pagination.commonPage = Math.ceil(data.length / pagination.flatInPage)

                pagination.currentPage = 1 
                
                Model.setData(data)
               
        })

        
        
    }

    function update () {

        const originalData = Model.getFlats()

        const data = applyFilterAndSort(originalData)
        const viewMode = Model.getViewMode()

        
        const showcasePlace = document.querySelector('[data-viewmode-showcase]')
        const listcasePlace = document.querySelector('[data-viewmode-listcase]')
        
        const showcaseButton = document.querySelector('[data-viewmode-showcase-button]')
        const listcaseButton = document.querySelector('[data-viewmode-listcase-button]')
        
        
        showcaseButton.classList.remove('view-options__type-item--active')
        listcaseButton.classList.remove('view-options__type-item--active')
        
        showcasePlace.style.display = 'none'
        listcasePlace.style.display = 'none'
        
        if (viewMode === 'showcase') {
            showcaseButton.classList.add('view-options__type-item--active')
            showcasePlace.style.display = ''
            
            const showCaseElement = View.getShowcaseElement(data)
            showcasePlace.innerHTML = ''
            showcasePlace.append(showCaseElement)
            
        }
         else 
         {
             listcaseButton.classList.add('view-options__type-item--active')   
             listcasePlace.style.display = ''

             const listCaseElement = View.getListcaseElement(data)
          
             listcasePlace.innerHTML = ''
             listcasePlace.append(listCaseElement)

        }

        document.querySelector('[data-show-if-filter]').style.display = isFiltred() ? '' : 'none'


        // Обработчик клика по карточки или по списку

        if (viewMode === 'showcase') {

            const cards = document.querySelectorAll('.card')
            cards.forEach(x => x.addEventListener('click', function(event) {
            
                const strLinkOfCards = this.firstElementChild.firstElementChild.href
                const indexOfId = strLinkOfCards.indexOf('id')
                const onlyId = parseInt(strLinkOfCards.slice(indexOfId + 3))

                localStorage.setItem('pressCard', JSON.stringify(onlyId))

                
                // localStorage.setItem
                console.log(data)

                
                for (const element of data) {
                    if(element.id === onlyId) {

                        localStorage.setItem('element', JSON.stringify(element))      
                    }
                }
                
                window.open('elementCard.html')
                
                
            }))
            
        }
        else {
            const panels = document.querySelectorAll('.panel')
            panels.forEach(x => x.addEventListener('click', function(event){
                console.log(this)
            }))
            console.log(panels)
        }


        //Обработка события click on like in cards
        const likeElements = document.querySelectorAll('[data-like]')

        likeElements.forEach(x => x.addEventListener('click', function(event){
            event.preventDefault()
            const stringFromHref = this.previousElementSibling.href
            const indexOfId = stringFromHref.indexOf('id')
            const subStringOfHref = stringFromHref.slice(indexOfId)
            
            const numberOfId = parseInt(subStringOfHref.slice(3))
           
           

            for(const element of originalData) {

                if (element.id === numberOfId) {
                    element.like = !element.like
                    Model.setData(originalData)
                }
            }

            
        }))

         //Обработка события click по like in list
         const likeListElements = document.querySelectorAll('[data-like-list]')

         likeListElements.forEach(x => x.addEventListener('click', function(event){
             event.preventDefault()

            const linkOfListCard = this.parentElement.parentElement.children[1].lastElementChild.href

            const indexOfId = linkOfListCard.indexOf('id')
            const subStringOfHref = linkOfListCard.slice(indexOfId)

            const listCardId = parseInt(subStringOfHref.slice(3)) 
           

             console.log(listCardId)
             for(const element of originalData) {
                   
                 if (element.id === listCardId) {
                     
                     element.like = !element.like
                 
                     Model.setData(originalData)
                 }
             }
 
             
         }))
        
    }

    // Функция фильтрации и сортировки     
    function applyFilterAndSort (flats) {
        if(filters.label) {
            flats = flats.filter(x => x.label === filters.label)
        }
            
        if (filters.rooms) {
            flats = flats.filter(x => filters.rooms.includes(x.rooms))
        }

        if (filters.price.max !== null) {
            flats = flats.filter(x => x.price <= filters.price.max )
        }

        if (filters.price.min !== null) {
            flats = flats.filter(x => x.price >= filters.price.min )
        }

        if (filters.square.max !== null) {
            flats = flats.filter(x => x.square <= filters.square.max )
        }

        if (filters.square.min !== null) {
            flats = flats.filter(x => x.square >= filters.square.min )
        }

        if (filters.sort) {
            let sortFunction = () => {}
            switch(filters.sort) {
                case 'priceToUp':
                    sortFunction = (a, b) => a.price - b.price
                    break
                
                case 'priceToDown':
                    sortFunction = (a, b) => b.price - a.price
                    break

                case 'squareToUp':
                    sortFunction = (a, b) => a.square - b.square
                    break

                case 'squareToDown':
                    sortFunction = (a, b) => b.square - a.square
                    break
            }

            flats = flats.sort(sortFunction)

        }

        // Вставляем кол- во объектов найденных после фильтрации
        document.querySelector('[data-filtered-number]').textContent = flats.length
        
        // Убираем все страницы пагинации
        const paginationElement = document.querySelector('.pagination')
        paginationElement
            .querySelectorAll('.pagination__page')
            .forEach(element => element.remove())

        pagination.commonPage = Math.ceil(flats.length / pagination.flatInPage)

        if (pagination.currentPage > pagination.commonPage) {
            pagination.currentPage = 1
        }

        for(let i = 0; i < pagination.commonPage; i++) {
            // <a href="#" class="pagination__page">1</a>

             const aElement = document.createElement('a')
             aElement.href = '#'
             aElement.className = 'pagination__page'
             aElement.textContent = i + 1
            paginationElement.insertBefore(aElement, paginationElement.lastElementChild)

            if (i === pagination.currentPage - 1) {
                aElement.classList.add('pagination__page--active')
            }

        }

        const fromIndex = (pagination.currentPage - 1) * pagination.flatInPage
        const toIndex = pagination.currentPage * pagination.flatInPage - 1


        flats = flats.filter((x, i) => fromIndex <= i && i <= toIndex)

        return flats
    }

    
 
})();