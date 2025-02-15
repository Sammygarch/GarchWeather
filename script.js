const apiKey = 'c3275fe4fe8a25302ffdd126186f51c1';
function getWeather(city, element) {
    var URL = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            document.getElementById('city').innerHTML = data.location.name;
            element.innerHTML = data.current.temperature + '°C';
        })
        .catch(error => console.error('Error:', error));
}
document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('search').value;
    getWeather(city, document.getElementById('temp'));
});
