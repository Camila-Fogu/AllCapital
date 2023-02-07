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
      let recupero_prestamos = localStorage.getItem("prestamos");
      recupero_prestamos = JSON.parse(recupero_prestamos);

      if (recupero_prestamos) {
        listado_prestamos = recupero_prestamos;
      }

      if (listado_prestamos.length <= 3) {
        let nuevo_prestamo = new Prestamo(
          monto,
          cuotas,
          calculo_interes(monto, cuotas),
          monto + calculo_interes(monto, cuotas),
          (monto + calculo_interes(monto, cuotas)) / cuotas
        );

        listado_prestamos.push(nuevo_prestamo);
        let prestamos_JSON = JSON.stringify(listado_prestamos);
        localStorage.setItem("prestamos", prestamos_JSON);

        continuar.innerHTML = `<h2>Usted ha solicitado su prestamo n° ${listado_prestamos.length} exitosamente</h2>
        <button class="inputBoton" id="volver"><a href="simulador.html" class="nav-link active">Simular otro préstamo</a></button>`;
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

let consultar = document.getElementById("consultar");
consultar.addEventListener("click", function () {
  let recupero_prestamos = localStorage.getItem("prestamos");
  recupero_prestamos = JSON.parse(recupero_prestamos);

  if (recupero_prestamos) {
    listado_prestamos = recupero_prestamos;
    let resultado_consulta = document.getElementById("resultado_consulta");
    let arrays = document.createElement("ul");

    console.log(listado_prestamos);

    for (let prestamo of listado_prestamos) {
      arrays.innerHTML = `<li> PRESTAMO N° ${prestamo.id}</li>
      <li> Monto: ${prestamo.monto}</li>
      <li> Cuotas: ${prestamo.cuotas}</li>
      <li> Interes: ${prestamo.interes}</li>
      <li> Monto total a pagar: ${prestamo.monto_total}</li>
      <li> Monto de cada cuota: ${prestamo.monto_cuotas}</li>`;

      resultado_consulta.append(arrays);
    }

    let continuar = document.createElement("div");
    continuar.innerHTML = `<h4>¿Querés cancelar alguno de tus préstamos solicitados?</h4>
    <label>Ingresá el N°</label>
    <input type="number" class="form-control" id="numero_cancelar" />
    <button class="inputBoton" id="cancelar">Cancelar préstamo</button>`;
    resultado_consulta.append(continuar);

    let cancelar = document.getElementById("cancelar");
    cancelar.addEventListener("click", function () {
      let prestamo_cancelar = document.getElementById("numero_cancelar");
      prestamo_cancelar = prestamo_cancelar.value;

      listado_prestamos = listado_prestamos.filter(
        (prestamo) => prestamo.id != prestamo_cancelar
      );
      let prestamos_JSON = JSON.stringify(listado_prestamos);
      localStorage.setItem("prestamos", prestamos_JSON);

      let cancelado = document.createElement("div");
      cancelado.innerHTML = `<h4>El préstamo ha sido cancelado</h4>`;
      resultado_consulta.append(cancelado);
    });
  } else {
    alert("Usted no tiene préstamos solicitados");
  }
});
