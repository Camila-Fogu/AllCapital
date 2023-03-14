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
let encontrado = "";

//CLASS USUARIOS
class Usuario {
  constructor(nombre, apellido, dni, tel, usuario, contraseña, contraseña_rep) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.tel = tel;
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.contraseña_rep = contraseña_rep;
  }
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
    Swal.fire({
      icon: "warning",
      iconColor: "#399b53",
      color: "#276938",
      title: "Las contraseñas no coinciden!",
      text: "Por favor vuelva a ingresarlas",
      showClass: {
        popup: "animate__animated animate__bounceIn",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
    });
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

    let recupero_usuarios = localStorage.getItem("usuarios");
    recupero_usuarios = JSON.parse(recupero_usuarios);

    if (recupero_usuarios) {
      listado_usuarios = recupero_usuarios;
    }

    listado_usuarios.push(nuevo_usuario);
    let usuarios_JSON = JSON.stringify(listado_usuarios);
    localStorage.setItem("usuarios", usuarios_JSON);

    let resultados = document.getElementById("resultado_registro");
    continuar = document.createElement("div");
    continuar.innerHTML = `<h4>${nombre} te registraste exitosamente!</h4>
    <h4>Loggeate y empezá a disfrutar de nuestros servicios!</h4>`;
    resultados.append(continuar);

    Swal.fire({
      icon: "success",
      iconColor: "#399b53",
      color: "#276938",
      title: "Te registraste exitosamente!",
      text: "Loggeate y empezá a disfrutar de nuestros servicios",
      showClass: {
        popup: "animate__animated animate__bounceIn",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
    });
  }
});

//LOGIN DE USUARIO CREADO
let boton_login = document.getElementById("login");
boton_login.addEventListener("click", function () {
  let nombre_usuario = document.getElementById("nombre_usuario");
  let password = document.getElementById("password");
  let recupero_usuarios = localStorage.getItem("usuarios");
  recupero_usuarios = JSON.parse(recupero_usuarios);

  if (recupero_usuarios) {
    for (let usuario of recupero_usuarios) {
      if (
        nombre_usuario.value == usuario.usuario &&
        password.value == usuario.contraseña
      ) {
        let resultados = document.getElementById("resultado_login");
        continuar = document.createElement("div");
        continuar.innerHTML = `<h4>${nombre} ingresaste exitosamente!</h4>
      <h4>Ya podes comenzar a operar con nuestros servicios!</h4>`;
        resultados.append(continuar);

        let usuario_logueado = {
          nombre_usuario: nombre_usuario.value,
          password: password.value,
        };

        let logueado_JSON = JSON.stringify(usuario_logueado);
        sessionStorage.setItem("usuario_logueado", logueado_JSON);

        encontrado = 1;
      }
    }
    if (encontrado != 1) {
      Swal.fire({
        icon: "warning",
        iconColor: "#399b53",
        color: "#276938",
        title: "Los datos ingresados no corresponden a un usuario registrado",
        showClass: {
          popup: "animate__animated animate__bounceIn",
        },
        hideClass: {
          popup: "animate__animated animate__bounceOut",
        },
      });
    }
  } else {
    Swal.fire({
      icon: "warning",
      iconColor: "#399b53",
      color: "#276938",
      title: "Los datos ingresados no corresponden a un usuario registrado",
      showClass: {
        popup: "animate__animated animate__bounceIn",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
    });
  }
});

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
