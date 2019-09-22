
var map;
function initMap(){
  const form = document.querySelector('.form');
  const description = document.querySelector('[name="description"]');
  const address = document.querySelector('[name="address"]');
  const number = document.querySelector('[name="number"]');
  const coords = document.querySelector('[name="coords"]');
  const category = document.querySelector('[name="category"]');
  const success = document.querySelector('.msg-success')
  const places = [];
  const autoComplete = new google.maps.places.Autocomplete(address);

  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  autoComplete.setFields(['geometry'])
  autoComplete.addListener('place_changed', function(){
    const results = autoComplete.getPlace()
    coords.value = `${results.geometry.location.lat()} , ${results.geometry.location.lng()} `
  });


  const markerTemplate = function(marker){
    return `
      <ul>
      <li><b>Descripcion: </b>${marker.description}</li>
      <li><b>Dirección: </b>${marker.address}</li>
      <li><b>Numero Telefonico: </b>${marker.number}</li>
      <li><b>Coordenadas: </b>${marker.coords.lat},${marker.coords.lng}</li>
      <li><b>Categoria: </b>${marker.category}</li>
      </ul>
    `
  }

  const addMarker = function(marker){
    const pin = new google.maps.Marker({
      position: marker.coords,
      map: map
    });
    const infowindow = new google.maps.InfoWindow({
      content: markerTemplate(marker)
    });
    pin.addListener('click', function() {
      infowindow.open(map, pin);
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
    }).then(() => {
      description.value ="";
      address.value="";
      number.value="";
      coords.value=""
      success.classList.remove('hidden')
      setTimeout(() => {
        success.classList.add('hidden')
      }, 5000);
    })
  })

  fetch('/markers')
    .then(res => res.json())
    .then(markers => markers.forEach(addMarker))
}


