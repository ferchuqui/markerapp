
var map;
function initMap(){
  const form = document.querySelector('.form');
  const description = document.querySelector('input[name="description"]');
  const address = document.querySelector('input[name="address"]');
  const number = document.querySelector('input[name="number"]');
  const coords = document.querySelector('input[name="coords"]');
  const category = document.querySelector('input[name="category"]');

  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  const addMarker = function(marker){
    var marker = new google.maps.Marker({
      position: marker.coords,
      map: map
    });
  }

  form.addEventListener('submit', function (e){
    e.preventDefault()
    const [lat, lng] = coords.value.split(',');
    const marker = {
      description: description.value,
      address: address.value,
      number: number.value,
      coords: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      },
      category: category.value
    }
    addMarker(marker);
  })
}


