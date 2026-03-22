// Function definitions
async function getCoordinates(city) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const response = await fetch(geoUrl);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
        return {
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude,
            name: data.results[0].name,
            country: data.results[0].country
        };
    }
    throw new Error('City not found');
}

async function getGeocodingSuggestions(city) {
    if (!city || city.trim().length === 0) return [];
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;
    const response = await fetch(geoUrl);
    const data = await response.json();
    return data.results || [];
}

async function getWeather(lat, lon) {
    const params = {
        latitude: lat,
        longitude: lon,
        current_weather: true,
        hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m"
    };
    
    let query = new URLSearchParams(params).toString();
    query = query.replace('current_weather=true', 'current_weather=true'); 
    
    let response = await fetch(`https://api.open-meteo.com/v1/forecast?${query}`);
    return await response.json();
}

function calculateAverage(nums){
    return nums.reduce((acc,num)=> acc + num, 0)/nums.length;
}

function getWeatherDescription(code) {
    if (code === 0) return 'Clear sky';
    if (code <= 3) return 'Partly cloudy';
    if (code <= 49) return 'Foggy';
    if (code <= 59) return 'Drizzle';
    if (code <= 69) return 'Rainy';
    if (code <= 79) return 'Snowy';
    return 'Stormy';
}

// DOM Elements
const searchWrapper = document.querySelector('.search-wrapper');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('suggestions-list');
const weatherCard = document.getElementById('weather-card');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const avgTempElement = document.getElementById('avg-temp');
const errormsg = document.getElementById('error-message');

let debounceTimer;

// Handle typing for autocomplete suggestions
searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();
    
    if (query.length === 0) {
        suggestionsList.classList.add('hidden');
        suggestionsList.innerHTML = '';
        return;
    }

    debounceTimer = setTimeout(async () => {
        try {
            const results = await getGeocodingSuggestions(query);
            if (results.length > 0) {
                renderSuggestions(results);
            } else {
                suggestionsList.classList.add('hidden');
            }
        } catch (err) {
            console.error(err);
        }
    }, 300);
});

// Render the autocomplete results in the dropdown
function renderSuggestions(results) {
    suggestionsList.innerHTML = '';
    results.forEach(loc => {
        const li = document.createElement('li');
        li.className = 'suggestion-item';
        
        let stateText = loc.admin1 ? `${loc.admin1}, ` : '';
        let countryText = loc.country || '';
        
        li.innerHTML = `
            <span class="suggestion-name">${loc.name}</span>
            <span class="suggestion-country">${stateText}${countryText}</span>
        `;
        
        li.addEventListener('click', () => {
            searchInput.value = loc.name;
            suggestionsList.classList.add('hidden');
            processWeatherForLocation(loc);
        });
        
        suggestionsList.appendChild(li);
    });
    suggestionsList.classList.remove('hidden');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    // Only check if searchWrapper exists because we added it
    if (searchWrapper && !searchWrapper.contains(e.target)) {
        suggestionsList.classList.add('hidden');
    }
});

// Standardize processing flow for fetching actual weather data
async function processWeatherForLocation(locationData) {
    try {
        errormsg.classList.add('hidden');
        weatherCard.classList.remove('active');
        searchInput.blur();
        
        const weatherData = await getWeather(locationData.latitude, locationData.longitude);
        
        locationElement.textContent = `${locationData.name}, ${locationData.country}`;
        const currentTemp = weatherData.current_weather.temperature;
        temperatureElement.textContent = `${currentTemp}°C`;
        
        const avgTemp = calculateAverage(weatherData.hourly.temperature_2m).toFixed(1);
        avgTempElement.textContent = `24h Avg: ${avgTemp}°C`;
        
        const code = weatherData.current_weather.weathercode;
        descriptionElement.textContent = getWeatherDescription(code);

        weatherCard.classList.add('active');
    } catch (error) {
        console.error(error);
        errormsg.textContent = error.message || 'Error fetching weather.';
        errormsg.classList.remove('hidden');
    }
}

// Event listener for manual form submission
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (!city) return;
    
    suggestionsList.classList.add('hidden');

    try {
        // Fallback to top result if user hits enter instead of clicking a suggestion
        const locationData = await getCoordinates(city);
        await processWeatherForLocation(locationData);
    } catch (error) {
        console.error(error);
        errormsg.textContent = error.message;
        errormsg.classList.remove('hidden');
    }
});

// Initial load (using original file's coordinate configuration)
async function init() {
    try {
        const defaultLat = 19.0728;
        const defaultLon = 72.8826;
        
        const weatherData = await getWeather(defaultLat, defaultLon);
        
        locationElement.textContent = `Mumbai, IN`;
        const currentTemp = weatherData.current_weather.temperature;
        temperatureElement.textContent = `${currentTemp}°C`;
        
        const avgTemp = calculateAverage(weatherData.hourly.temperature_2m).toFixed(1);
        avgTempElement.textContent = `24h Avg: ${avgTemp}°C`;
        
        descriptionElement.textContent = getWeatherDescription(weatherData.current_weather.weathercode);
        weatherCard.classList.add('active');
    } catch (e) {
        console.error(e);
    }
}

// Start app
document.addEventListener('DOMContentLoaded', init);