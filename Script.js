var myCenter = {
    lat: 55.683295,
    lng: 12.571506
};
var map;
var liste;
var infoMarker;
var overlay;

window.addEventListener("load", setTimeout(function () {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");
}, 2000));


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

    var bounds = {
        north: 55.70298416103664,
        south: 55.663595921599494,
        east: 12.674502826171874,
        west: 12.468509173828124,
    }

    overlay = new google.maps.GroundOverlay('overlayKbh-01-01-01.svg', bounds);
    overlay.setMap(map);
    overlay.setOpacity(0);

    var etoverlay = new google.maps.OverlayView();
    etoverlay.draw = function () {
        this.getPanes().markerLayer.id = 'markerLayer';
    };
    etoverlay.setMap(map);

    $.getJSON("fyraften.JSON", importData);

/*Toggle switch */

    document.querySelector("#myonoffswitch").addEventListener("click", function () {

        // find opacity for overlay
        var opa = overlay.getOpacity();
        // hvis det er 1, så sæt det til 0

        if (opa < 1) {
            //overlay.setOpacity(1);
            fadeUp();
        } else {
            //overlay.setOpacity(0);
            fadeDown();
        }

    });

}

function fadeUp() {
    var opa = overlay.getOpacity();
    if (opa < 1) {
        opa = opa + 0.1;
        setTimeout(fadeUp, 50);
    }

    overlay.setOpacity(opa);
}

function fadeDown() {
    var opa = overlay.getOpacity();
    if (opa > 0) {
        opa = opa - 0.1;
        setTimeout(fadeDown, 50);
    }

    overlay.setOpacity(opa);
}

function importData(data) {
    console.log("har loadet JSON");
    liste = data;
    liste.forEach(createMarker);


    findAlleMarkers();

    var myMarker = new google.maps.Marker({
        position: {
            lat: 55.683295,
            lng: 12.571506
        },
        map: map,
        icon: "icon-02.svg"
    });




    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            var minPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            // map.setCenter(minPos);
            myMarker.setPosition(minPos);

            // Vi har flyttet os!
            liste.forEach(function (interessepunkt) {
                //  console.log(interessepunkt);
                var markerPos = new google.maps.LatLng(interessepunkt.position.lat, interessepunkt.position.lng);


                // beregn afstand mellem bruger og marker
                var dist = google.maps.geometry.spherical.computeDistanceBetween(markerPos, minPos);
              //  console.log("distance to " + interessepunkt.navn + " is " + dist);
                if (dist < 20) {
                //    console.warn("TÆT PÅ!!");
                    var selector = "#markerLayer .marker." + interessepunkt.markerclass;

                    console.log("find marker: " + selector);
                    var markerElement = document.querySelector(selector);
                    if (markerElement != null) {
                        markerElement.classList.add("active");
                        interessepunkt.selveMarkeren.setClickable(true);

                    }

                } else {
                    if (markerElement != null) {
                        markerElement.classList.remove("active");
                        interessepunkt.selveMarkeren.setClickable(false);
                    }
                }
            });


        });
    } else {
        alert("Geolocation NOT");
    }
}

//først her ved vi at vi har en JSON fil!



//find all markers

function findAlleMarkers() {
    //udskriv alle markers
    var markerArray = document.querySelectorAll("#markerLayer img");
    //  console.log("alle markers", markerArray);

    if (markerArray.length == 0) {
        //hvis markerArray er lig med nul.. så spørg igen!
        setTimeout(findAlleMarkers, 50);
    } else {
        //marker fundet
        markerArray.forEach(function (domElement, index) {
            //giv domElement klassen "marker"
            domElement.classList.add("marker");
            //og klassen ""markerclass" fra JSON
            domElement.classList.add(liste[index].markerclass);

        });
    }
}




//lav marker ved brug af clone
function createMarker(infoMarker) {
    console.log("Lav marker: ", infoMarker);
    var marker = new google.maps.Marker({
        position: infoMarker.position,
        map: map,
        title: infoMarker.navn,
        icon: infoMarker.icon,
        optimized: false,
        optimized: false,
        clickable: false
    });

    infoMarker.selveMarkeren = marker;


    var infoWindow = new google.maps.InfoWindow({
        content: "Bliver overskrevet",
        position: infoMarker.position,
    });


/*infobox*/


    marker.addListener("click", function () {
        console.log("der er blevet klikket på ikon: ", infoMarker);
        //set data in clone (from infoMarker)

        if(infoMarker.infotype == "instagram") {
        var clone = document.querySelector("#template_insta").content.cloneNode(true);
        clone.querySelector(".navn").textContent = infoMarker.navn;
        clone.querySelector(".beskrivelse").innerHTML = infoMarker.beskrivelse;
        clone.querySelector(".adresse").innerHTML = infoMarker.adresse;
        clone.querySelector(".insta").src = infoMarker.insta;
        infoWindow.setContent(clone);

        } else if(infoMarker.infotype == "quiz") {

        } else {
        var clone = document.querySelector("#template_billede").content.cloneNode(true);
        clone.querySelector(".navn").textContent = infoMarker.navn;
        clone.querySelector(".beskrivelse").innerHTML = infoMarker.beskrivelse;
        clone.querySelector(".adresse").innerHTML = infoMarker.adresse;
        clone.querySelector(".slide1").src = infoMarker.slide1;
        clone.querySelector(".slide2").src = infoMarker.slide2;
        clone.querySelector(".slide3").src = infoMarker.slide3;
        clone.querySelector(".timeLine").src = infoMarker.timeLine;
        infoWindow.setContent(clone);
        }


        infoWindow.open(map);

        showDivs(slideIndex);
    });



}

var slideIndex = 1;


function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.querySelectorAll(".slide");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}
