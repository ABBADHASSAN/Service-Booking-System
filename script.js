// waits until whole page loads
document.addEventListener('DOMContentLoaded', function() {
  loadData();
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


let allCities =[]
let selected_provider = null;