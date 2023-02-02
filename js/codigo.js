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
let dinero = "";
let cuotas = "";
let index = "";
let id_buscado = "";

//CLASES
class Cada_prestamo {
  constructor(id, monto, cuotas, interes, monto_total, monto_cuotas) {
    this.id = id;
    this.monto = monto;
    this.cuotas = cuotas;
    this.interes = interes;
    this.monto_total = monto_total;
    this.monto_cuotas = monto_cuotas;
  }
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

//LOGIN O REGISTRO
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
}

//SIMULADOR DE PRESTAMO
if (continuar === 1) {
  dinero = parseFloat(
    prompt("SIMULADOR DE PRESTAMO - Ingrese el monto que desea solicitar:")
  );
  console.log("----------SIMULADOR DE PRESTAMO---------");
  console.log("El monto de dinero que desea solicitar es de $" + dinero);
  alert("Usted puede solicitar su crédito en 3, 6 o 12 cuotas");
  cuotas = parseInt(prompt("Ingrese la cantidad de cuotas: "));
  console.log("La cantidad de cuotas solicitadas es de " + cuotas + " cuotas");
  console.log("El interes es de: $" + calculo_interes(dinero, cuotas));
  console.log(
    "Costo de cuota mensual: $" +
      (dinero + calculo_interes(dinero, cuotas)) / cuotas
  );
  console.log(
    "Costo del total del crédito: $" +
      (dinero + calculo_interes(dinero, cuotas))
  );
  console.log("");
}

//SOLICITUD DE PRESTAMO
continuar = prompt("Desea solicitar el prestamo simulado? si/no");
if (continuar === "si") {
  if (listado_prestamos.length <= 3) {
    let nuevo_prestamo = new Cada_prestamo(
      listado_prestamos.length + 1,
      dinero,
      cuotas,
      calculo_interes(dinero, cuotas),
      dinero + calculo_interes(dinero, cuotas),
      (dinero + calculo_interes(dinero, cuotas)) / cuotas
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
  dinero = parseFloat(prompt("Ingrese el monto que desea solicitar:"));
  alert("Usted puede solicitar su crédito en 3, 6 o 12 cuotas");
  cuotas = parseInt(prompt("Ingrese la cantidad de cuotas: "));

  let nuevo_prestamo = new Cada_prestamo(
    listado_prestamos.length + 1,
    dinero,
    cuotas,
    calculo_interes(dinero, cuotas),
    dinero + calculo_interes(dinero, cuotas),
    (dinero + calculo_interes(dinero, cuotas)) / cuotas
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

if (listado_prestamos.length > 0) {
  continuar = prompt(
    "Desea cancelar alguna de los prestamos solicitados? si/no"
  );
  if (continuar == "si") {
    id_buscado = prompt("Ingrese el ID del prestamo que desea cancelar: ");
    index = listado_prestamos.indexOf(id_buscado);
    listado_prestamos.splice(index, 1);
    console.log("El prestamo se ha cancelado exitosamente");
    console.log(listado_prestamos);
  }
  //INDEXOF BUSCA EL INDICE
  //SPLICE BORRA, NECESITA EL INDICE
}

console.log("ADIOS");
