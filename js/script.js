
var map;
function initMap(){
  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  const form = document.querySelector('.form');
  const description = document.querySelector('input[name="description"]');
  const address = document.querySelector('input[name="address"]');
  const number = document.querySelector('input[name="number"]');
  const coords = document.querySelector('input[name="coords"]');
  const category = document.querySelector('input[name="category"]');

  form.addEventListener('submit', function (e){
    e.preventDefault()
    
    console.log ({
      description: description.value,
      address: address.value,
      number: number.value,
      coords: coords.value,
      category: category.value
    })
  })
}


