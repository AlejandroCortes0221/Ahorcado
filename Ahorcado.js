const iniciar = document.querySelector(".iniciar");
const agregar = document.querySelector(".agregar");
const palabra = document.querySelector(".palabra-nueva");
const guardar = document.querySelector(".guardar");
const advertencia = document.querySelector("p");
const cancelar = document.querySelector(".cancelar");
const desistir = document.querySelector(".desistir");
const nuevo = document.querySelector(".iniciar-2");
const input = document.querySelector(".este");
var pantalla = document.querySelector(".posiciones");
var pincel = pantalla.getContext("2d");

var pantalla2 = document.querySelector(".ahorcado");
var pincel2 = pantalla2.getContext("2d");

let palabraAdivinar = ['HOLA','POLA','CREAR','SILLA','AMOR','HTML', 'VIDA','AVIONETA','AMARILLO'];
let jugar = false;
function botonIniciar(){
    pincel.clearRect(0,0,570,140);
    const min = Math.ceil(0);
    const max = Math.floor(palabraAdivinar.length -1);
    let espacio = 0;
    let pal = "";
    iniciar.style.visibility="hidden";
    agregar.style.visibility="hidden";
    palabra.style.visibility="hidden";
    guardar.style.visibility="hidden";
    advertencia.style.visibility="hidden";
    cancelar.style.visibility="hidden";
    pantalla.style.visibility="visible";
    pantalla2.style.visibility = "visible";
    nuevo.style.visibility="visible";
    desistir.style.visibility="visible";
    input.style.visibility = "visible";
    pal = palabraAdivinar[Math.floor(Math.random() * (max - min + 1)) + min];
    letras = pal.length;
    pincel.fillStyle = "#0A3871";
    pincel.beginPath();
    for (var i = 0; i < pal.length; i++){
        if(pal.length == 4){
            espacio += 50; 
        }else if(pal.length == 5){
            espacio += 50;
        }else if(pal.length == 6){
            espacio += 38;
        }else if(pal.length == 7){
            espacio += 35;
        }else if(pal.length == 8){
            espacio += 33;
        }
        pincel.fillRect(espacio,60,30,8);
    }
    pincel.fill();
  
  pincel2.clearRect(0, 0, 570, 360);
  pincel2.fillStyle = "#0A3871";
  pincel2.beginPath();
  pincel2.fillRect(100, 130, 100, 3);
  letrasVerificar(pal,false);
}

function letrasVerificar(pal){
  jugar = false;
  let valor = 50;
  let bool = false;
  let ingresados = [];
  let correcto = [];
  let ganaste = 0;
  let esCorrecto = 0;
  pincel.lineWidth = 2;
  document.addEventListener("keydown", function (event) {
    pincel.strokeStyle = "#0A3871";
    pincel.font = "bold 34px sans-serif";
    if (event.keyCode > 64 && event.keyCode < 91 && ingresados.length < 9 && ganaste < pal.length) {
      let validar = false;
      if (pal.includes(event.key.toUpperCase())) {
        for (let n = 0; n < correcto.length; n++) {
          if (event.key == correcto[n]) {
            validar = true;
          }
        }
        if (validar == false) {
          correcto.push(event.key);
          for (let k = 0; k < pal.length; k++) {
            if (pal[k] == event.key.toUpperCase()) {
              ganaste++;
              if (ganaste == pal.length) {
                ganar();
                jugar = true;
              }
              if (pal.length == 4) {
                esCorrecto = (k + 1) * 52;
              } else if (pal.length == 5) {
                esCorrecto = (k + 1) * 52;
              } else if (pal.length == 6) {
                esCorrecto = (k + 1) * 40;
              } else if (pal.length == 7) {
                esCorrecto = (k + 1) * 37;
              } else if (pal.length == 8) {
                esCorrecto = (k + 1) * 34;
              }
              pincel.strokeText(event.key.toUpperCase(), esCorrecto, 50, 20);
            }
          }
        }
      }
      if (!pal.includes(event.key.toUpperCase())) {
        if (bool == false) {
          ingresados.push(event.key);
          pincel.strokeText(event.key.toUpperCase(), valor, 130, 20);
          bool = true;
        } else {
          let bandera = false;
          for (let i = 0; i < ingresados.length; i++) {
            if (event.key == ingresados[i]) {
              bandera = true;
            }
          }

          if (bandera == false) {
            if (event.keyCode == 73) {
              valor += 20;
              pincel.strokeText(event.key.toUpperCase(), valor, 130, 20);
              ingresados.push(event.key);
              valor += -10;
            } else {
              valor += 20;
              pincel.strokeText(event.key.toUpperCase(), valor, 130, 20);
              ingresados.push(event.key);
            }
          }
        }
        ahorcado(ingresados.length);
        if(ingresados.length == 9){
          perdiste(pal);
          jugar = true;
        }
      }
    }
  });
}


