const apiKey = "0952ae4f501e40185582c71b5e854945";

const cityInput = document.getElementById("cityInput");

const searchBtn = document.getElementById("searchBtn");

const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function(event){

if(event.key==="Enter"){

getWeather();

}

});

async function getWeather(){

const city=cityInput.value.trim();

if(city===""){

weatherResult.innerHTML="<p class='error'>Please enter a city name.</p>";

return;

}

weatherResult.innerHTML="<p class='loading'>Loading...</p>";

const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try{

const response=await fetch(url);

if(!response.ok){

throw new Error("City not found.");

}

const data=await response.json();

displayWeather(data);

}

catch(error){

weatherResult.innerHTML=`
<p class="error">${error.message}</p>
`;

}

}

function displayWeather(data){

weatherResult.innerHTML=`

<h2>${data.name}, ${data.sys.country}</h2>

<p>🌡 Temperature: <strong>${data.main.temp} °C</strong></p>

<p>🤗 Feels Like: <strong>${data.main.feels_like} °C</strong></p>

<p>💧 Humidity: <strong>${data.main.humidity}%</strong></p>

<p>🌬 Wind Speed: <strong>${data.wind.speed} m/s</strong></p>

<p>☁ Condition: <strong>${data.weather[0].main}</strong></p>

<p>📝 Description: <strong>${data.weather[0].description}</strong></p>

`;

}