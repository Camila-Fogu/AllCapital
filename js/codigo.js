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
let nombre = "";
let apellido = "";
let dni = "";
let tel = "";
let usuario = "";
let contraseña = "";
let contraseña_rep = "";
let listado_usuarios = [];
let continuar = "";
let listado_prestamos = [];
let monto = "";
let cuotas = "";
let id_buscado = "";

//CLASS USUARIOS
class Usuario {
  constructor(nombre, apellido, dni, tel, usuario, contraseña, contraseña_rep) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.idni = dni;
    this.tel = tel;
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.contraseña_rep = contraseña_rep;
  }
}

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

//REGISTRO DE NUEVO USUARIO
let boton_registro = document.getElementById("registro");
boton_registro.addEventListener("click", function () {
  nombre = document.getElementById("nombre");
  nombre = nombre.value;

  apellido = document.getElementById("apellido");
  apellido = apellido.value;

  dni = document.getElementById("dni");
  dni = dni.value;

  tel = document.getElementById("tel");
  tel = tel.value;

  usuario = document.getElementById("usuario");
  usuario = usuario.value;

  contraseña = document.getElementById("contraseña");
  contraseña = contraseña.value;

  contraseña_rep = document.getElementById("contraseña_rep");
  contraseña_rep = contraseña_rep.value;

  if (contraseña != contraseña_rep) {
    alert("Las contraseñas no coinciden. Por favor vuelva a ingresarlas");
  } else {
    let nuevo_usuario = new Usuario(
      nombre,
      apellido,
      dni,
      tel,
      usuario,
      contraseña,
      contraseña_rep
    );
    listado_usuarios.push(nuevo_usuario);
    console.log(listado_usuarios);
    let usuarios_JSON = JSON.stringify(listado_usuarios);
    localStorage.setItem("usuarios", usuarios_JSON);
  }
});

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
        console.log(listado_prestamos);

        let listado_prestamos_JSON = JSON.stringify(listado_prestamos);
        localStorage.setItem("lista_prestamos", listado_prestamos_JSON);

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
