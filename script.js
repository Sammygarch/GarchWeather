const apiKey = "90647326293b1d909fb8e234621bfd11";
async  function getCoords(city) {
    let URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    try {
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data);
        let latitude =  data[0].lat
        let longitude = data[0].lon
        let coords = [latitude, longitude];
        return coords;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}

function formatCity(city) {
    // Formats the city so that the first letter is capitalised and the rest is lower case.
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    return city
}
async function getWeather(city) {
    try {
        let coords = await getCoords(city);
        let URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coords[0]}&lon=${coords[1]}&appid=${apiKey}&units=metric`;
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data)
        return data;
    } catch(error) {
        console.error('Error fetching weather', error);
        throw error;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submit").addEventListener("click", async function(event) {
        event.preventDefault();
        let city = document.getElementById("search").value;
        document.getElementById("city").innerHTML = formatCity(city);
        let weather = await getWeather(city);
        let current = weather.current
        document.getElementById("temp").innerHTML = current.temp + '°C';
    });
});    