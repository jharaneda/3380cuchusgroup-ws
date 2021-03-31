// const API_key = "462cd311fd45adffc615072fc4be6ad4";
// const URL = `http://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=${API_key}&units=metric`;

// const fetchWeather = async () => {
//   const api_call = await fetch(URL)
//     .then((response) => response.json())
//     .then((response) => {
//       ({
//         city: response.name,
//         country: response.sys.country,
//         forecast: response.weather[0].main,
//         temp: response.main.temp,
//         tempFeels: response.main.feels_like,
//         tempMin: response.main.temp_min,
//         tempMax: response.main.temp_max,
//       });
//     });
//     // console.log(api_call)
//     // return api_call;
// };
// exports.getWeatherData = async function (req, res) {
//     fetchWeather()
//     // console.log(fetchWeather());
//     console.log("Received get request to get weather information");
//   res.header("Content-Type: application/json");
//   res.send(JSON.stringify({algo:algo}));
// };
