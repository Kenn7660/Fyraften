var myCenter = {lat: 55.683295, lng: 12.571506};
var map;

function initMap() {
    console.log("Map bliver vist")
    map = new google.maps.Map(document.querySelector("#map"),{
        zoom: 13,
        center: myCenter
    });
createMarker();
}

function createMarker(){
    console.log("Lav marker");
    var marker = new google.maps.Marker({
        position: {lat: 55.683295, lng: 12.571506},
        map: map,
        title: "Marker",
    });

    var infoWindow = new google.maps.InfoWindow({
        content: "Bliver overskrevet",
        position: {lat: 55.683295, lng: 12.571506},
    });

    marker.addListener("click", function(){
        var klon = document.querySelector("#info").content.cloneNode(true);
        klon.querySelector(".navn").textContent = "Marker ved Nørreport";
        infoWindow.setContent(klon);
        infoWindow.open(map);
    });

}
