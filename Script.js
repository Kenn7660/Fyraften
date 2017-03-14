var myCenter = {lat: 55.683295, lng: 12.571506};
var map;

function initMap() {
    console.log("Map bliver vist")
    map = new google.maps.Map(document.querySelector("#map"),{
        zoom: 13,
        center: myCenter
    });
}

function createMarker(){
    var marker = new google.maps.Marker({
        position: {lat: 55.683295, lng: 12.571506},
        map: map,
        title: "Marker",
    });

//    var infoWindow = new google.maps.InfoWindow({
//        content: "Bliver overskrevet",
//        position: info.position
//    });
//
//    marker.addListener("click", function(){
//        var klon = document.querySelector("#template_indhold").content.cloneNode(true);
//        klon.querySelector(".navn").textContent = info.navn;
//        klon.querySelector(".beskrivelse").textContent = info.beskrivelse;
//        klon.querySelector(".billede").src = info.billede;
//        infoWindow.setContent(klon);
//        infoWindow.open(map);
//    });

}
