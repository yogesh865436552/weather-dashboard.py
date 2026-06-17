// Application Constants and Settings Config
const API_KEY = '5de54f7fc07562b92cb0dd437e39c058'; // <-- Place your valid OpenWeather API key here
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// UI Component DOM References Selector Matrix
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIconEl = document.getElementById('theme-icon');
const searchInputEl = document.getElementById('city-search');
const searchActionBtn = document.getElementById('search-btn');
const geolocationBtn = document.getElementById('geo-btn');

// View Panel Component Selectors
const contentMainView = document.getElementById('weather-content');
const loadingViewPanel = document.getElementById('loading-state');
const errorViewPanel = document.getElementById('error-state');
const errorMessageTxt = document.getElementById('error-message');

// Target Metrics Text Bind Nodes
const locNameDisplay = document.getElementById('location-name');
const currentDateDisplay = document.getElementById('current-date');
const mainTempDisplay = document.getElementById('main-temperature');
const condDescDisplay = document.getElementById('weather-description');
const mainHeroIconImg = document.getElementById('weather-hero-icon');

const feelsLikeNode = document.getElementById('feels-like-val');
const humidityNode = document.getElementById('humidity-val');
const windNode = document.getElementById('wind-val');
const pressureNode = document.getElementById('pressure-val');

/* =========================================================================
   1. Theme Management System (Light / Dark Model Tracker)
   ========================================================================= */
function initThemeTracker() {
    // Check localStorage cache or user system platform properties configuration
    const cachedTheme = localStorage.getItem('dashboard-ui-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const activeTheme = cachedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', activeTheme);
    updateThemeIconStyle(activeTheme);
}

function alternateThemeMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const prospectiveTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', prospectiveTheme);
    localStorage.setItem('dashboard-ui-theme', prospectiveTheme);
    updateThemeIconStyle(prospectiveTheme);
}

function updateThemeIconStyle(theme) {
    if (theme === 'dark') {
        themeIconEl.setAttribute('name', 'sunny-outline');
    } else {
        themeIconEl.setAttribute('name', 'moon-outline');
    }
}

/* =========================================================================
   2. Core Async Data Processing Center (API Connector Channels)
   ========================================================================= */
async function retrieveWeatherSnapshot(endpointQuery) {
    displayProcessingState();
    
    try {
        const networkResponse = await fetch(`${BASE_URL}?${endpointQuery}&units=metric&appid=${API_KEY}`);
        
        if (!networkResponse.ok) {
            if (networkResponse.status === 404) {
                throw new Error("Target location not found. Try variations.");
            } else if (networkResponse.status === 401) {
                throw new Error("Invalid API key configuration. Verify parameters.");
            } else {
                throw new Error("System error occurred connecting to external network.");
            }
        }
        
        const validJSONPayload = await networkResponse.json();
        renderMetricInterface(validJSONPayload);
        
    } catch (caughtExecutionError) {
        displayExceptionCard(caughtExecutionError.message);
    }
}

function fetchCityTargetWeather() {
    const refinedSearchToken = searchInputEl.value.trim();
    if (!refinedSearchToken) return;
    
    retrieveWeatherSnapshot(`q=${encodeURIComponent(refinedSearchToken)}`);
}

function processNativeGeolocation() {
    if (!navigator.geolocation) {
        displayExceptionCard("Geolocation coordinates tracing module unsupported in browser context.");
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        (successCoordinates) => {
            const lat = successCoordinates.coords.latitude;
            const lon = successCoordinates.coords.longitude;
            retrieveWeatherSnapshot(`lat=${lat}&lon=${lon}`);
        },
        () => {
            displayExceptionCard("Permission to trace client positioning matrix blocked by system policy.");
        }
    );
}

/* =========================================================================
   3. DOM Rendering Engine (UI Layer Mutations)
   ========================================================================= */
function renderMetricInterface(dataPayload) {
    // Hide progress notifications metrics frames
    loadingViewPanel.classList.add('hidden');
    errorViewPanel.classList.add('hidden');
    contentMainView.classList.remove('hidden');

    // Assign text content blocks mapping to payload properties
    locNameDisplay.textContent = `${dataPayload.name}, ${dataPayload.sys.country}`;
    currentDateDisplay.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long', month: 'short', day: 'numeric'
    });

    mainTempDisplay.textContent = Math.round(dataPayload.main.temp);
    condDescDisplay.textContent = dataPayload.weather[0].description;
    
    // Dynamically query high-resolution dynamic weather icons from OpenWeatherMap CDN
    const openWeatherIconCode = dataPayload.weather[0].icon;
    mainHeroIconImg.src = `https://openweathermap.org/img/wn/${openWeatherIconCode}@4x.png`;

    // Process Grid metrics displays values assignments
    feelsLikeNode.textContent = `${Math.round(dataPayload.main.feels_like)}°C`;
    humidityNode.textContent = `${dataPayload.main.humidity}%`;
    windNode.textContent = `${(dataPayload.wind.speed * 3.6).toFixed(1)} km/h`; // Converts meters/sec to km/h
    pressureNode.textContent = `${dataPayload.main.pressure} hPa`;
}

function displayProcessingState() {
    loadingViewPanel.classList.remove('hidden');
    errorViewPanel.classList.add('hidden');
    contentMainView.classList.add('hidden');
}

function displayExceptionCard(messageString) {
    loadingViewPanel.classList.add('hidden');
    contentMainView.classList.add('hidden');
    errorViewPanel.classList.remove('hidden');
    errorMessageTxt.textContent = messageString;
}

/* =========================================================================
   4. Wire Events and Execution Hooks Initializer
   ========================================================================= */
themeToggleBtn.addEventListener('click', alternateThemeMode);
searchActionBtn.addEventListener('click', fetchCityTargetWeather);
geolocationBtn.addEventListener('click', processNativeGeolocation);

// Allow execution of query logic when user triggers the 'Enter' hardware key
searchInputEl.addEventListener('keydown', (keyboardEvent) => {
    if (keyboardEvent.key === 'Enter') {
        fetchCityTargetWeather();
    }
});

// App Startup Initializers Bootstrapping
initThemeTracker();
retrieveWeatherSnapshot("q=London"); // Default baseline dashboard snapshot rendering fallback
