//request
const requestOptions = {
method: "GET",
redirect: "follow"
};

fetch("https://api.open-meteo.com/v1/forecast?latitude=43.0481&longitude=-76.1474&hourly=temperature_2m&current=precipitation,temperature_2m,cloud_cover&temperature_unit=fahrenheit&precipitation_unit=inch", requestOptions)
.then((response) => response.text())
.then((text) => JSON.parse(text))
.then((result) => parseData(result))
.catch((error) => console.error(error));

function parseData(result) {
    //grab current precipitation, temperature, and cloud cover
    const current = result.current;
    console.log(current.precipitation);
    console.log(current.temperature_2m);
    console.log(current.cloud_cover);

    //populate info into body of page
    document.getElementById("precipitation").innerText = current.precipitation
    document.getElementById("temperature").innerText = current.temperature_2m

    //cloud cover emoji
    if (current.cloud_cover < 50) {
        document.getElementById("cloudcover").innerText = "☀️"
    }
    else if (current.cloud_cover > 50) {
        document.getElementById("cloudcover").innerText = "☁️"
    }
    else if (current.cloud_cover === 50) {
        document.getElementById("cloudcover").innerText = "⛅"
    }
}