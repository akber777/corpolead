var myMap;
ymaps.ready(init);
function init() {
    myMap = new ymaps.Map('map', {
        center: [40.409264, 49.867092],
        zoom: 5,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    }),

        myPlacemark = new ymaps.Placemark([40.409264, 49.867092], {
            balloonContentHeader: "<h1>Corpolead</h1>",
            balloonContentBody: "Bakı şəhəri, Xətai rayonu, Afiyəddin Cəlilov küçəsi 20, 13-cü mərtəbə, 72 mənzil, AZ1025",
            balloonContentFooter: "<a href='tel:+994 12480 0884'>(+994 12) 480 0884</a><br><a href='mailto:hello@corpolead.com'>hello@corpolead.com</a>"
        }, {
            balloonCloseButton: false,
        });

    myPlacemark2 = new ymaps.Placemark([41.008240, 28.978359], {
        balloonContentHeader: "<h1>Corpolead</h1>",
        balloonContentBody: "Adress: Mahmutbey Mah. Taşocağı Cad. No:3,Ağaoğlu My Office 212, Kat: 26,D:432, 34218, Bağcılar / İstanbul",
        balloonContentFooter: "<a href='tel:+90 212 576 1221'>+90 212 576 1221</a><br><a href='mailto:hello@corpolead.com'>hello@corpolead.com</a>"
    }, {
        balloonCloseButton: false,
    });
    myMap.geoObjects.add(myPlacemark).add(myPlacemark2);

    myMap.behaviors.disable('scrollZoom');

    myPlacemark2.balloon.open();

    myPlacemark.balloon.open();



    myMap.events.add('balloonopen', function (event) {

    });
};