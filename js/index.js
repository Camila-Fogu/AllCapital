//CLIMA
let key = "bbf8893c6e8030e157bb633d11a66e17";

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&units=metric&lang=es&appid=" +
    key
)
  .then((response) => response.json())
  .then((data) => {
    let resultado_clima = document.getElementById("resultado_clima");
    continuar = document.createElement("div");
    continuar.innerHTML = `<span>El clima en tu ciudad es:</span>
    <p>Temp: ${data.main.temp} - ${data.weather[0].description}</p>`;
    resultado_clima.append(continuar);
  });
