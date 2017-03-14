var myCenter = {lat: 55.683295, lng: 12.571506};
var map;

function initMap() {
    console.log("Map bliver vist")
    map = new google.maps.Map(document.querySelector("#map"),{
        zoom: 13,
        center: myCenter
    });
}
