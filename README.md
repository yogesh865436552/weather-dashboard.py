# Interactive Weather Dashboard

A modern, responsive weather dashboard built with vanilla HTML, CSS, and JavaScript. Displays real-time weather information with a beautiful dark/light theme toggle.

## Features

- 🌡️ **Real-time Weather Data** - Fetches current weather from OpenWeatherMap API
- 🔍 **City Search** - Search for weather in any city worldwide
- 📍 **Geolocation** - Get weather for your current location
- 🌙 **Dark/Light Theme** - Toggle between dark and light UI themes
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Clean, intuitive interface with Ionicons

## Weather Information Displayed

- Current temperature and "feels like" temperature
- Weather description (e.g., overcast clouds, clear sky)
- Humidity percentage
- Wind speed (km/h)
- Atmospheric pressure (hPa)
- Weather icon

## Getting Started

### Prerequisites

- A web browser (Chrome, Firefox, Safari, Edge)
- An OpenWeatherMap API key (free tier available)

### Setup

1. **Get an API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Update the API key in `script.js` (line 2)

2. **Run Locally**
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:8000`

## Project Structure

```
weather-dashboard.py/
├── index.html       # Main HTML structure
├── style.css        # Styling and theme definitions
├── script.js        # JavaScript logic and API integration
├── requirements.txt # Project dependencies (frontend only)
├── README.md        # Documentation
└── .gitignore       # Git ignore rules
```

## Configuration

Edit `script.js` to update:
- `API_KEY` - Your OpenWeatherMap API key
- `BASE_URL` - OpenWeatherMap API endpoint (default is correct)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## API Usage

This project uses the [OpenWeatherMap Current Weather API](https://openweathermap.org/current)

**API Key Required**: Free tier available with 1,000 calls/day limit

## Theme System

The app stores theme preference in `localStorage` and respects system dark mode preferences as fallback.

**Keyboard Shortcuts:**
- `Enter` - Search for a city
- Click theme button to toggle dark/light mode

## Troubleshooting

### API Key Error (401)
- Verify your API key is valid and active
- Check that you haven't exceeded your API quota
- Ensure the free API plan includes the Current Weather endpoint

### Search Not Working
- Verify city name spelling
- Try using city name + country code (e.g., "London, GB")
- Check browser console for errors

### Geolocation Not Working
- Ensure browser has permission to access location
- Check HTTPS is used (geolocation requires secure context)
- Try allowing location permissions in browser settings

## Development

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **APIs**: OpenWeatherMap, Geolocation API
- **Icons**: Ionicons v7
- **Hosting**: HTTP server (local development)

### Code Structure
- **Theme Management** - Dark/light mode switching with localStorage
- **API Integration** - Async fetch calls with error handling
- **DOM Rendering** - Dynamic UI updates based on weather data
- **Event Handling** - Search, geolocation, and theme toggle

## License

Open source - feel free to use and modify

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org)
- Icons by [Ionicons](https://ionicons.com)

## Next Steps

Potential improvements:
- [ ] Add 5-day forecast
- [ ] Add weather alerts
- [ ] Add favorite cities
- [ ] Add unit conversion (°F/°C, mph/km/h)
- [ ] Add weather history graph
- [ ] Deploy to Vercel/Netlify
