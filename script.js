//dom manipulation
const timeElement = document.getElementById('timee');
const dateElement = document.getElementById('datee');
const temperatureElement = document.getElementById('temprature');
const conditionsElement = document.getElementById('conditionss');
const pressureElement = document.getElementById('Pressure');
const humidityElement = document.getElementById('Humidity');
const windSpeedElement = document.getElementById('WindSpeed');
const iconElement = document.getElementById('icon');
const VisibilityElement = document.getElementById('Visibility');
const UVElement = document.getElementById('UV');
const placeElement = document.getElementById('place');
const countryElement = document.getElementById('country');

//search button code
const buttonField = document.getElementById('buttonField')
buttonField.onclick = () => {
    const target = document.getElementById('inputField').value
    fetchData(target);
    document.getElementById('inputField').value = " ";
};

//api 
const target = "new york"
const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=a4d658d2d69345a083792222241802&q=${target}`

        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);

        //taking data for bg and alos removing spcae and conveting to lowercase
        const condition = data.current.condition.text.replace(/\s+/g, '').toLowerCase();;
        console.log(condition);
        const backgroundImage = getBackgroundImage(condition);
        const main = document.getElementById("main")
        main.style.backgroundImage = `url(${backgroundImage})`;

        const { current: { temp_c, pressure_mb, humidity, wind_kph, vis_km, uv, condition: { text, icon } }, location: { name, country, localtime } } = data;
        updateWeatherInformation(temp_c, pressure_mb, humidity, wind_kph, vis_km, uv, name, country, text, icon, localtime);

    } catch (error) {
        alert("Location not found")
    }
};

//formating date in day, date months foramate
function formatDate(dateString) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const date = new Date(dateString);
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];

    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
}


//dom manipulation
function updateWeatherInformation(temp_c, pressure_mb, humidity, wind_kph, vis_km, uv, name, country, text, icon, localtime) {

    const exactime = localtime.split(" ");//dividing date and time and acessing it as array[0][1]....
    const formattedDate = formatDate(exactime[0]);
    const img_url = icon;//icon render

    timeElement.innerText = exactime[1];
    dateElement.innerText = formattedDate;
    temperatureElement.innerText = `${temp_c} °C`;
    pressureElement.innerText = pressure_mb;
    humidityElement.innerText = humidity;
    windSpeedElement.innerText = wind_kph;
    conditionsElement.innerText = text;
    iconElement.src = img_url;
    VisibilityElement.innerText = vis_km;
    UVElement.innerText = uv;
    placeElement.innerText = name;
    countryElement.innerText = country;

}
fetchData(target);

//for bg
function getBackgroundImage(condition) {
    switch (condition) {
        case 'sunny':
            return '/weather/images/sunny.jpg';
        case 'clear':
            return '/weather/images/clear.jpg';
        case 'rainy':
            return '/weather/images/rainy.jpg';
        case 'mist':
            return '/weather/images/mist.jpg';
        case 'lightsnow':
            return '/weather/images/snowfall.jpg';
        case 'cloudy':
            return '/weather/images/cloudy.jpg';
        case 'overcast':
            return '/weather/images/overcast.jpg';
        case 'partlycloudy':
            return '/weather/images/partlycloudy.jpg';
        case 'lightrain':
            return '/weather/images/lightrain.jpg';
        case '':
            return '/weather/images/lightrain.jpg';
        default:
            return '/weather/images/lightrain.jpg';

    }
}