function NuevoJuego(){
  if (jugar == true) {
    botonIniciar();
  }else{
    Swal.fire(
      "Para crear un nuevo juego debes terminar el actual o desistir",
      "Has click en el boton",
      "warning"
    );
  }
}
function botonAgregar(){
    palabra.value = "";
    iniciar.style.visibility="hidden";
    agregar.style.visibility="hidden";
    palabra.style.visibility="visible";
    guardar.style.visibility="visible";
    advertencia.style.visibility="visible";
    cancelar.style.visibility="visible";
    pantalla.style.visibility="hidden";
    pantalla2.style.visibility = "hidden";
}

function botonCancelar(){
  pincel.clearRect(0, 0, 570, 120);
  iniciar.style.visibility="visible";
  agregar.style.visibility="visible";
  palabra.style.visibility="hidden";
  guardar.style.visibility="hidden";
  advertencia.style.visibility="hidden";
  cancelar.style.visibility="hidden";
}

function botonGuardarEmpezar(){
    pincel.clearRect(0,0,570,120);
    if(palabra.value.length < 4 || palabra.value.length >8){
        Swal.fire({
          icon: "warning",
          title: "Cuidado",
          text: "La palabra esta fuera de los limites",
        });
    }else{
        palabraAdivinar[palabraAdivinar.length] = palabra.value.toUpperCase();
        let letras = 0;
        let espacio = 0;
        let pal = "";
        palabra.style.visibility="hidden";
        guardar.style.visibility="hidden";
        advertencia.style.visibility="hidden";
        cancelar.style.visibility="hidden";
        pantalla.style.visibility="visible";
        pantalla2.style.visibility = "visible";
        nuevo.style.visibility="visible";
        desistir.style.visibility="visible";
        pal = palabraAdivinar[palabraAdivinar.length - 1];
        letras = pal.length;
        pincel.fillStyle = "#0A3871";
        pincel.beginPath();
        for (var i = 0; i < letras; i++){
            if (pal.length == 4) {
              espacio += 50;
            } else if (pal.length == 5) {
              espacio += 50;
            } else if (pal.length == 6) {
              espacio += 38;
            } else if (pal.length == 7) {
              espacio += 35;
            } else if (pal.length == 8) {
              espacio += 33;
            }
            pincel.fillRect(espacio,60,28,8);
        }
        pincel.fill();
        pincel2.clearRect(0, 0, 570, 360);
        pincel2.fillStyle = "#0A3871";
        pincel2.beginPath();
        pincel2.fillRect(100, 130, 100, 3);
        letrasVerificar(pal);
    }
}

let boolean = false;
function ahorcado(parte){
  pincel2.lineWidth = 3;
  if (parte == 1) {
    pincel2.fillRect(110, 10, 3, 120);
  } else if (parte == 2) {
    pincel2.fillRect(110, 10, 70, 3);
  } else if (parte == 3) {
    pincel2.fillRect(180, 10, 3, 25);
  } else if (parte == 4 && boolean == false) {
    pincel2.strokeStyle = "#0A3871";
    pincel2.arc(181, 50, 15, 0, 2 * 3.14);
  } else if (parte == 5) {
    pincel2.fillRect(180, 65, 3, 30);
  } else if (parte == 6) {
    pincel2.moveTo(181, 94);
    pincel2.lineTo(160, 115);
  } else if (parte == 7) {
    pincel2.moveTo(181, 94);
    pincel2.lineTo(200, 115);
  } else if (parte == 8) {
    pincel2.moveTo(181, 64);
    pincel2.lineTo(200, 85);
  } else if (parte == 9) {
    pincel2.moveTo(181, 64);
    pincel2.lineTo(160, 85);
  }
  pincel2.stroke();
}

function ganar(){
  NuevoJuego(true);
 Swal.fire("¡¡Felicitaciones, Ganaste!!", "Has click en el boton", "success");
 
}
function perdiste(palabra){
  NuevoJuego(true);
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Perdiste, la Palabra era: " + palabra,
  });
  
}