
var map;
function initMap(){
  const form = document.querySelector('.form');
  const description = document.querySelector('input[name="description"]');
  const address = document.querySelector('input[name="address"]');
  const number = document.querySelector('input[name="number"]');
  const coords = document.querySelector('input[name="coords"]');
  const category = document.querySelector('input[name="category"]');
  const places = [];

  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  const addMarker = function(marker){
    const pin = new google.maps.Marker({
      position: marker.coords,
      map: map
    });
    places.push(marker)
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
    fetch('/markers', {
      method: 'post',
      body: JSON.stringify(marker),
      headers:{
        'Content-Type': 'application/json'
      }
    })
  })

  fetch('/markers')
    .then(res => res.json())
    .then(markers => markers.forEach(addMarker))
}


