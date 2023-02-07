//FUNCIONES
function calculo_interes(dinero, cuotas) {
  let interes = "";
  if (cuotas == 3) {
    interes = dinero * 0.3;
    return interes;
  } else if (cuotas == 6) {
    interes = dinero * 0.6;
    return interes;
  } else if (cuotas == 12) {
    interes = dinero * 0.8;
    return interes;
  } else {
    return false;
  }
}

//VARIABLES
let continuar = "";
let listado_prestamos = [];
let monto = "";
let cuotas = "";
let id_buscado = "";

//CLASS PRESTAMO
class Prestamo {
  constructor(monto, cuotas, interes, monto_total, monto_cuotas) {
    this.id = this.getNextId(listado_prestamos.length);
    this.monto = monto;
    this.cuotas = cuotas;
    this.interes = interes;
    this.monto_total = monto_total;
    this.monto_cuotas = monto_cuotas;
  }

  getNextId = (LastId) => LastId + 1;
}

//SIMULA PRESTAMO Y LUEGO PREGUNTA SI QUIERE SOLICITAR EL PRESTAMO SIMULADO
let simular = document.getElementById("simular");

simular.addEventListener("click", function () {
  monto = document.getElementById("monto");
  monto = parseFloat(monto.value);
  cuotas = document.getElementById("cuotas");
  cuotas = parseInt(cuotas.value);
  if (cuotas == 3 || cuotas == 6 || cuotas == 12) {
    let resultados = document.getElementById("resultado_simulacion");
    let datos = document.createElement("ul");
    datos.innerHTML = `<li>El monto de dinero que desea solicitar es de $${monto}</li>
    <li>La cantidad de cuotas solicitadas es de ${cuotas} cuotas</li>
    <li>El interes es de $${calculo_interes(monto, cuotas)}</li>
    <li>Costo de cuota mensual: $${(
      (monto + calculo_interes(monto, cuotas)) /
      cuotas
    ).toFixed(2)}</li>
    <li>Costo del total del crédito: $${(
      monto + calculo_interes(monto, cuotas)
    ).toFixed(2)}</li>`;

    resultados.append(datos);

    let continuar = document.createElement("div");
    continuar.innerHTML = `<h2>¿Querés solicitar el préstamo que simulaste?</h2>
      <button class="inputBoton" id="solicitar">Solicitar préstamo</button>
      <button class="inputBoton" id="volver"><a href="simulador.html" class="nav-link active">Volver a simular</a></button>`;
    resultados.append(continuar);

    //SOLICITAR PRESTAMO SIMULADO
    let solicitar = document.getElementById("solicitar");
    solicitar.addEventListener("click", function () {
      if (listado_prestamos.length < 3) {
        let nuevo_prestamo = new Prestamo(
          monto,
          cuotas,
          calculo_interes(monto, cuotas),
          monto + calculo_interes(monto, cuotas),
          (monto + calculo_interes(monto, cuotas)) / cuotas
        );

        let recupero_prestamos = localStorage.getItem("prestamos");
        recupero_prestamos = JSON.parse(recupero_prestamos);

        if (recupero_prestamos) {
          listado_prestamos = recupero_prestamos;
        }

        listado_prestamos.push(nuevo_prestamo);
        let prestamos_JSON = JSON.stringify(listado_prestamos);
        localStorage.setItem("prestamos", prestamos_JSON);

        continuar.innerHTML = `<h2>Usted ha solicitado ${listado_prestamos.length} prestamo/s exitosamente</h2>`;
        resultados.append(continuar);
      } else {
        continuar.innerHTML = `<h2>Usted ha alcanzado el límite de préstamos</h2>`;
        resultados.append(continuar);
      }
    });
  } else {
    alert("Cantidad de cuotas incorrecta");
  }
});
