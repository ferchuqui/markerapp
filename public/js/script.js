
var map;
const places = [];
function removeElement(id) {
  places.find(place => place.info.id === id).marker.setMap(null)
  fetch(`/markers/${id}`, {
    method: 'delete'
  })
}

function initMap(){
  const form = document.querySelector('.form');
  const description = document.querySelector('[name="description"]');
  const address = document.querySelector('[name="address"]');
  const number = document.querySelector('[name="number"]');
  const coords = document.querySelector('[name="coords"]');
  const category = document.querySelector('[name="category"]');
  const success = document.querySelector('.msg-success')
  const autoComplete = new google.maps.places.Autocomplete(address);
  let infowindow;

  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: -34.60368440000001, lng: -58.381559100000004},
    zoom: 8,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  });

  map.addListener('click', () => {
    if(infowindow) infowindow.close()
  })

  const validateDescription = () => {
    return description.value !== ""
  }
  const validateAddress = () => {
    return address.value !== ""
  }
  const validateCoords = () => {
    const [lat, lng] = coords.value.split(',');
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    return !(isNaN(parsedLat) || isNaN(parsedLng) || parsedLat < -90 || parsedLat > 90 || parsedLng < -180 || parsedLng > 180)
  }
  const valid = () => {
    return {
      description: validateDescription(),
      address: validateAddress(),
      coords: validateCoords()
    }
  }

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
      <a href="#" onclick="removeElement('${marker.id}')">Borrar</a>
      </ul>
    `
  }

  const addMarker = function(marker){
    const pin = new google.maps.Marker({
      position: marker.coords,
      map: map
    });
    pin.addListener('click', function() {
      if(infowindow) infowindow.close()
      infowindow = new google.maps.InfoWindow({
        content: markerTemplate(marker)
      });
      infowindow.open(map, pin);
    });
    places.push({ info: marker, marker: pin })
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
    const validations = valid()
    Object.keys(validations).forEach((key) => {
      if(validations[key]) {
        document.querySelector(`[data-name=${key}]`).innerText = "";
        return 
      }
      document.querySelector(`[data-name=${key}]`).innerText = "Este campo no cumple las condiciones";
    })
    fetch('/markers', {
      method: 'post',
      body: JSON.stringify(marker),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((res) => {
      addMarker({ id: res.id, ...marker });

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


