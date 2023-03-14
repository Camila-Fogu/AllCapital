//CLIMA
let key = "37ec12ccba6532ed39543d37e8da2048";

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Rosario&units=metric&lang=es&appid=" +
    key
)
  .then((response) => response.json())
  .then((data) => {
    let clima = document.getElementById("clima");
    continuar = document.createElement("div");
    continuar.innerHTML = `<span>El clima en Rosario es:</span>
    <p>Temperatura: ${data.main.temp}</p>
    <p>Sensación térmica: ${data.main.feels_like}</p>`;
    clima.append(continuar);
  });
