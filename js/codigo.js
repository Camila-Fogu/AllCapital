//FUNCIONES
function registro(usuario, contraseña, contraseña_rep) {
  usuario = prompt("Ingrese un nombre de usuario: ");
  contraseña = prompt("Ingrese una contraseña: ");
  contraseña_rep = prompt("Por favor, repita la contraseña");

  while (contraseña != contraseña_rep) {
    alert("Las contraseñas no coinciden. Por favor vuelva a ingresarlas");
    contraseña = prompt("Ingrese una contraseña: ");
    contraseña_rep = prompt("Por favor, repita la contraseña");
  }
  console.log(
    "Bienvenido " + usuario + ". Usted se ha registrado correctamente!"
  );
  console.log("");
  alert("Bienvenido " + usuario + ". Usted se ha registrado correctamente!");
}

function login(usuario, contraseña) {
  nombre = prompt("Ingrese su nombre de usuario: ");
  contra = prompt("Ingrese su contraseña");

  while (usuario != nombre || contraseña != contra) {
    alert("Credenciales invalidas, vuelva a ingrasarlas por favor");
    nombre = prompt("Ingrese su usuario: ");
    contra = prompt("Ingrese su contaseña: ");
  }
  console.log("Bienvenido/a " + nombre);
  alert("Bienvenido/a " + nombre);
}

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
let usuario_new = "";
let contraseña_new = "";
let contraseña_newrep = "";
let usuario_def = "camifogu";
let contraseña_def = "123456";
let continuar = "";
let listado_prestamos = [];
let monto = "";
let cuotas = "";
let index = "";
let id_buscado = "";

//CLASES
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

  get_datos() {
    console.log("----------PRESTAMO SOLICITADO---------");
    console.log("EL IDENTIFICADOR DE ESTE PRESTAMO ES:" + this.id);
    console.log("MONTO SOLICITADO: " + this.monto);
    console.log("CUOTAS A PAGAR: " + this.cuotas);
    console.log("INTERES: " + this.interes);
    console.log("MONTO TOTAL A PAGAR: " + this.monto_total);
    console.log("VALOR DE CADA CUOTA: " + this.monto_cuotas);
  }
}

/*LOGIN O REGISTRO
console.log("Somos All Capital");
let estado_registro = prompt("Usted se encuentra registrado? si/no");
if (estado_registro === "no") {
  registro(usuario_new, contraseña_new, contraseña_newrep);
  continuar = 1;
} else if (estado_registro === "si") {
  login(usuario_def, contraseña_def);
  continuar = 1;
} else {
  console.log("Datos incorrectos");
  continuar = 0;
}*/

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

    let solicitar = document.getElementById("solicitar");
    solicitar.addEventListener("click", function () {
      if (listado_prestamos.length <= 3) {
        let nuevo_prestamo = new Prestamo(
          monto,
          cuotas,
          calculo_interes(monto, cuotas),
          monto + calculo_interes(monto, cuotas),
          (monto + calculo_interes(monto, cuotas)) / cuotas
        );
        listado_prestamos.push(nuevo_prestamo);
        nuevo_prestamo.get_datos();
        continuar.innerHTML = `<h2>Usted ha solicitado ${listado_prestamos.length} prestamo/s exitosamente</h2>`;
        resultados.append(continuar);
      } else {
        continuar.innerHTML = `<h2>Usted ha solicitado ${listado_prestamos.length} prestamo/s exitosamente</h2>`;
        resultados.append(continuar);
      }
    });
  } else {
    alert("Cantidad de cuotas incorrecta");
  }
});

console.log(listado_prestamos);

/*
//SOLICITUD DE PRESTAMO

  if (listado_prestamos.length <= 3) {
    let nuevo_prestamo = new Prestamo(
      listado_prestamos.length + 1,
      monto,
      cuotas,
      calculo_interes(monto, cuotas),
      monto + calculo_interes(monto, cuotas),
      (monto + calculo_interes(monto, cuotas)) / cuotas
    );
    listado_prestamos.push(nuevo_prestamo);
    nuevo_prestamo.get_datos();
    console.log(
      "Usted ha solicitado " +
        listado_prestamos.length +
        " prestamo/s exitosamente"
    );
  } else {
    console.log("Usted alcanzo su limite de creditos disponibles");
  }
}
continuar = prompt("Desea solicitar otro prestamo? si/no");
while (continuar === "si" && listado_prestamos.length <= 2) {
  monto = parseFloat(prompt("Ingrese el monto que desea solicitar:"));
  alert("Usted puede solicitar su crédito en 3, 6 o 12 cuotas");
  cuotas = parseInt(prompt("Ingrese la cantidad de cuotas: "));

  let nuevo_prestamo = new Prestamo(
    listado_prestamos.length + 1,
    monto,
    cuotas,
    calculo_interes(monto, cuotas),
    monto + calculo_interes(monto, cuotas),
    (monto + calculo_interes(monto, cuotas)) / cuotas
  );
  listado_prestamos.push(nuevo_prestamo);
  nuevo_prestamo.get_datos();
  console.log(
    "Usted ha solicitado " +
      listado_prestamos.length +
      " prestamo/s exitosamente"
  );

  continuar = prompt("Desea solicitar otro prestamo? si/no");
}

if (listado_prestamos.length > 2) {
  console.log("Usted ha alcanzado su limite de creditos disponibles");
  alert("Usted ha alcanzado su limite de creditos disponibles");
}

//BORRAR PRESTAMO
if (listado_prestamos.length > 0) {
  continuar = prompt(
    "Desea cancelar alguna de los prestamos solicitados? si/no"
  );
  if (continuar == "si") {
    id_buscado = prompt("Ingrese el ID del prestamo que desea cancelar: ");
    /*index = listado_prestamos.indexOf(id_buscado);
    listado_prestamos.splice(index, 1);*/
/*const listado_prestamos = listado.prestamos.filter(
      (prestamo) => prestamo.id != id_buscado
    );
    console.log("El prestamo se ha cancelado exitosamente");
    console.log(listado_prestamos);
  }
  //INDEXOF BUSCA EL INDICE
  //SPLICE BORRA, NECESITA EL INDICE
}
*/
