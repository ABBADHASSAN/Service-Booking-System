// waits until whole page loads
document.addEventListener('DOMContentLoaded', function() {
  loadData();
  document.getElementById('book-btn').addEventListener('click', bookService);
});

// fetch data from json
function loadData() {
  fetch('data.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data); 
      populateCities(data.cities);
    })
    .catch(function(error) {
      console.error('Failed to load data:', error);
    });
}
function populateCities(cities) {
  allCities = cities;
  const citySelect = document.getElementById('city-selector');

  cities.forEach(function(city) {
    const option = document.createElement('option'); // creates <option></option>
    option.value = city.name;                        // <option value="Lahore">
    option.textContent = city.name;                  // <option>Lahore</option>
    citySelect.appendChild(option);                  // adds it to the dropdown
  });
  citySelect.addEventListener('change',function(){
    const selected_city = citySelect.value;
    const city_data = allCities.find(function(city){
        return city.name === selected_city

    });
    if(city_data){
        populateServices(city_data.services)
    }
  })
}

function populateServices(services){
const service_selector = document.getElementById('service-select');
    service_selector.innerHTML = '<option value="">-- Select Service --</option>'
    service_selector.disabled = false;

    services.forEach(function(service){
        const option = document.createElement('option');
        option.value = service.name;
        option.textContent = service.name;
        service_selector.appendChild(option);
    });

    service_selector.addEventListener('change', function(){
        const selected_service = service_selector.value;
        const service_data = services.find(function(service){
            return service.name === selected_service;
        });
        if(service_data){
            populateProviders(service_data.providers);
        }
    });

}

function populateProviders(providers){
    const provider_selector = document.getElementById('providers-list');
    provider_selector.innerHTML = '';
    providers.forEach(function(provider){

        // creating a div for each provider
        const option = document.createElement('div');
        option.className = 'provider-card';

            // adding span for name and rating inside the div
            const nameSpan = document.createElement('span');
            nameSpan.className='Provider-name' ;
            nameSpan.textContent = provider.name ;

            const rating = document.createElement('span');
            rating.className='Provider-rating' ;
            rating.textContent = provider.rating ;

            option.appendChild(nameSpan);
            option.appendChild(rating);


            option.addEventListener('click', function(){
                document.querySelectorAll('.provider-card').forEach(function(el){
                    el.classList.remove('selected');
                });
                option.classList.add('selected');
                selected_provider = provider;
                document.getElementById('selected-provider-display').textContent = 'Provider: ' + provider.name;
                document.getElementById('book-btn').disabled = false;
            });


        provider_selector.appendChild(option);
    });

}


function checkAvailability() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const random = Math.random();
      if (random > 0.3) {
        resolve("Provider is available");
      } else {
        reject("Provider is unavailable");
      }
    }, 1500);
  });
}

function processBooking() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("Booking processed");
    }, 1000);
  });
}

function sendConfirmation() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("Confirmation sent");
    }, 1000);
  });
}



async function bookService(){
    const status = document.getElementById('status-message');
    const bookBtn = document.getElementById('book-btn');
    try{
        bookBtn.disabled = true;
        status.textContent = "Checking provider availability...";
        await checkAvailability();
        status.textContent = "Provider is available";
        status.className = 'status-processing';
        await processBooking();
        status.textContent = "Booking processed";
        status.className = 'status-processing';
        await sendConfirmation();
        status.textContent = "Confirmation sent";
        status.className = 'status-success';

        // adding summary after booking success
        const summary = document.getElementById('booking-summary');
        summary.style.display = 'block';
        summary.innerHTML = `<h3>Booking Summary</h3>
        <p><strong>City:</strong> ${document.getElementById('city-selector').value}</p>
        <p><strong>Service:</strong> ${document.getElementById('service-select').value}</p>
        <p><strong>Provider:</strong> ${selected_provider.name} (Rating: ${selected_provider.rating})</p>
        `;
    } catch (error) {
        status.className = 'status-error';
        status.textContent = "Error occurred while booking service";
    }
    bookBtn.disabled = false;

}

let allCities =[]
let selected_provider = null;