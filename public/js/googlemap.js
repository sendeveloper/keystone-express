var map;
function initMap(){
  if (document.getElementById('map') != undefined)
  {
    map = new google.maps.Map(document.getElementById('map'),{
      center: {lat: -20.917574, lng: 142.702789},
      zoom: 8
    });
  }
}