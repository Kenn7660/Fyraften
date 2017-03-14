var myCenter = {
    lat: 55.683295,
    lng: 12.571506
};
var map;

function initMap() {
    console.log("Map bliver vist")
    map = new google.maps.Map(document.querySelector("#map"), {
        zoom: 13,
        center: myCenter,
        styles: [{
            "featureType": "all",
            "elementType": "all",
            "stylers": [{
                "saturation": "-29"
            }, {
                "lightness": "0"
            }, {
                "hue": "#ff8d00"
            }]
        }, {
            "featureType": "administrative.country",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.province",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.locality",
            "elementType": "labels",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "administrative.neighborhood",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "lightness": "0"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "saturation": "-50"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{
                "saturation": "5"
            }]
        }, {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry",
            "stylers": [{
                "saturation": "-2"
            }]
        }, {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [{
                "saturation": "-17"
            }]
        }, {
            "featureType": "landscape.natural.terrain",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "saturation": "-64"
            }, {
                "lightness": "-8"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "lightness": "-40"
            }, {
                "saturation": "-61"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#ffffff"
            }, {
                "weight": "1.5"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "color": "#c1bdb5"
            }]
        }]
    });

    $.getJSON("fyraften.JSON", importData);
}

function importData(JSONdata) {
    JSONdata.forEach(createMarker);
}

function createMarker(infoMarker) {
    console.log("Lav marker");
    var marker = new google.maps.Marker({
        position: infoMarker.position,
        map: map,
        title: infoMarker.navn,
        optimized: false
    });

    var infoWindow = new google.maps.InfoWindow({
        content: "Bliver overskrevet",
        position: infoMarker.position,
    });

    marker.addListener("click", function () {
        var clone = document.querySelector("#template_info").content.cloneNode(true);
        console.log("der er blevet klikket på ikon");
        //set data in clone (from infoMarker)

        clone.querySelector(".navn").textContent = infoMarker.navn;
        clone.querySelector(".beskrivelse").innerHTML = infoMarker.beskrivelse;
        clone.querySelector(".adresse").innerHTML = infoMarker.adresse;
        infoWindow.setContent(clone);
        infoWindow.open(map);
    });

}
