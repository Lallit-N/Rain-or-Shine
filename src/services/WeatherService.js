import axios from "axios";

// Create Api Key from https://weatherapi.com
const apiKey = "d30f1d4da8a042f1ad2220138221109";

const weatherClient = axios.create({
  baseURL: `http://api.weatherapi.com/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getLocations(query) {
    if (query) {
      return weatherClient.get("/search.json?key=" + apiKey + "&q=" + query);
    }
  },
  getNearbyLocations() {
    return weatherClient.get("/search.json?key=" + apiKey + "&q=auto:ip");
  },
  getWeather(url) {
    return weatherClient.get(
      "/current.json?key=" + apiKey + "&q=" + url + "&aqi=no"
    );
  },
  // Currently, can only get a 3 day forcast from the free Weather API trial
  getWeatherForecast(url) {
    return weatherClient.get(
      "/forecast.json?key=" + apiKey + "&q=" + url + "&days=3&aqi=no&alerts=no"
    );
  },
};
