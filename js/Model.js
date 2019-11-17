;(function () {
    'use strict'

    const database = {
        viewMode: 'showcase', // showcase or listcase
        pressElement: null,
        flats: []
    }

    const api = window.Model = {
        dispatch() {}
    }  

    api.setData = function setData(data) {
      database.flats = getDeepCopy(data)
      api.dispatch()
    }

    api.getFlats = function getFlats() {
        
        return getDeepCopy(database.flats)
    }

    api.getViewMode = function getViewMode() {
        return database.viewMode
    }

    api.setViewMode = function setViewMode(viewMode) {
        database.viewMode = viewMode
        api.dispatch()
    }
// Функция глубокого копирования обЪекта
    function getDeepCopy (object) {
        return JSON.parse(JSON.stringify(object))
    }

})();